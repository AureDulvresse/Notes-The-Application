import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { randomRgbaColor } from "../..";

import NoteCard from "./NoteCard";
import NoteLoader from "./NoteLoader";

import { BiSolidFilePdf } from "react-icons/bi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import NoteTemplatePDF from "../layout/NoteTemplatePDF";

const Notes = () => {
  const [newNote, setNewNote] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [newNoteCategory, setNewNoteCategory] = useState("1");
  const [is_task, setIs_task] = useState(false);

  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();
  const queryKey = [["notes"], ["categories"]];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey[0],
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/notes/")
        .then((res) => res.data),
  });

  const { data: cats } = useQuery({
    queryKey: queryKey[1],
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/categories/")
        .then((res) => res.data),
  });

  const notesList = data || [];
  const categories = cats || [];

  const addNote = useMutation({
    mutationFn: async () => {
      const data = {
        content: newNote,
        description: newNoteDescription,
        category: newNoteCategory,
        is_task: is_task,
        bgColor: randomRgbaColor(),
      };
      await axios.post("http://localhost:8000/api/notes/", data);
    },
    onSuccess: () => {
      toast.success("Note créée avec succès", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setNewNote("");
      setNewNoteDescription("");
      setIs_task(false);
      queryClient.invalidateQueries({ queryKey: queryKey[0] });
    },
    onError: () => {
      toast.error("Une erreur s'est produite", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

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
      <ToastContainer />

      <div className="flex justify-between items-center">
        <input
          type="text"
          className="px-3 py-1 w-[300px] border-[0.8px] text-slate-700 dark:text-slate-100 border-slate-300 dark:border-slate-500 outline-none rounded-md hover:border-orange-400 focus:border-[1.2px] focus:border-orange-500 placeholder:text-slate-200 dark:placeholder:text-slate-500  bg-white dark:bg-gray-700"
          placeholder="Recherche..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PDFDownloadLink
          document={<NoteTemplatePDF />}
          fileName="Liste des notes"
          className="bg-orange-500 hover:bg-orange-300 px-2 py-2 rounded-md shadow-sm text-white hover:text-slate-700 flex items-center"
        >
          <span className="font-semibold">
            {(loading, error) => {
              loading ? "Preparation du fichier..." : "Imprimer la liste";
              error
                ? toast.error(
                    "Une erreur s'est produite lors du téléchargement",
                    {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Bounce,
                    }
                  )
                : "";
            }}
            Imprimer la liste
          </span>
          <BiSolidFilePdf className="text-[24px]" />
        </PDFDownloadLink>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 mt-4">
        {notesList
          .filter((note) => {
            return search.toLowerCase() === ""
              ? note
              : note.content.toLowerCase().includes(search) ||
                  note.description.toLowerCase().includes(search);
          })
          .map((note, index) => {
            return <NoteCard note={note} key={index} />;
          })}
      </div>
      <form className="mt-3 w-full md:grid md:grid-cols-2 flex gap-2 flex-col">
        <textarea
          className="border-[0.4px] border-slate-300 dark:border-slate-700 outline-none rounded-md focus:border focus:border-slate-700 resize-none w-full h-[200px] px-3 py-2 text-slate-700 dark:text-slate-100 placeholder:text-slate-200 dark:placeholder:text-slate-500 bg-white dark:bg-gray-700"
          placeholder="Ecrit n'importe quoi ici..."
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        ></textarea>
        <div className="flex items-start flex-col gap-2 w-full">
          <textarea
            className="border-[0.4px] border-slate-300 dark:border-slate-600 outline-none rounded-md focus:border focus:border-slate-700 resize-none w-full h-[70px] px-3 py-2 text-slate-700 dark:text-slate-100 placeholder:text-slate-200 dark:placeholder:text-slate-500 bg-white dark:bg-gray-700"
            placeholder="Description (optionnel)"
            onChange={(event) => setNewNoteDescription(event.target.value)}
          ></textarea>
          <div className="mb-3 flex items-center gap-2">
            <p className="text-[18px] text-slate-600 dark:text-white">
              Categorie:
            </p>
            <select
              className="px-2 py-1 rounded-md bg-inherit outline-none border-[0.4px] border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white"
              onChange={(event) => setNewNoteCategory(event.target.value)}
              value={newNoteCategory}
            >
              {categories.map((category, index) => (
                <option
                  className="text-slate-700 dark:text-white bg-slate-200 dark:bg-slate-600 cursor-pointer"
                  key={index}
                  value={category.id}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-white">Enregistrer comme tâche </p>
            <div
              className="rounded-full w-12 h-6 relative cursor-pointer"
              style={{
                backgroundColor: is_task
                  ? "rgb(249 115 22 / var(--tw-bg-opacity))"
                  : "rgb(203 213 225 / var(--tw-bg-opacity))",
              }}
              onClick={() => setIs_task(!is_task)}
            >
              <div
                className="absolute bg-slate-50 dark:bg-slate-600 rounded-full w-5 h-5"
                style={{
                  left: !is_task ? "4%" : "53%",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              ></div>
            </div>
          </div>
          <button
            type="button"
            className="mt-2 rounded-md bg-orange-500 px-3.5 py-2.5 w-full text-sm font-bold dark:text-white text-slate-700 shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            onClick={() => {
              newNote == ""
                ? toast.error("Vous ne pouvez pas enregistrer de note vide", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  })
                : addNote.mutate();
            }}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notes;
