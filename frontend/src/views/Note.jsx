import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { updatedAgo } from "../index.js";

import NoteLoader2 from "./../components/NoteLoader2";

const Note = () => {
  const { id } = useParams(["id"]);

  const [updateNote, setUpdateNote] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  const queryClient = useQueryClient();
  const queryKey = ["note"];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/notes/".concat(id))
        .then((res) => {
          setUpdateNote(res.data.content);
          setUpdateDate(updatedAgo(res.data.updated_at));
          return res.data;
        }),
  });

  const note = data || "";

  if (isLoading) {
    console.log("Chargement donnée");
    return <NoteLoader2 />;
  }

  if (error) {
    console.log(error.message);
    return "Une erreur s'est produite: ";
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-4 mb-2 mx-auto w-3/4">
      <div className="shadow-sm px-4 flex-wrap py-3 bg-orange-300 rounded-md h-[360px]">
        <textarea
          className="bg-inherit text-white dark:text-slate-700 outline-none rounded-md dark:focus:border-slate-600 focus:border focus:border-slate-100 resize-none w-full h-[290px] px-1 py-1 placeholder:text-slate-200 dark:placeholder:text-slate-500 cursor-pointer"
          placeholder="Ecrivez tout ce qui vous vient à l'esprit..."
          value={updateNote}
          onChange={(event) => {
            setUpdateNote(event.target.value);
          }}
        ></textarea>
        <button
          type="button"
          className="rounded-md bg-orange-500 px-3.5 py-2.5 w-[130px] text-sm font-semibold text-white dark:text-slate-700 shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Save
        </button>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-1 gap-2">
        <div className="dark:bg-slate-600 bg-slate-200 rounded-md h-[300px] px-3 py-2 relative">
          <h4 className="text-slate-600 dark:text-slate-200 border-b border-b-slate-600 dark:border-b-slate-100 text-[18px] py-2 px-1">
            Détails
          </h4>
          <p className="text-slate-600 dark:text-slate-200">
            {note.description}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 absolute bottom-4">
            <p className="text-slate-100 text-[14px]">
              Mise à jour:{" "}
              {updateDate == 0 ? "Aujourd'hui" : "il y a ".concat(updateDate)}
            </p>
            {note.is_task ? (
              note.status ? (
                <p className="bg-green-400 rounded-full px-3 ring-1 ring-green-400 text-slate-100 text-[12px] w-[100px]">
                  Completed
                </p>
              ) : (
                <p className="bg-red-500 rounded-full px-3 ring-1 ring-red-500 text-slate-100 text-[12px] w-[100px]">
                  Not Done
                </p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="rounded-md bg-green-500 px-3.5 py-2.5 w-[110px] text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Completer
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-3.5 py-2.5 w-[110px] text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Supprimer
          </button>
          <Link
            to="/notes/"
            className="rounded-md bg-slate-600 dark:bg-slate-200 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-slate-600 dark:hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 dark:focus-visible:outline-slate-100"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
