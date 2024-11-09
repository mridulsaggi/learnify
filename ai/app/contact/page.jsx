"use client"
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const page = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      Papa.parse(file, {
        complete: async (result) => {
          const parsedData = result.data;
          setColumns(Object.keys(parsedData[0]));
          setData(parsedData);

          try {
            const response = await fetch('/api/upload-csv', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: parsedData }),
            });

            if (!response.ok) {
              throw new Error('Failed to upload data');
            }

            const result = await response.json();
            console.log('Data uploaded successfully:', result);
          } catch (error) {
            console.error('Error uploading data:', error);
          } finally {
            setIsUploading(false);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CSV File Uploader !</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {isUploading && <p>Uploading...</p>}
      {data.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Extracted Data</h2>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default page;