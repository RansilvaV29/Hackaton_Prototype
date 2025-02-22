import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpiar gráfico anterior

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    svg.attr("width", width).attr("height", height);

    const x = d3.scalePoint()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.vulnerabilities)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    const line = d3.line()
      .x((d) => x(d.name))
      .y((d) => y(d.vulnerabilities))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("cx", (d) => x(d.name))
      .attr("cy", (d) => y(d.vulnerabilities))
      .attr("r", 5)
      .attr("fill", "#007bff");
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default LineChart;
