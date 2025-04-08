import "chart.js/auto";

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // Скрываем легенду
      },
      tooltip: {
        backgroundColor: "#2a2a2a",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#333",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#333",
          display: false, // Скрыть вертикальные линии сетки
        },
        ticks: {
          display: false, //
          // paddingBottom:5,
          // maxTicksLimit: 6,   // Максимум 10 подписей на оси
          // color: "#aaa",
          // maxRotation: 30,
          // minRotation:30, // Наклон подписей
          // autoSkip: true, // Оставляем метки пустыми, а не убираем их
        },
      },
      y: {
        grid: {
          color: "#333", // Цвет горизонтальных линий
        },
        ticks: {
          color: "#aaa", // Цвет подписей по оси Y
        },
      },
    },
  };


