import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);
const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "rgba(153, 102, 255, 1)",
       backgroundColor: "rgba(153, 102, 255, 0.6)",
        fill: false,
        tension:0.1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bidders and Auctioneers Over Time",
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default BiddersAuctioneersGraph;
