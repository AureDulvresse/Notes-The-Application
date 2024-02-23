import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BiCollection, BiTask } from "react-icons/bi";
import StatBox from "./StatBox";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const Dashboard = () => {
  const data1 = [
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
    labels: data1.map((data1) => data1.year),
    datasets: [
      {
        label: "User Gained",
        data: data1.map((data1) => data1.gain),
        backgroundColor: [
          "rgb(79,70, 229)",
          "rgb(34, 224, 38)",
          "rgb(288, 20, 69)",
          "rgb(147, 230, 280)",
        ],
      },
    ],
  });

  const queryClient = useQueryClient();
  const queryKey = ["stats"];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/statistiques/1")
        .then((res) => res.data),
  });

  if (isLoading) {
    return "Chargement des données...";
  }

  if (error) {
    console.log(error.message);
    return "Une erreur s'est produite: ";
  }

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
        <div className="shadow-sm px-4 flex-wrap py-2 bg-slate-200 dark:bg-slate-500 rounded-md h-[200px] md:h-full">
          <h4 className="text-slate-400 dark:text-slate-700">Note Par Jour</h4>
          <div className="min-h-full min-w-fit">
            <LineChart data={userData} />
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-1 gap-3">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
            <StatBox title={"Nombre de categorie"}>
              <div className="flex items-center justify-center gap-2">
                <BiCollection className="text-orange-400 text-bold text-[68px]" />
                <h2 className="text-orange-400 text-bold text-[72px]">
                  {data.nb_categories}
                </h2>
              </div>
            </StatBox>
            <StatBox title={"Nombre de notes"}>
              <div className="flex items-center justify-center px-4 gap-2">
                <BiTask className="text-orange-400 text-bold text-[68px]" />
                <h2 className="text-orange-400 text-bold text-[72px]">
                  {data.nb_notes}
                </h2>
              </div>
            </StatBox>
          </div>
          <StatBox title={"Note Par jour"}>
            <BarChart data={userData} />
          </StatBox>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
