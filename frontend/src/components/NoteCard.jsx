const NoteCard = () => {
  return (
    <div className="shadow-sm px-4 flex-wrap py-2 bg-orange-300 rounded-md h-[200px]">
      <h3 className="text-white dark:text-slate-700 font-bold">
        Lorem ipsum dolor sit amet consectetur
      </h3>
      <p className="text-slate-100 dark:text-slate-600 font-light break-words line-clamp-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
        quos delectus eveniet itaque explicabo sit repudiandae quod. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Tenetur tempore
        reprehenderit, ex quia, fuga harum in recusandae eaque similique
        praesentium neque? Recusandae, officiis eaque saepe a minus earum vitae
        fuga.
      </p>
      <div className="mt-3 flex items-center justify-between gap-1">
        <p className="text-slate-600 dark:text-slate-100 text-[14px] font-medium">
          Mise à jour: 12/02/2024
        </p>
        <p className="bg-green-400 rounded-full px-3 ring-1 ring-green-400 text-slate-100 dark:text-slate-600 text-[14px] font-medium">
          Completed
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
