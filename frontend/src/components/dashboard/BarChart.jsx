import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ data }) => {
  return (
    <div className="w-full h-full">
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
