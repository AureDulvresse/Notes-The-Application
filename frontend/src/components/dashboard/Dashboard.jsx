import { useState } from "react";
import StatBox from "./StatBox";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import LineChart from "./LineChart";

const Dashboard = () => {
  const data = [
    {
      id: 1,
      gain: 8498,
      lose: 4567,
      year: 2021,
    },
    {
      id: 2,
      gain: 4567,
      lose: 1233,
      year: 2022,
    },
    {
      id: 3,
      gain: 6789,
      lose: 367,
      year: 2023,
    },
    {
      id: 4,
      gain: 5899,
      lose: 5948,
      year: 2024,
    },
  ];

  const [userData, setUserData] = useState({
    labels: data.map((data) => data.year),
    datasets: [
      {
        label: "User Gained",
        data: data.map((data) => data.gain),
        backgroundColor: [
          "rgb(79,70, 229)",
          "rgb(34, 224, 38)",
          "rgb(288, 20, 69)",
          "rgb(147, 230, 280)",
        ],
      },
    ],
  });

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
        <div className="shadow-sm px-4 flex-wrap py-2 bg-slate-200 dark:bg-slate-500 rounded-md h-[200px] md:h-full">
          <h4 className="text-slate-400 dark:text-slate-700">Note Par Jour</h4>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-1 gap-3">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
            <StatBox />
            <StatBox />
          </div>
          <StatBox title={"Note Par jour"}>
            <LineChart data={userData} />
          </StatBox>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
