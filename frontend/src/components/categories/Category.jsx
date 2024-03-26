import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

import { BiTrash } from "react-icons/bi";

import NoteLoader from "../notes/NoteLoader";

const Category = () => {
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  const [categoryToRemove, setCategoryToRemove] = useState(1);

  const queryClient = useQueryClient();
  const queryKey = ["categories"];

  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/categories/")
        .then((res) => res.data),
  });

  const categories = data || [];

  const addCategory = useMutation({
    mutationFn: async () => {
      const data = {
        title: newCategory,
        description: newCategoryDescription,
      };
      await axios.post("http://127.0.0.1:8000/api/categories/", data);
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

  const removeCategory = useMutation({
    mutationFn: async () => {
      await axios.delete(
        "http://127.0.0.1:8000/api/categories/".concat(categoryToRemove)
      );
    },
    onSuccess: () => {
      toast.success("Category supprimée avec succès", {
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
          <div className="mb-3 w-full">
            <p className="text-[18px] text-slate-600 dark:text-white">
              Description:
            </p>
            <textarea
              className="border-[0.4px] border-slate-700 dark:border-slate-300 outline-none rounded-md focus:border focus:border-slate-700 resize-none w-full h-[200px] px-3 py-2 text-slate-700 dark:text-slate-100 placeholder:text-slate-200 dark:placeholder:text-slate-500 bg-white dark:bg-gray-700"
              placeholder="Entrer une description (Facultatif)"
              value={newCategoryDescription}
              onChange={(event) =>
                setNewCategoryDescription(event.target.value)
              }
            ></textarea>
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
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] text-orange-500">
            Liste de vos catégories
          </h3>
          <div className="max-h-[300px] overflow-x-hidden flex flex-col gap-4">
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center shadow-md rounded-md px-2 text-dark border dark:text-slate-300 hover:bg-orange-300 hover:text-light hover:dark:text-light leading-3 cursor-pointer"
                >
                  <Link
                    to={"categories/".concat(category.uuid) + "/show"}
                    className="font-semibold w-[90%] h-full py-4"
                  >
                    {category.title}
                  </Link>

                  <button
                    type="button"
                    className="hover:bg-red-400 px-2 py-2 text-center text-red-500 hover:text-white rounded-md shadow-sm"
                    onClick={() => {
                      setCategoryToRemove(category.id);
                      removeCategory.mutate();
                    }}
                  >
                    <BiTrash />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
