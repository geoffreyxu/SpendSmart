import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ events }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const data = {};
    let totalProfit = 0;

    // Group events by date and sum their values
    events.forEach((event) => {
      const date = new Date(event.date).toLocaleDateString();
      if (!data[date]) {
        data[date] = 0;
      }
      data[date] += event.value;
      totalProfit += event.value;
    });

    // Destroy old chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = Object.keys(data);
    const values = Object.values(data);

    const myChartRef = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Profit",
            data: values,
            fill: false,
            borderColor: "#000",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [events]);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default LineChart;
