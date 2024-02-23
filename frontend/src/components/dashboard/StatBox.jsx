const StatBox = ({ title, children }) => {
  return (
    <div className="shadow-sm px-4 flex items-center flex-col py-2 bg-slate-200 dark:bg-slate-500 rounded-md h-[200px]">
      <h4 className="text-slate-400 dark:text-slate-700">{title}</h4>
      <div className="min-h-fit min-w-fit">{children}</div>
    </div>
  );
};

export default StatBox;
