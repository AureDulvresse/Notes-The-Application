import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ data }) => {
  return (
    <div className="w-full h-full">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
