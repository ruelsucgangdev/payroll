"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

interface Props {
  label: string;
  id: string;
  value: string; // MM-DD-YYYY
  onChange: (formatted: string) => void;
  disabled?: boolean;
}

export default function CustomDatePicker({
  label,
  id,
  value,
  onChange,
  disabled = false,
}: Props) {
  const parsedDate = dayjs(value, "MM/DD/YYYY").toDate();

  return (
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column" }}>
      {label}
      <DatePicker
        id={id}
        selected={isNaN(parsedDate.getTime()) ? null : parsedDate}
        onChange={(date: Date | null) => {
          if (date) {
            onChange(dayjs(date).format("MM/DD/YYYY"));
          } else {
            onChange("");
          }
        }}
        placeholderText="MM/DD/YYYY"
        dateFormat="MM/dd/yyyy"
        className="custom-datepicker"
        disabled={disabled}
      />
    </label>
  );
}
