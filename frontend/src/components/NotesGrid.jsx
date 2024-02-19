import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NoteCard from "./NoteCard";
import NoteLoader from "./NoteLoader";
import { useEffect, useState } from "react";

const NotesGrid = () => {
  const [newNotes, setNewNote] = useState("");

  const queryClient = useQueryClient();
  const queryKey = ["notes"];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/notes/")
        .then((res) => res.data),
  });

  const notesList = data || [];

  if (isLoading) {
    console.log("Chargement des données...");
    return (
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 mt-4">
        <NoteLoader />
        <NoteLoader />
        <NoteLoader />
        <NoteLoader />
      </div>
    );
  }

  if (error) {
    console.log(error.message);
    return "Une erreur s'est produite: ";
  }

  return (
    <div>
      <input
        type="text"
        className="px-3 py-1 w-[300px] border-[0.8px] text-slate-700 dark:text-slate-100 border-slate-300 dark:border-slate-500 outline-none rounded-md hover:border-orange-400 focus:border-[1.2px] focus:border-orange-500 placeholder:text-slate-200 dark:placeholder:text-slate-500  bg-white dark:bg-gray-700"
        placeholder="Recherche..."
      />
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 mt-4">
        {notesList.map((note, index) => {
          return <NoteCard note={note} key={index} />;
        })}
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
