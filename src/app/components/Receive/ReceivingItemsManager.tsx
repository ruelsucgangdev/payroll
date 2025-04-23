"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import styles from "./ReceivingItemsManager.module.scss";

const sampleProducts = [
  { sku: "SKU-A01", name: "Apple Juice" },
  { sku: "SKU-B01", name: "Banana Chips" },
  { sku: "SKU-C01", name: "Chocolate Bar" },
  { sku: "SKU-D01", name: "Dried Mangoes" },
  { sku: "SKU-E01", name: "Energy Drink" },
  { sku: "SKU-F01", name: "Fruit Cocktail" },
  { sku: "SKU-G01", name: "Gummy Bears" },
  { sku: "SKU-H01", name: "Honey Syrup" },
  { sku: "SKU-I01", name: "Instant Noodles" },
  { sku: "SKU-J01", name: "Jam (Strawberry)" },
  { sku: "SKU-K01", name: "Ketchup" },
  { sku: "SKU-L01", name: "Lemon Water" },
  { sku: "SKU-M01", name: "Milk (Fresh)" },
  { sku: "SKU-N01", name: "Nuts (Mixed)" },
  { sku: "SKU-O01", name: "Oatmeal Cookies" },
  { sku: "SKU-P01", name: "Peanut Butter" },
  { sku: "SKU-Q01", name: "Quinoa Pack" },
  { sku: "SKU-R01", name: "Raisin Bread" },
  { sku: "SKU-S01", name: "Salted Eggs" },
  { sku: "SKU-T01", name: "Tomato Sauce" },
  { sku: "SKU-U01", name: "Ube Halaya" },
  { sku: "SKU-V01", name: "Vitamin Water" },
  { sku: "SKU-W01", name: "Wheat Flour" },
  { sku: "SKU-X01", name: "Xanthan Gum" },
  { sku: "SKU-Y01", name: "Yogurt Drink" },
  { sku: "SKU-Z01", name: "Zucchini Chips" },
];

const sampleWarehouses = ["Main WH", "Overflow WH", "Freezer WH"];
const sampleUnits = ["Box", "Pack", "Piece", "Kilo", "Liter"];
const sampleSuppliers = [
  "SM Supermarket",
  "Handyman",
  "Wilcon Depot",
  "AllHome",
  "Ace Hardware",
];

type DetailItem = {
  sku: string;
  productName: string;
  batchNo: string;
  expiryDate: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
  unitOfMeasure: string;
  warehouse: string;
};

export default function ReceivingItemEntry() {
  const [master, setMaster] = useState({
    poNumber: "",
    supplier: "",
    receivedDate: "",
    receivedBy: "",
  });

  const [details, setDetails] = useState<DetailItem[]>([
    {
      sku: "",
      productName: "",
      batchNo: "",
      expiryDate: "",
      quantityOrdered: 0,
      quantityReceived: 0,
      unitCost: 0,
      unitOfMeasure: "",
      warehouse: "",
    },
  ]);

  const handleDetailChange = (
    index: number,
    field: keyof DetailItem,
    value: string | number
  ) => {
    const updated = [...details];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setDetails(updated);
  };

  const addRow = () => {
    setDetails([
      ...details,
      {
        sku: "",
        productName: "",
        batchNo: "",
        expiryDate: "",
        quantityOrdered: 0,
        quantityReceived: 0,
        unitCost: 0,
        unitOfMeasure: "",
        warehouse: "",
      },
    ]);
  };

  const deleteRow = (index: number) => {
    const updated = [...details];
    updated.splice(index, 1);
    setDetails(updated);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Receive Items (Manual Entry)</h1>
      <p className={styles.subtitle}>
        Enter items received from supplier purchase orders
      </p>

      <div className={styles.entryForm}>
        <input
          type="text"
          placeholder="PO Number"
          className={styles.inputBox}
          value={master.poNumber}
          onChange={(e) => setMaster({ ...master, poNumber: e.target.value })}
        />
        <input
          list="supplierOptions"
          placeholder="Select or type supplier"
          className={`${styles.inputBox} ${styles.wide}`}
          value={master.supplier}
          onChange={(e) => setMaster({ ...master, supplier: e.target.value })}
        />
        <datalist id="supplierOptions">
          {sampleSuppliers.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
        <input
          type="date"
          className={styles.inputBox}
          value={master.receivedDate}
          onChange={(e) =>
            setMaster({ ...master, receivedDate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Received By"
          className={styles.inputBox}
          value={master.receivedBy}
          onChange={(e) => setMaster({ ...master, receivedBy: e.target.value })}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Batch No.</th>
            <th>Expiry Date</th>
            <th>Qty Ordered</th>
            <th>Qty Received</th>
            <th>Unit Cost</th>
            <th>Unit</th>
            <th>Warehouse</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  className={styles.cellInput}
                  value={item.sku}
                  onChange={(e) => handleDetailChange(i, "sku", e.target.value)}
                />
              </td>
              <td>
                <input
                  list="productOptions"
                  className={styles.cellInput}
                  value={item.productName}
                  onChange={(e) =>
                    handleDetailChange(i, "productName", e.target.value)
                  }
                />
                <datalist id="productOptions">
                  {sampleProducts.map((p) => (
                    <option key={p.sku} value={p.name} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  className={styles.cellInput}
                  value={item.batchNo}
                  onChange={(e) =>
                    handleDetailChange(i, "batchNo", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className={styles.cellInput}
                  type="date"
                  value={item.expiryDate}
                  onChange={(e) =>
                    handleDetailChange(i, "expiryDate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`${styles.cellInput} ${styles.numeric}`}
                  value={item.quantityOrdered}
                  onChange={(e) =>
                    handleDetailChange(
                      i,
                      "quantityOrdered",
                      parseInt(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`${styles.cellInput} ${styles.numeric}`}
                  value={item.quantityReceived}
                  onChange={(e) =>
                    handleDetailChange(
                      i,
                      "quantityReceived",
                      parseInt(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className={`${styles.cellInput} ${styles.numeric}`}
                  value={item.unitCost}
                  onChange={(e) =>
                    handleDetailChange(
                      i,
                      "unitCost",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <input
                  list="unitOptions"
                  className={styles.cellInput}
                  value={item.unitOfMeasure}
                  onChange={(e) =>
                    handleDetailChange(i, "unitOfMeasure", e.target.value)
                  }
                />
                <datalist id="unitOptions">
                  {sampleUnits.map((u) => (
                    <option key={u} value={u} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  list="warehouseOptions"
                  className={styles.cellInput}
                  value={item.warehouse}
                  onChange={(e) =>
                    handleDetailChange(i, "warehouse", e.target.value)
                  }
                />
                <datalist id="warehouseOptions">
                  {sampleWarehouses.map((wh) => (
                    <option key={wh} value={wh} />
                  ))}
                </datalist>
              </td>
              <td>
                <button
                  className={styles.deleteIcon}
                  onClick={() => deleteRow(i)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.actions}>
        <button className={styles.addRow} onClick={addRow}>
          + Add Row
        </button>
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.cancel}`}>
            Discard
          </button>
          <button className={`${styles.button} ${styles.save}`}>Save</button>
        </div>
      </div>
    </div>
  );
}
