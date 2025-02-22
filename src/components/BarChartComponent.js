// components/BarChartComponent.jsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

const BarChartComponent = ({ data }) => {
  // Agrupamos las vulnerabilidades por departamento
  const aggregatedData = data.reduce((acc, item) => {
    const dept = item.departamento;
    if (!acc[dept]) {
      acc[dept] = { departamento: dept, vulnerabilidades: 0 };
    }
    acc[dept].vulnerabilidades += item.vulnerabilidades;
    return acc;
  }, {});

  // Convertimos el objeto en un arreglo para pasarlo al gráfico
  const chartData = Object.values(aggregatedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="departamento" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="vulnerabilidades" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
