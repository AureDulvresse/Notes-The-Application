const NoteLoader2 = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-4 mb-2 mx-auto w-3/4 animate-pulse">
      <div className="shadow-sm px-4 flex-wrap py-3 bg-white dark:bg-slate-600 rounded-md h-[300px] animate-pulse">
        <div className="rounded-md bg-slate-700 dark:bg-slate-200 px-3.5 py-2.5 w-[90%] animate-pulse"></div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-1 gap-2">
        <div className="dark:bg-slate-600 bg-slate-200 rounded-md h-[200px] px-3 py-2">
          <div className="bg-white dark:bg-slate-700 rounded-full h-[20px] w-4/5 mb-2 animate-pulse"></div>
          <div className="bg-white dark:bg-slate-700 rounded-full h-[10px] w-4/5 mb-1 animate-pulse"></div>
          <div className="bg-white dark:bg-slate-700 rounded-full h-[10px] w-4/5 mb-1 animate-pulse"></div>
          <div className="bg-white dark:bg-slate-700 rounded-full h-[10px] w-4/5 mb-1 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-5">
          <div className="rounded-md bg-slate-600 dark:bg-slate-200 px-3.5 py-2.5 w-[130px] animate-pulse"></div>
          <div className="rounded-md bg-slate-600 dark:bg-slate-200 px-3.5 py-2.5 w-[130px] animate-pulse"></div>
          <div className="rounded-md bg-slate-600 dark:bg-slate-200 px-3.5 py-2.5 w-[130px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteLoader2;
