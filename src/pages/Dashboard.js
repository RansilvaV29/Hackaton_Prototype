import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, paddingLeft: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a openDLP
      </Typography>
      <Typography variant="body1">
        Aquí puedes comenzar a gestionar los archivos y vulnerabilidades.
        
      </Typography>
      <Typography variant="body1">
      NOTA: este prototipo muestra un flujo de como sería la implementación del sistema, por lo que para la misma se está haciendo uso de datos predefinidos y no reflejan el resultado real de un analisis con openDLP.
        </Typography>
    </Box>
  );
};

export default Dashboard;
