import React, { useState } from "react";
import { TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

const DirectorySelector = ({ onDirectorySelect }) => {
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [customDirectory, setCustomDirectory] = useState("");

  const predefinedDirectories = [
    { name: "Marketing", path: "/data/marketing" },
    { name: "Sistemas", path: "/data/sistemas" },
    { name: "Ventas", path: "/data/ventas" },
  ];

  const handleSelectChange = (event) => {
    setSelectedDirectory(event.target.value);
    setCustomDirectory(""); // Reinicia el buscador cuando selecciona un directorio predefinido
    onDirectorySelect(event.target.value);
  };

  const handleInputChange = (event) => {
    setCustomDirectory(event.target.value);
    setSelectedDirectory(""); // Reinicia el selector cuando escribe un directorio personalizado
    onDirectorySelect(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" , marginTop: 2, marginBottom: 2}}>
      <FormControl fullWidth>
        <InputLabel>Seleccionar Directorio</InputLabel>
        <Select value={selectedDirectory} onChange={handleSelectChange}>
          {predefinedDirectories.map((dir) => (
            <MenuItem key={dir.name} value={dir.path}>
              {dir.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DirectorySelector;
