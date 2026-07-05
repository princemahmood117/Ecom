import { useEffect, useRef } from 'react';

const StatsChart = ({ data, title, type = 'ColumnChart' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const draw = () => {
      const rows = Object.entries(data).map(([k, v]) => [k, v]);
      const chartData = window.google.visualization.arrayToDataTable([['Date', 'Earnings'], ...rows]);
      const chart = new window.google.visualization[type](ref.current);
      chart.draw(chartData, {
        title,
        colors: ['#f7c6d9'],
        backgroundColor: 'transparent',
        legend: { position: 'none' },
      });
    };

    if (window.google?.charts) {
      window.google.charts.setOnLoadCallback(draw);
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(draw);
      };
      document.body.appendChild(script);
    }
  }, [data, title, type]);

  return <div ref={ref} className="w-full h-80" />;
};

export default StatsChart;