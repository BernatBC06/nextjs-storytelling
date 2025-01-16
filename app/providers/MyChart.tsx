// app/providers/MyChart.tsx
import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef } from "react";
import { AgCharts, AgChartOptions, AgPieSeriesOptions } from "ag-charts-community";


const MyChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    const options: AgChartOptions = {
      background: {
        fill: "#2d3748", // Cambia el color de fondo aquí (hexadecimal, RGB, o nombre CSS)
      },
      container: chartRef.current!,
      data: [
        { label: "Apple", value: 56 },
        { label: "Orange", value: 34 },
        { label: "Banana", value: 22 },
      ],
      series: [
        {
          type: "pie",
          angleKey: "value", // Llave para el ángulo del gráfico (valores)
          labelKey: "label", // Llave para las etiquetas del gráfico
        } as AgPieSeriesOptions, // Asegura que se interprete como un tipo Pie Series
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

export default MyChart;
