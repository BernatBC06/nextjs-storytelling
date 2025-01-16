import React, { useEffect, useRef } from "react";
import { AgCharts } from "ag-charts-community";

const BubbleChartByAge = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchBubbleChartData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/bubble_chart_age");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (chartInstance.current) {
          // Destroy the existing chart instance if it exists
          chartInstance.current.destroy();
        }

        // Create a new bubble chart
        chartInstance.current = AgCharts.create({
          container: chartRef.current,
          title: {
            text: "Ansiedad por edad",
            fontSize: 18,
            color: "#ffffff",
          },
          data: data,
          series: [
            {
              type: "bubble",
              xKey: "Age", // Change to individual ages
              yKey: "Average_Anxiety", // Anxiety on Y-axis
              sizeKey: "Bubble_Size", // Bubble size based on player count
              labelKey: "Age", // Labels for individual ages
              marker: {
                fill: "#ff8c42", // Set color to orange
                fillOpacity: 0.8, // Slightly more opaque for better visibility
                strokeWidth: 1,
                stroke: "#e56717", // Darker border for contrast
              },
            },
          ],
          axes: [
            {
              type: "number",
              position: "bottom",
              title: {
                text: "Edad",
                fontSize: 14,
                color: "#ffffff",
              },
              label: {
                color: "#ffffff",
              },
            },
            {
              type: "number",
              position: "left",
              title: {
                text: "Ansiedad Media",
                fontSize: 14,
                color: "#ffffff",
              },
              label: {
                color: "#ffffff",
              },
            },
          ],
          legend: {
            enabled: false,
          },
          background: {
            fill: "#4b5566",
          },
        });
      } catch (error) {
        console.error("Error fetching bubble chart data:", error);
      }
    };

    fetchBubbleChartData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        alignItems: "center",
      }}
    >
        {/* Texto Introductorio */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          color: "#ffffff",
          textAlign: "left",
          padding: "20px",
          background: "#3a4450",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p style={{ marginBottom: "10px" }}>
        En el siguiente gráfico podemos observar la relación entre la edad de los jugadores y sus niveles de ansiedad.
        </p>
        <p style={{ marginBottom: "10px" }}>
        Los jugadores jóvenes (10-30 años) forman la mayoría de la base de jugadores y presentan niveles de ansiedad más altos en promedio. 
        A medida que aumenta la edad, el número de jugadores disminuye significativamente, pero los niveles de ansiedad muestran una distribución más heterogénea.
        Esto podría sugerir diferencias en el comportamiento de juego, en la percepción de la ansiedad o en la forma en que estas edades interactúan con los videojuegos.
        </p>
      </div>
      {/* Bubble chart */}
      <div
        ref={chartRef}
        style={{
          width: "1000px",
          height: "500px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></div>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          color: "#ffffff",
          textAlign: "left",
          padding: "20px",
          background: "#3a4450",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p style={{ marginBottom: "10px" }}>
      Los niveles de ansiedad parecen estabilizarse y reducirse significativamente en jugadores de más de 30 años. 
      Esto podría deberse a una mayor madurez emocional, menor importancia del desempeño en juegos o un cambio en las prioridades de vida.
      </p>
      <p style={{ marginBottom: "10px" }}>
      Hay puntos fuera de la tendencia en jugadores de mayor edad (por encima de los 40 años), donde algunos jugadores muestran niveles de ansiedad sorprendentemente altos. 
      Esto podría ser investigado más a fondo para identificar factores únicos, como tipos de juegos, motivos para jugar o problemas subyacentes.
      </p>
      </div>
    </div>
  );
};

export default BubbleChartByAge;
