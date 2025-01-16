import React, { useEffect, useRef } from "react";
import { AgCharts } from "ag-charts-community";

const LeagueAnxietyDistribution = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchAnxietyDistribution = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/league_anxiety_distribution");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (chartInstance.current) {
          // Destroy the existing chart instance if it exists
          chartInstance.current.destroy();
        }

        // Create a bar chart
        chartInstance.current = AgCharts.create({
          container: chartRef.current,
          title: {
            text: "Histograma de ansiedad: League of Legengds",
            fontSize: 18,
            color: "#ffffff",
          },
          data: data,
          series: [
            {
              type: "bar", // Use bar chart for preprocessed data
              xKey: "GAD_T", // Anxiety levels from backend
              yKey: "Count", // Number of players
              fill: "#42a5f5", // Blue color
              stroke: "#1976d2", // Darker blue border
              tooltip: {
                enabled: true,
                renderer: (params) => {
                  return `Histograma de ansiedad GAD_T: ${params.datum.GAD_T}\nNúmero de jugadores: ${params.datum.Count}`;
                },
              },
            },
          ],
          axes: [
            {
              type: "category",
              position: "bottom",
              title: {
                text: "Ansiedad media",
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
                text: "Numero de jugadores",
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
        console.error("Error fetching anxiety distribution data:", error);
      }
    };

    fetchAnxietyDistribution();
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
      {/* Chart container */}
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
      Aunque la mayoría de los jugadores reporta niveles bajos de ansiedad, existe una cola larga que se extiende hasta valores más altos (hasta 21). 
      Esto indica que, aunque son menos comunes, hay jugadores que experimentan una ansiedad considerablemente alta al jugar.
      </p>
      <p style={{ marginBottom: "10px" }}>
      League of Legends es conocido por su alta competitividad y necesidad de coordinación en equipo. Para algunos, estas características pueden 
      generar emoción y compromiso, mientras que para otros pueden traducirse en presión social, miedo a cometer errores o frustración.
      El gráfico muestra cómo un juego como League of Legends puede generar emociones muy variadas entre sus jugadores. Para algunos, la competencia y 
      la presión son elementos motivadores que potencian su disfrute, mientras que para otros estas mismas dinámicas pueden convertirse en una fuente de estrés,
      especialmente debido a las expectativas sociales o la frustración que puede surgir durante las partidas.
      </p>
      
      <p style={{ marginBottom: "10px" }}>
      Con una comunidad de usuarios tan amplia, el caso de League of Legends resalta la importancia de incluir en el diseño del juego herramientas que permitan 
      gestionar mejor estas emociones. Esto podría incluir sistemas de apoyo o mecánicas que ayuden a reducir el impacto emocional negativo para aquellos que experimentan 
      niveles más altos de ansiedad mientras juegan.
      </p>
    </div>
    {/*Conclusiones*/}
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
      Los videojuegos pueden ser una experiencia tanto relajante como estresante, 
      dependiendo de factores como el estilo de juego, el entorno social y las características individuales de los jugadores.
      </p>
      <p style={{ marginBottom: "10px" }}>
      La ansiedad es más prevalente entre los jugadores jóvenes, con una tendencia a disminuir conforme aumenta la edad. Esto podría reflejar la madurez emocional
       o el cambio en prioridades de vida, sugiriendo que los jóvenes podrían ser más vulnerables a los efectos emocionales de los videojuegos competitivos.
      </p>
    </div>
    </div>
  );
};

export default LeagueAnxietyDistribution;
