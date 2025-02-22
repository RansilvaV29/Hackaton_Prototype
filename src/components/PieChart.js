import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress, TextField, Grid } from "@mui/material";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const Scan = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleScanFile = () => {
    if (!file) {
      alert("Por favor, selecciona un archivo para escanear.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulamos los resultados del escaneo de amenazas con más detalles
      const simulatedResults = [
        {
          name: "file1.js",
          vulnerabilities: {
            contrasenas: 2,
            correos: 1,
            direcciones: 3,
          },
        },
        {
          name: "file2.py",
          vulnerabilities: {
            contrasenas: 4,
            correos: 0,
            direcciones: 2,
          },
        },
        {
          name: "file3.java",
          vulnerabilities: {
            contrasenas: 1,
            correos: 2,
            direcciones: 1,
          },
        },
        {
          name: "file4.cpp",
          vulnerabilities: {
            contrasenas: 5,
            correos: 3,
            direcciones: 4,
          },
        },
      ];

      // Agregamos el total de vulnerabilidades
      const resultsWithTotal = simulatedResults.map((result) => ({
        ...result,
        totalVulnerabilities: Object.values(result.vulnerabilities).reduce(
          (sum, vulnCount) => sum + vulnCount,
          0
        ),
      }));

      setScanResults(resultsWithTotal);
    }, 2000);
  };

  return (
    <Box sx={{ flexGrow: 1, paddingLeft: 3, paddingTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Escanear Archivos
      </Typography>

      <TextField
        type="file"
        variant="outlined"
        fullWidth
        onChange={handleFileChange}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleScanFile}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Iniciar Escaneo"}
      </Button>

      {scanResults && scanResults.length > 0 && (
        <Grid container spacing={3} sx={{ marginTop: 4 }}>
          {/* Columna izquierda: Lista de archivos */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Resultados del Escaneo:</Typography>

            <ul>
              {scanResults.map((result, index) => (
                <li key={index}>
                  <Typography variant="body1">
                    <strong>Archivo:</strong> {result.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total de Vulnerabilidades:</strong> {result.totalVulnerabilities}
                  </Typography>
                  <ul>
                    {Object.entries(result.vulnerabilities).map(([vulnType, count]) => (
                      <li key={vulnType}>
                        <Typography variant="body2">
                          {vulnType.charAt(0).toUpperCase() + vulnType.slice(1)}: {count}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Columna derecha: Gráficos */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Gráfico de Vulnerabilidades:
            </Typography>
            {/* Gráfico de barras */}
            <BarChart data={scanResults} />

            {/* Gráfico de pastel */}
            <PieChart data={scanResults} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Scan;
