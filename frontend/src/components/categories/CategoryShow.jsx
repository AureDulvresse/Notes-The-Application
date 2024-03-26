import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import since from "since-time-ago";

import { BiArrowBack } from "react-icons/bi";

import NoteLoader2 from "../notes/NoteLoader2";

const CategoryShow = () => {
  const { id } = useParams(["id"]);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryDescription, setCurrentCategoryDescription] =
    useState("");
  const [updateDate, setUpdateDate] = useState("");

  const queryClient = useQueryClient();
  const queryKey = ["categories"];
  const { isLoading, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await axios
        .get("http://127.0.0.1:8000/api/categories/".concat(id))
        .then((res) => {
          let data = res.data;
          setCurrentCategory(data.content);
          setCurrentCategoryDescription(data.description);
          setUpdateDate(since(new Date(data.updated_at)));
          return data;
        }),
  });

  const category = data || [];

  const updateCategory = useMutation({
    mutationFn: async () => {
      const data = {
        title: currentCategory.trim(),
        description: currentCategoryDescription,
      };
      await axios.put(
        "http://localhost:8000/api/notes/".concat(category.uuid),
        data
      );
    },
    onSuccess: () => {
      toast.success("Note mis à jour avec succès", {
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
    console.log("Chargement donnée");
    return <NoteLoader2 />;
  }

  if (error) {
    console.log(error.message);
    return "Une erreur s'est produite: ";
  }

  return (
    <div>
      <ToastContainer />
      <Link
        to=""
        className="mt-3 ml-[155px] flex items-center justify-center gap-3 rounded-md bg-slate-600 dark:bg-slate-200 py-2.5 w-20 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-slate-600 dark:hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 dark:focus-visible:outline-slate-100"
      >
        <BiArrowBack />
        <span>Back</span>
      </Link>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 mt-4 mb-2 mx-auto w-3/4">
        <div className="shadow-sm px-4 flex-wrap py-3 bg-orange-200 rounded-md h-[360px]">
          <textarea
            className="bg-inherit text-white dark:text-slate-700 outline-none rounded-md focus:border focus:border-orange-200 resize-none w-full h-[290px] px-1 py-1 placeholder:text-slate-200 dark:placeholder:text-slate-500 cursor-pointer"
            placeholder="Ecrivez tout ce qui vous vient à l'esprit..."
            value={currentCategory}
            onChange={(event) => {
              setCurrentCategory(event.target.value);
            }}
          ></textarea>
          <button
            type="button"
            className="rounded-md bg-orange-500 px-3.5 py-2.5 w-[130px] text-sm font-semibold text-slate-700 dark:text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            onClick={() => updateCategory.mutate()}
          >
            Save
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="dark:bg-slate-600 bg-slate-200 rounded-md h-[300px] px-3 py-2 relative">
            <h4 className="text-slate-600 dark:text-slate-200 border-b border-b-slate-600 dark:border-b-slate-100 text-[18px] py-2 px-1">
              Détails
            </h4>
            <textarea
              className="bg-inherit mt-1 text-slate-700 dark:text-slate-100 outline-none rounded-md dark:focus:border-slate-600 focus:border focus:border-slate-100 resize-none w-full h-[160px] px-1 py-1 placeholder:text-slate-200 dark:placeholder:text-slate-500 cursor-pointer"
              placeholder="Entrer une description"
              value={currentCategoryDescription}
              onChange={(event) => {
                setCurrentCategoryDescription(event.target.value);
              }}
            ></textarea>
            <div className="mt-3 flex items-center justify-between gap-3 w-[95%] absolute bottom-4">
              <p className="text-slate-100 text-[13px] italic">
                Mise à jour: <span className=" font-medium">{updateDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShow;
