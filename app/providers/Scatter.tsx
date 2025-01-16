import React, { useEffect, useRef } from "react";
import { AgCharts } from "ag-charts-community";

const GamingVsAnxietyChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/gaming_vs_anxiety");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Transform data for scatter plot
        const chartData = data.map((item: { Hours: number; GAD_T: number }) => ({
          x: item.Hours,
          y: item.GAD_T,
        }));

        if (chartInstance.current) {
          // Destroy the existing chart instance if it exists
          chartInstance.current.destroy();
        }

        // Create the scatter chart
        chartInstance.current = AgCharts.create({
          container: chartRef.current,
          title: {
            text: "Relationship Between Gaming Hours and Anxiety Levels",
            fontSize: 18,
          },
          subtitle: {
            text: "Scatter Plot Visualization",
            fontSize: 14,
          },
          series: [
            {
              type: "scatter"as any,
              data: chartData,
              marker: {
                size: 6,
                fill: "#4caf50",
                stroke: "#000",
              },
              tooltip: {
                renderer: (params: any) => {
                  return {
                    content: `Hours: ${params.xValue}<br>Anxiety Level: ${params.yValue}`,
                  };
                },
              },
            },
          ],
          axes: [
            {
              type: "number",
              position: "bottom",
              title: {
                text: "Gaming Hours",
                fontSize: 12,
              },
            },
            {
              type: "number",
              position: "left",
              title: {
                text: "Anxiety Levels",
                fontSize: 12,
              },
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    ></div>
  );
};

export default GamingVsAnxietyChart;
