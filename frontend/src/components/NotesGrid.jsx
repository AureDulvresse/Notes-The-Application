import { useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "./NoteCard";

const NotesGrid = () => {
  const [newNote, setNewNote] = useState("");
  console.log(newNote);
  return (
    <div>
      <input
        type="text"
        className="px-3 py-1 w-[300px] border-[0.8px] border-slate-300 dark:border-slate-500 outline-none rounded-md hover:border-orange-400 focus:border-[1.2px] focus:border-orange-500 placeholder:text-slate-200 dark:placeholder:text-slate-500  bg-white dark:bg-gray-700"
        placeholder="Recherche..."
      />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-4">
        <Link to={"5/show"}>
          <NoteCard />
        </Link>
        <Link to={"5/show"}>
          <NoteCard />
        </Link>
        <Link to={"5/show"}>
          <NoteCard />
        </Link>
        <Link to={"5/show"}>
          <NoteCard />
        </Link>
        <Link to={"5/show"}>
          <NoteCard />
        </Link>
        <Link to={"5/show"}>
          <NoteCard />
        </Link>
      </div>
      <form className="mt-3 w-full flex items-start gap-2">
        <textarea
          className="border-[0.4px] border-slate-300 dark:border-slate-500 outline-none rounded-md focus:border focus:border-orange-500 resize-none w-[90%] h-[170px] px-3 py-2 text-slate-700 dark:text-slate-100 placeholder:text-slate-200 dark:placeholder:text-slate-500 bg-white dark:bg-gray-700"
          placeholder="Ecrit n'importe quoi ici..."
          onChange={(event) => setNewNote(event.target.value)}
        ></textarea>
        <button
          type="submit"
          className="rounded-md bg-orange-500 px-3.5 py-2.5 w-[110px] text-sm font-semibold text-white dark:text-slate-700 shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NotesGrid;
