import React, { useEffect, useRef, useState } from "react";
import { AgCharts } from "ag-charts-community";

// Definir el tipo de los datos que devuelve el backend
type GameData = {
  Game: string;
  Average_Anxiety: number;
  Player_Count: number;
};

const TopAnxietyGames = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);
  const [data, setData] = useState<GameData[]>([]); // Especificar el tipo de los datos

  useEffect(() => {
    const fetchTopAnxietyGames = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/top_5_anxiety_games");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: GameData[] = await response.json(); // Especificar el tipo aquí
        setData(result);

        if (chartInstance.current) {
          // Destroy the existing chart instance if it exists
          chartInstance.current.destroy();
        }

        // Crear el gráfico
        chartInstance.current = AgCharts.create({
          container: chartRef.current,
          title: {
            text: "Los 5 juegos con mayor ansiedad promedio",
            fontSize: 18,
            color: "#ffffff",
          },
          data: result,
          series: [
            {
              type: "bar",
              xKey: "Game", // Nombre del juego
              yKey: "Average_Anxiety", // Niveles de ansiedad
              label: {
                enabled: true,
              },
              tooltip: {
                enabled: true,
              },
              fill: "#ff8c42", // Color naranja para las barras
            },
          ],
          axes: [
            {
              type: "category",
              position: "bottom",
              title: {
                text: "Game",
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
                text: "Average Anxiety",
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
        console.error("Error fetching top anxiety games data:", error);
      }
    };

    fetchTopAnxietyGames();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        alignItems: "center",
      }}
    >    {/* Texto Introductorio */}
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
      Como parte de nuestro análisis, hemos identificado los 5 juegos con los niveles de ansiedad promedio más altos. La parte que mcuhos esperan y la verdad
      es que los resultados sorprenden. Cualquier entusiasta de los videojuegos podría esperar que League of Legends i Counter Strike: Global Offensive estuvieran 
      liderando la lsita pero la realidad es que no es así.
      </p>
    </div>

      {/* Gráfico de barras */}
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

      {/* Tabla para más detalles */}
      {data.length > 0 && (
        <table
          style={{
            width: "800px",
            borderCollapse: "collapse",
            marginTop: "20px",
            color: "#ffffff",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#4b5566" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Game</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Average Anxiety</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Player Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#6b7280" : "#4b5566",
                }}
              >
                <td style={{ padding: "10px" }}>{item.Game}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {item.Average_Anxiety.toFixed(2)}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {item.Player_Count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
      Los datos muestran los cinco videojuegos con los niveles promedio de ansiedad más altos entre los jugadores. 
      Hearthstone lidera la lista con una ansiedad promedio de 5.88, seguido por Diablo 3 con 5.74. Juegos categorizados como "otros" 
      también presentan un promedio alto, posiblemente debido a una diversidad de experiencias en esta categoría. 
      Heroes of the Storm y League of Legends completan la lista con promedios de 5.41 y 5.20 respectivamente.
      </p>
      <p style={{ marginBottom: "10px" }}>
      League of Legends y Heroes of the Storm: Estos juegos multijugador competitivos también muestran altos niveles de ansiedad, aunque están algo más abajo en la lista.
      Esto podría estar relacionado con la intensa dinámica de trabajo en equipo, donde los errores individuales pueden afectar al grupo, generando estrés social. Es conocido
      que en este tipo de juegos la toxicidad es un problema común, lo que podría aumentar la ansiedad de los jugadores. Curiosamente con tan pcoos jugadores en Heroes of the Storm
      la ansiedad promedio es muy alta. Por otra parte, siendo League of Legends el juego con más jugadores de la lista tiene una ansiedad muy alta y cualquiera podría pensar que 
      al jugarlo tantas personas la ansiedad sería menor.
      </p>
      <p style={{ marginBottom: "10px" }}>
        Como principalmente es League of Legends como el juego con más jugadores y con una ansiedad muy alta,
         a continuación se mostrará un gráfico de la distribución de la ansiedad en League of Legends.
      </p>
    </div>

    </div>
  );
};

export default TopAnxietyGames;
