import React, { useEffect, useRef } from "react";
import { AgCharts } from "ag-charts-community";

const BubbleChartByCountry = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchBubbleChartData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/bubble_chart_data");
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
            text: "Bubble Chart: Player Anxiety by Country",
            fontSize: 18,
            color: "#ffffff",
          },
          data: data,
          series: [
            {
              type: "bubble",
              xKey: "Residence", // Country on X-axis
              yKey: "Average_Anxiety", // Anxiety on Y-axis
              sizeKey: "Bubble_Size", // Bubble size based on player count
              labelKey: "Residence", // Labels for countries
              marker: {
                fillOpacity: 0.7,
                strokeWidth: 1,
              },
            },
          ],
          axes: [
            {
              type: "category",
              position: "bottom",
              title: {
                text: "Country",
                fontSize: 14,
                color: "#ffffff",
              },
              label: {
                rotation: -45, // Rotate labels for better readability
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
    </div>
  );
};

export default BubbleChartByCountry;
