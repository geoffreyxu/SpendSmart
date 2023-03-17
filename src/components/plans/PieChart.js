import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ events, pos }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }
    const filtered_events = (pos ? events.filter(event => event.value > 0) : events.filter(event => event.value < 0)).map(event => ({
        ...event,
        value: Math.abs(event.value),
      }));
    console.log(filtered_events);
    const eventsByTitle = filtered_events.reduce((acc, curr) => {
      if (curr.value >= 0) {
        acc[curr.title] = acc[curr.title] || 0;
        acc[curr.title] += curr.value;
      }
      return acc;
    }, {});

    chartInstance.current = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: Object.keys(eventsByTitle),
        datasets: [
          {
            data: Object.values(eventsByTitle),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#66FF66',
              '#9966FF'
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [events]);

  return <div className="chart-container"><canvas ref={chartRef} /></div>;
};

export default PieChart;
