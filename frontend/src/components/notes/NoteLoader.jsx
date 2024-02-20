const NoteLoader = () => {
  return (
    <div className="shadow-sm px-4 flex-wrap py-2 bg-slate-300 dark:bg-slate-600 rounded-md h-[100px] animate-pulse">
      <div className="bg-white dark:bg-slate-700 rounded-full h-[20px] w-4/5 mb-2 animate-pulse"></div>
      <div className="bg-white dark:bg-slate-700 rounded-full h-[10px] w-4/5 mb-1 animate-pulse"></div>
      <div className="mt-3 flex items-center justify-between gap-1">
        <div className="bg-white dark:bg-slate-700 rounded-full h-[10px] w-4/5 animate-pulse"></div>
        <div className="bg-white dark:bg-slate-700 rounded-full h-[10px] w-4/5 animate-pulse"></div>
      </div>
    </div>
  );
};

export default NoteLoader;
