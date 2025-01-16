import React, { useEffect, useRef } from "react";
import { AgCharts, AgChartOptions } from "ag-charts-community";

const BarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options: AgChartOptions = {
      container: chartRef.current!,
      title: {
        text: "Sales by Category",
      },
      background: {
        fill: "#2d3748", // Cambia el color de fondo aquí (hexadecimal, RGB, o nombre CSS)
      },
      data: [
        { category: "Technology", sales: 120 },
        { category: "Clothing", sales: 90 },
        { category: "Furniture", sales: 50 },
      ],
      series: [
        {
          type: "bar", // Gráfico de barras
          xKey: "category", // Eje X (categorías)
          yKey: "sales", // Eje Y (valores)
          label: {
            enabled: true,
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Category",
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Sales",
          },
        },
      ],
    };

    const chart = AgCharts.create(options);

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default BarChart;
