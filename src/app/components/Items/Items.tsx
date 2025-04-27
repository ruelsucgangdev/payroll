"use client";

import { useState, useEffect, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Save,
  Close,
  Visibility,
} from "@mui/icons-material";
import styles from "./items.module.scss"; // ✅ gamitin natin ang bagong SCSS
import { fetchItems, saveItem, deleteItem } from "@/services/items-service";
import { fetchCategories } from "@/services/categories-service";
import { fetchUnits } from "@/services/units-service";

const greenColor = "#006400";

export default function ItemMaster() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [showDelete, setShowDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
    loadCategories();
    loadUnits();
  }, []);

  async function loadItems() {
    const data = await fetchItems();
    setItems(data);
  }

  async function loadCategories() {
    const data = await fetchCategories();
    setCategories(data);
  }

  async function loadUnits() {
    const data = await fetchUnits();
    setUnits(data);
  }

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditData({ ...item });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  const handleSave = async () => {
    const newErr: any = {};
    if (!editData.productCode) newErr.productCode = "Required";
    if (!editData.sku) newErr.sku = "Required";
    if (!editData.productName) newErr.productName = "Required";
    if (!editData.categoryId) newErr.categoryId = "Required";

    setErrors(newErr);
    if (Object.keys(newErr).length) return;

    await saveItem(editData);
    await loadItems();
    setEditingId(null);
    setEditData({});
  };

  const handleAddItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      productCode: "",
      categoryId: "",
      sku: "",
      productName: "",
      description: "",
    };
    setItems((p) => [newItem, ...p]);
    setEditingId(newItem.id);
    setEditData({ ...newItem });
    setErrors({});
  };

  const handleDelete = (item: any) => {
    setItemToDelete(item);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await deleteItem(itemToDelete.id);
    await loadItems();
    setShowDelete(false);
  };

  const handleToggleExpand = (itemId: string) => {
    setExpandedRow(expandedRow === itemId ? null : itemId);
  };

  const filtered = items.filter((i) =>
    [i.productCode, i.sku, i.productName].some((f) =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleAddConversion = (parentId: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        if (!item.conversions) {
          item.conversions = [];
        }
        item.conversions.unshift({
          id: crypto.randomUUID(),
          fromUOM: "",
          toUOM: "",
          quantity: "",
          isNew: true,
        });
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleDeleteConversion = (parentId: string, convId: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        item.conversions = item.conversions.filter((c: any) => c.id !== convId);
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleEditConversion = (parentId: string, convId: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        item.conversions = item.conversions.map((conv: any) =>
          conv.id === convId ? { ...conv, isEditing: true } : conv
        );
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleCancelEditConversion = (parentId: string, convId: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        item.conversions = item.conversions.map((conv: any) =>
          conv.id === convId ? { ...conv, isEditing: false } : conv
        );
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleCancelConversion = (parentId: string, convId: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === parentId) {
        item.conversions = item.conversions.filter(
          (conv: any) => conv.id !== convId
        );
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSaveConversion = async (parentId: string, conv: any) => {
    if (parseFloat(conv.quantity) === 0) {
      alert("Quantity must be greater than zero.");
      return;
    }
    if (!conv.fromUOM || !conv.toUOM || !conv.quantity) {
      alert("Please complete all required fields!");
      return;
    }
    if (conv.fromUOM === conv.toUOM) {
      alert("From UOM and To UOM cannot be the same!");
      return;
    }

    try {
      const response = await fetch("/api/conversionmatrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: parentId,
          fromUomId: conv.fromUOM,
          toUomId: conv.toUOM,
          qty: conv.quantity,
        }),
      });
      const result = await response.json();

      if (result.success || result.id) {
        const updatedItems = items.map((item) => {
          if (item.id === parentId) {
            item.conversions = item.conversions.map((c: any) =>
              c.id === conv.id ? { ...c, isNew: false, isEditing: false } : c
            );
          }
          return item;
        });
        setItems(updatedItems);
        alert("Conversion saved successfully!");
      } else {
        alert("Failed to save conversion.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving conversion.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{ color: greenColor }}>
        Item Master
      </Typography>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by code, SKU, or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddItem}
          sx={{ backgroundColor: greenColor }}
        >
          Add Item
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#006400" }}>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                SKU*
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Category*
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Product Code*
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Product Name*
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((item) => (
              <Fragment key={item.id}>
                {/* Parent Row */}
                <TableRow hover className={styles.smallRow}>
                  <TableCell>
                    {editingId === item.id ? (
                      <TextField
                        value={editData.sku}
                        onChange={(e) =>
                          setEditData((d: any) => ({
                            ...d,
                            sku: e.target.value,
                          }))
                        }
                        error={!!errors.sku}
                        helperText={errors.sku}
                        size="small"
                        className={styles.inputField}
                      />
                    ) : (
                      item.sku
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Select
                        value={editData.categoryId}
                        onChange={(e) =>
                          setEditData((d: any) => ({
                            ...d,
                            categoryId: e.target.value,
                          }))
                        }
                        size="small"
                        fullWidth
                        className={styles.selectField}
                      >
                        {categories.map((c) => (
                          <MenuItem key={c.id} value={c.id}>
                            {c.code}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      categories.find((c) => c.id === item.categoryId)?.code ||
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <TextField
                        value={editData.productCode}
                        onChange={(e) =>
                          setEditData((d: any) => ({
                            ...d,
                            productCode: e.target.value,
                          }))
                        }
                        error={!!errors.productCode}
                        helperText={errors.productCode}
                        size="small"
                        className={styles.inputField}
                      />
                    ) : (
                      item.productCode
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <TextField
                        value={editData.productName}
                        onChange={(e) =>
                          setEditData((d: any) => ({
                            ...d,
                            productName: e.target.value,
                          }))
                        }
                        error={!!errors.productName}
                        helperText={errors.productName}
                        size="small"
                        className={styles.inputField}
                      />
                    ) : (
                      item.productName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <TextField
                        value={editData.description}
                        onChange={(e) =>
                          setEditData((d: any) => ({
                            ...d,
                            description: e.target.value,
                          }))
                        }
                        size="small"
                        className={styles.inputField}
                      />
                    ) : (
                      item.description
                    )}
                  </TableCell>
                  <TableCell className={styles.actionsCell}>
                    {editingId === item.id ? (
                      <>
                        <IconButton onClick={handleSave} color="success">
                          <Save />
                        </IconButton>
                        <IconButton onClick={handleCancel} color="error">
                          <Close />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleEdit(item)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleToggleExpand(item.id)}
                          color="info"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(item)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>

                {/* Child Row - Collapse */}
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={expandedRow === item.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#006400" }}>
                              <TableCell
                                sx={{ color: "white", fontWeight: "bold" }}
                              >
                                Product Code
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", fontWeight: "bold" }}
                              >
                                From UOM*
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", fontWeight: "bold" }}
                              >
                                To UOM*
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", fontWeight: "bold" }}
                              >
                                Quantity*
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", fontWeight: "bold" }}
                              >
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.conversions?.map((conv: any) => (
                              <TableRow key={conv.id}>
                                <TableCell>
                                  <strong>{item.productCode}</strong>
                                </TableCell>
                                <TableCell>
                                  {conv.isNew || conv.isEditing ? (
                                    <Select
                                      size="small"
                                      fullWidth
                                      value={conv.fromUOM}
                                      onChange={(e) => {
                                        const updatedItems = items.map((p) => {
                                          if (p.id === item.id) {
                                            p.conversions = p.conversions.map(
                                              (c: any) =>
                                                c.id === conv.id
                                                  ? {
                                                      ...c,
                                                      fromUOM: e.target.value,
                                                    }
                                                  : c
                                            );
                                          }
                                          return p;
                                        });
                                        setItems(updatedItems);
                                      }}
                                    >
                                      {units.map((u) => (
                                        <MenuItem key={u.id} value={u.id}>
                                          {u.abbreviation || u.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  ) : (
                                    units.find((u) => u.id === conv.fromUOM)
                                      ?.abbreviation || ""
                                  )}
                                </TableCell>
                                <TableCell>
                                  {conv.isNew || conv.isEditing ? (
                                    <Select
                                      size="small"
                                      fullWidth
                                      value={conv.toUOM}
                                      onChange={(e) => {
                                        const updatedItems = items.map((p) => {
                                          if (p.id === item.id) {
                                            p.conversions = p.conversions.map(
                                              (c: any) =>
                                                c.id === conv.id
                                                  ? {
                                                      ...c,
                                                      toUOM: e.target.value,
                                                    }
                                                  : c
                                            );
                                          }
                                          return p;
                                        });
                                        setItems(updatedItems);
                                      }}
                                    >
                                      {units.map((u) => (
                                        <MenuItem key={u.id} value={u.id}>
                                          {u.abbreviation || u.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  ) : (
                                    units.find((u) => u.id === conv.toUOM)
                                      ?.abbreviation || ""
                                  )}
                                </TableCell>
                                <TableCell>
                                  {conv.isNew || conv.isEditing ? (
                                    <TextField
                                      size="small"
                                      type="number"
                                      fullWidth
                                      value={conv.quantity}
                                      inputProps={{
                                        style: {
                                          textAlign: "right",
                                          paddingRight: "10px",
                                        },
                                      }}
                                      onChange={(e) => {
                                        const updatedItems = items.map((p) => {
                                          if (p.id === item.id) {
                                            p.conversions = p.conversions.map(
                                              (c: any) =>
                                                c.id === conv.id
                                                  ? {
                                                      ...c,
                                                      quantity: e.target.value,
                                                    }
                                                  : c
                                            );
                                          }
                                          return p;
                                        });
                                        setItems(updatedItems);
                                      }}
                                    />
                                  ) : (
                                    conv.quantity
                                  )}
                                </TableCell>
                                <TableCell>
                                  {conv.isNew ? (
                                    <>
                                      <IconButton
                                        color="success"
                                        onClick={() =>
                                          handleSaveConversion(item.id, conv)
                                        }
                                      >
                                        <Save />
                                      </IconButton>
                                      <IconButton
                                        color="warning"
                                        onClick={() =>
                                          handleCancelConversion(
                                            item.id,
                                            conv.id
                                          )
                                        }
                                      >
                                        <Close />
                                      </IconButton>
                                    </>
                                  ) : conv.isEditing ? (
                                    <>
                                      <IconButton
                                        color="success"
                                        onClick={() =>
                                          handleSaveConversion(item.id, conv)
                                        }
                                      >
                                        <Save />
                                      </IconButton>
                                      <IconButton
                                        color="warning"
                                        onClick={() =>
                                          handleCancelEditConversion(
                                            item.id,
                                            conv.id
                                          )
                                        }
                                      >
                                        <Close />
                                      </IconButton>
                                    </>
                                  ) : (
                                    <>
                                      <IconButton
                                        color="primary"
                                        onClick={() =>
                                          handleEditConversion(item.id, conv.id)
                                        }
                                      >
                                        <Edit />
                                      </IconButton>
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          handleDeleteConversion(
                                            item.id,
                                            conv.id
                                          )
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Add Conversion Button */}
                        <Box marginTop={1}>
                          <Button
                            variant="text"
                            size="small"
                            sx={{ color: greenColor }}
                            disabled={item.conversions?.some(
                              (c: any) => c.isNew
                            )}
                            onClick={() => handleAddConversion(item.id)}
                          >
                            + Add Conversion
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
