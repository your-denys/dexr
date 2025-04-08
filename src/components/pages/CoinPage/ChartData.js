// Формируем данные для Line Chart
import "chart.js/auto";
import "chartjs-adapter-date-fns"; // Адаптер для работы с датами

function ChartData({ chartResponse }) {
  const formattedChartData = {
    labels: chartResponse.data.prices.map((price) => new Date(price[0])), // Исправляем формат
    datasets: [
      {
        label: "USD",
        data: chartResponse.data.prices.map((price) => ({
          x: new Date(price[0]), // Дата
          y: price[1], // Значение
        })),
        borderColor: "#4CAF50",
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvas, chartArea } = chart;
          if (!chartArea) return "rgba(0, 0, 0, 0)";

          const gradient = canvas.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(76,175,80,0.4)");
          gradient.addColorStop(1, "rgba(76,175,80,0)");
          return gradient;
        },
        fill: true,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };
  return formattedChartData;
}
export default ChartData