import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

import NoteLoader from "../notes/NoteLoader";

const Category = () => {
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  const queryClient = useQueryClient();
  const queryKey = ["categories"];

  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/notes/")
        .then((res) => res.data),
  });

  const categories = data || [];

  const addCategory = useMutation({
    mutationFn: async () => {
      const data = {
        title: newCategory,
        description: newCategoryDescription,
      };
      await axios.post("http://localhost:8000/api/category/", data);
    },
    onSuccess: () => {
      toast.success("Category enregistrée avec succès", {
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
      setNewCategory("");
      setNewCategoryDescription("");
      queryClient.invalidateQueries({ queryKey: queryKey });
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

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] text-orange-500">
            Enregistrer une category
          </h3>
          <div className="mb-3">
            <p className="text-[18px] text-slate-600 dark:text-white">
              Titre de la category:
            </p>
            <input
              type="text"
              className="px-3 py-1 w-[300px] border-[0.8px] text-slate-700 dark:text-slate-100 border-slate-300 dark:border-slate-500 outline-none rounded-md hover:border-orange-400 focus:border-[1.2px] focus:border-orange-500 placeholder:text-slate-200 dark:placeholder:text-slate-500  bg-white dark:bg-gray-700"
              placeholder="Entrer un titre"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <p className="text-[18px] text-slate-600 dark:text-white">
              Description:
            </p>
            <input
              type="text"
              className="px-3 py-1 w-[300px] border-[0.8px] text-slate-700 dark:text-slate-100 border-slate-300 dark:border-slate-500 outline-none rounded-md hover:border-orange-400 focus:border-[1.2px] focus:border-orange-500 placeholder:text-slate-200 dark:placeholder:text-slate-500  bg-white dark:bg-gray-700"
              placeholder="Entrer une description (facultatif)"
              value={newCategoryDescription}
              onChange={(event) =>
                setNewCategoryDescription(event.target.value)
              }
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="mt-2 rounded-md bg-orange-500 px-3.5 py-2.5 w-full text-sm font-bold dark:text-white text-slate-700 shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              onClick={() => {
                newCategory == ""
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
                  : addCategory.mutate();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
