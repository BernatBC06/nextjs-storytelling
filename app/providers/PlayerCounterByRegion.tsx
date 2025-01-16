import React, { useEffect, useRef } from "react";
import { AgCharts } from "ag-charts-community";

const PlayerCountByRegionChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchDataForChart = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/player_count_by_region");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (chartInstance.current) {
          // Destroy the existing chart instance if it already exists
          chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = AgCharts.create({
          container: chartRef.current,
          title: {
            text: "Player Count by Region",
            fontSize: 18,
            color: "#ffffff",
          },
          data: data,
          series: [
            {
              type: "bar", // Bar chart for player count
              xKey: "Region",
              yKey: "Player_Count",
              label: {
                color: "#ffffff",
              },
            },
          ],
          axes: [
            {
              type: "category",
              position: "bottom",
              label: {
                color: "#ffffff",
              },
            },
            {
              type: "number",
              position: "left",
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
        console.error("Error fetching or creating chart:", error);
      }
    };

    fetchDataForChart();
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
      {/* Introductory text */}
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
          Este gráfico muestra la cantidad de jugadores por región. Las regiones están clasificadas en Asia, Europa, América y Otros,
          basándonos en los datos recopilados. El objetivo es entender la distribución de jugadores a nivel mundial. 
        </p>
      </div>

      {/* Player count by region chart */}
      <div
        ref={chartRef}
        style={{
          width: "800px",
          height: "400px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></div>
       {/* Introductory text */}
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
           Se observa que la mayoría de jugadores que han respondido a la encuesta son de la región Americana, seguidos por la región Europea. 
          Esto tiene sentido, ya que la encuesta fue realizada en inglés y la mayoría de los jugadores que respondieron son de estas regiones. 
          Aunque por ello no debemos menospreciar la cantidad de jugadores de la región Asiática, que incluso siendo poca puede ser un buen
          representativo de su país. 
        </p>
      </div>
    </div>
  );
};

export default PlayerCountByRegionChart;
