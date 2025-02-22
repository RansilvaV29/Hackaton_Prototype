import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const RadarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpiar gráfico anterior

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const levels = 5;

    const angleSlice = (2 * Math.PI) / data.length;
    const scale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.vulnerabilities)]).range([0, radius]);

    const g = svg.attr("width", width).attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    for (let i = 0; i < levels; i++) {
      g.append("circle")
        .attr("r", ((i + 1) / levels) * radius)
        .attr("fill", "none")
        .attr("stroke", "#ccc");
    }

    const radarLine = d3.lineRadial()
      .radius((d) => scale(d.vulnerabilities))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    g.append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("fill", "rgba(0, 123, 255, 0.3)")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 2);

    g.selectAll(".label")
      .data(data)
      .enter().append("text")
      .attr("x", (d, i) => Math.cos(i * angleSlice - Math.PI / 2) * (radius + 20))
      .attr("y", (d, i) => Math.sin(i * angleSlice - Math.PI / 2) * (radius + 20))
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.name);
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default RadarChart;
