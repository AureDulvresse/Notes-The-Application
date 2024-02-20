import StatBox from "./StatBox";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
        <div className="shadow-sm px-4 flex-wrap py-2 bg-slate-200 dark:bg-slate-500 rounded-md h-[200px] md:h-full">
          <h4 className="text-slate-400 dark:text-slate-700">Titre</h4>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-1 gap-3">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
            <StatBox />
            <StatBox />
          </div>
          <StatBox />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
