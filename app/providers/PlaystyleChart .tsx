import React, { useEffect, useRef } from "react";
import { AgCharts, AgChartOptions } from "ag-charts-community";

const PlaystyleAndGenderCharts = () => {
  const chartRef1 = useRef<HTMLDivElement | null>(null);
  const chartRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchDataForChart1 = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/analysis");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const options: AgChartOptions = {
          container: chartRef1.current,
          title: {
            text: "Niveles de ansiedad por tipo de jugador",
            fontSize: 18,
            color: "#ffffff",
          },
          data: data,
          series: [
            {
              type: "bar",
              xKey: "Playstyle",
              yKey: "Median_Anxiety",
              yName: "Mediana de Ansiedad",
              label: {
                color: "#ffffff",
                formatter: (params: { value?: number }) =>
                  params.value !== undefined ? params.value.toFixed(2) : "N/A",
              },
            } as any,
            {
              type: "bar",
              xKey: "Playstyle",
              yKey: "Average_Anxiety",
              yName: "Media de Ansiedad",
            } as any,
          ],
          axes: [
            {
              type: "category",
              position: "bottom",
              title: { text: "Playstyle", color: "#ffffff" },
              label: { color: "#ffffff" },
            },
            {
              type: "number",
              position: "left",
              title: { text: "Niveles de ansiedad", color: "#ffffff" },
              label: { color: "#ffffff" },
            },
          ],
          legend: {
            position: "bottom",
            item: { label: { color: "#ffffff" } },
          },
          background: {
            fill: "#4b5566",
          },
        };

        AgCharts.create(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataForChart2 = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/gender_analysis");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const options: AgChartOptions = {
          container: chartRef2.current,
          title: {
            text: "Niveles de ansiedad por sexo",
            fontSize: 18,
            color: "#ffffff",
          },
          data: data,
          series: [
            {
              type: "bar",
              xKey: "Gender",
              yKey: "Median_Anxiety",
              yName: "Mediana de Ansiedad",
              label: {
                color: "#ffffff",
                formatter: (params: { value?: number }) =>
                  params.value !== undefined ? params.value.toFixed(2) : "N/A",
              },
            } as any,
            {
              type: "bar",
              xKey: "Gender",
              yKey: "Average_Anxiety",
              yName: "Media de Ansiedad",
            } as any,
          ],
          axes: [
            {
              type: "category",
              position: "bottom",
              title: { text: "Gender", color: "#ffffff" },
              label: { color: "#ffffff" },
            },
            {
              type: "number",
              position: "left",
              title: { text: "Niveles de ansiedad", color: "#ffffff" },
              label: { color: "#ffffff" },
            },
          ],
          legend: {
            position: "bottom",
            item: { label: { color: "#ffffff" } },
          },
          background: {
            fill: "#4b5566",
          },
        };

        AgCharts.create(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForChart1();
    fetchDataForChart2();
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
          ¿Cuales son los factores más importantes a la hora de determinar la ansiedad en los jugaodres?
        </p>
        <p style={{ marginBottom: "10px" }}>
          ¿Será el estilo de juego? ¿La competitividad? ¿El género? ¿La edad? En este trabajo se analiza la relación entre la ansiedad 
          y el estilo de juego y el género de los jugadores, por una parte. Más adelante, con un poco más de detalle, se analizará
          la relación entre el estilo de vida de los jugadores y sus niveles de ansiedad (estado laboral, nivel de educación, edad, etc).
        </p>
        <p style={{ marginBottom: "10px" }}>
          Aunque no vayamos a hacer análisis muy profundos, si se analizaran factores básicos.
        </p>
      </div>

      {/* Primer gráfico */}
      <div
        ref={chartRef1}
        style={{
          width: "800px",
          height: "400px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></div>

      {/* Texto explicativo primer grafico*/}
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
          Para este trabajo se analiza el dataset de: https://osf.io/vnbxk/. Es un estudio sobre los hábitos de juego y 
          la ansiedad en los videojugadores. Para una primera aproximación se realiza la mediana y la media de la ansiedad en tres grupos:  
          jugadores individuales (singleplayer), 
          jugadores en multijugador con amigos, y jugadores multijugador con desconocidos.
        </p>
        <p style={{ marginBottom: "10px" }}>
          Los jugadores de singleplayer presentan, en promedio, niveles de ansiedad más altos en comparación con los
          otros grupos. Esto podría estar relacionado con que este tipo de juegos, al ser más introspectivos o
          narrativos, pueden generar mayor reflexión personal o emociones intensas.
        </p>
        <p  style={{ marginBottom: "10px" }}>
        Por otro lado, jugar con amigos parece ser el escenario más "relajante", ya que está asociado con niveles de ansiedad más bajos. 
        Esto tiene sentido, ya que compartir momentos con amigos en línea puede generar apoyo emocional y un entorno más cómodo. 
        </p>
        <p>
        Sin embargo, quienes juegan con desconocidos en multijugador muestran niveles de ansiedad más elevados, probablemente por factores como la presión social, 
        la competitividad o las interacciones impredecibles.
        </p>
      </div>

      {/* Segundo gráfico */}
      <div
        ref={chartRef2}
        style={{
          width: "800px",
          height: "400px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></div>

      {/* Texto explicativo segundo grafico*/}
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
          En este segundo gráfico se analiza la ansiedad en los videojugadores según su género.
        </p>
        <p style={{ marginBottom: "10px" }}>
        Las mujeres y los géneros "otros" reportan niveles más altos de ansiedad que los hombres. 
        Esto podría reflejar diferencias en cómo se enfrentan las emociones o en cómo los distintos géneros experimentan 
        el entorno social de los videojuegos.
        </p>
        <p style={{ marginBottom: "10px" }}>
        Es notable que los hombres tienen los niveles más bajos, lo que puede sugerir que encuentran el entorno de los 
        videojuegos más relajante o menos estresante.
        </p>
        <p style={{ marginBottom: "10px" }}>
        El nivel más alto en el grupo "otros" destaca la importancia de considerar experiencias diversas en los videojuegos, 
        lo que podría requerir intervenciones específicas para mejorar su bienestar emocional. Fomentar espacios más 
        inclusivos en los videojuegos podría ayudar a reducir la ansiedad en el grupo "otros".
        </p>
        <p style={{ marginBottom: "10px" }}>
         
        </p>
      </div>
    </div>
  );
};

export default PlaystyleAndGenderCharts;
