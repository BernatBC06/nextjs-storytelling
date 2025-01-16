import React, { useEffect, useRef } from "react";
import { AgCharts, AgChartOptions } from "ag-charts-community";

const PlaystyleGenderRegionCharts = () => {
  const chartRef3 = useRef<HTMLDivElement | null>(null);
  const chartInstance3 = useRef<any>(null);

  useEffect(() => {
   
    const fetchDataForChart3 = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/demographic_analysis");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
  
          if (chartInstance3.current) {
            // Destruir el gráfico existente si ya fue creado
            chartInstance3.current.destroy();
          }
  
          // Crear una nueva instancia del gráfico y almacenarla
          chartInstance3.current = AgCharts.create({
            container: chartRef3.current,
            title: {
              text: "Distribución de Ansiedad por Región",
              fontSize: 18,
              color: "#ffffff",
            },
            data: data,
            series: [
              {
                type: "pie",
                angleKey: "Average_Anxiety", // Cambiado a Average_Anxiety
                labelKey: "Region",
                legendItemKey: "Region",
                label: {
                  color: "#ffffff",
                },
              },
            ],
            legend: {
              position: "bottom",
              item: { label: { color: "#ffffff" } },
            },
            background: {
              fill: "#4b5566",
            },
          });
        } catch (error) {
          console.error("Error fetching or creating chart:", error);
        }
      };

    fetchDataForChart3();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
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
          En este gráfico se muestra la distribución de los niveles de ansiedad de los jugadores por región. Se ha simplificado la distribución en asia, europa y america.
          Esta decisión viene tomada en base a la distribución de los datos, ya que la mayoría de los jugadores se encuentran en estas regiones.  
        </p>
      </div>

      {/* Tercer gráfico */}
      <div
        ref={chartRef3}
        style={{
          width: "800px",
          height: "400px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></div>

         {/* Texto Narrativo */}
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
          Se observa que la media de ansiedad es significativamente parecida entre las regiones. Aunque la guinda del apstel se la
          lleva Asia. Si bien, no es ningún secreto que en los países asiáticos la presión por el rendimiento es mucho mayor que en otros.
          Esto puede observarse en mundiales de juegos como el League of Legends o el StarCraft, siempre liderados por equipos asiaticos.
        </p>
        <p style={{ marginBottom: "10px" }}>
          En cambio es curioso como Europa tiene el nivel más bajo de todos. En los juegos mencionados anteriormente los equipos europeos 
          suelen ser lideres o como minimo estar entre los cinco mejores. ¿Será que la presión por rendimiento no es tan alta en Europa?
          También habría que analizar las condiciones socioecnómicas de cada país y su facilidad al acceso a recursos de salud mental. 
        </p>
        <p style={{ marginBottom: "10px" }}>
          Por ejemplo, la salud mental en Europa suele estar respaldada por el propio gobierno y en cambio en estdos unidos, aunque el ciudadano promedio
          tenga más recursos económicos para acceder a servicios de salud mental, estos no están tan respaldados por el gobierno.
        </p>
        <p style={{ marginBottom: "10px" }}>
        Si observamos, en el siguiente estudio, se puede ver como la salud mental en los países Europeos es mucho mejor que en otros continentes.
        </p>
        <p style={{ marginBottom: "10px" }}>
            <a 
                href="https://mentalstateoftheworld.report/wp-content/uploads/2022/04/Estado-mental-del-mundo-2021.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
            >
                Estado Mental del Mundo 2021
            </a>
        </p>
        <p style={{ marginBottom: "10px" }}>
        Es verdad que tiene unos años de antigüedad, pero es un buen punto de partida para entender la salud mental en el mundo. También al analizar el estudio se 
        puede observar que muchos países con los índices más altos de salud mental son tercermundistas o con muy poco acceso a internet. 
        </p>
      </div>
    </div>
  );
};

export default PlaystyleGenderRegionCharts;
