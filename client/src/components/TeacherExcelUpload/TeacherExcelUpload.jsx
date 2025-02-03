import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import "./TeacherExcelUpload.css";

const TeacherExcelUpload = () => {
  const [data, setData] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [".xlsx", ".xls"],
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach(file => {
        alert(`File "${file.name}" has an invalid MIME type.`);
      });
    },
    validator: (file) => {
      const validMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
      ];
      if (!validMimeTypes.includes(file.type)) {
        return {
          code: "invalid-mime-type",
          message: "Invalid MIME type. Please upload an Excel file (.xlsx, .xls).",
        };
      }
      return null; // File is valid
    }
  });

  return (
    <div className="teacher-excel-upload-container">
      <h2 className="teacher-excel-upload-title">Upload Excel File</h2>
      <div
        {...getRootProps()}
        className="teacher-excel-upload-dropzone"
      >
        <input {...getInputProps()} />
        <div className="dropzone-overlay">
          <p>Drag & Drop or Click to Upload</p>
          <p className="file-info">Accepted file formats: .xlsx, .xls</p>
        </div>
      </div>
      {data.length > 0 && (
        <table className="teacher-excel-upload-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherExcelUpload;
