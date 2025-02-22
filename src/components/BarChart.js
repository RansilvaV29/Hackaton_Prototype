import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Limpiar gráfico anterior

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    svg.attr("width", width).attr("height", height);

    const x = d3.scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.vulnerabilities)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-20)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.vulnerabilities))
      .attr("height", (d) => height - margin.bottom - y(d.vulnerabilities))
      .attr("width", x.bandwidth())
      .attr("fill", "#007bff");
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default BarChart;
