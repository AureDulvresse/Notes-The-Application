import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./views/Home";
import Note from "./views/Note";
import ErrorPage from "./views/ErrorPage";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Dashboard from "./components/Dashboard";
import NotesGrid from "./components/NotesGrid";
import Profile from "./views/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notes/",
        element: <NotesGrid />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "notes/:id/show",
    element: <Note />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profil",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <Header username={"Aure"} />
      <RouterProvider router={router} />
      <Footer />
    </React.StrictMode>
  );
};

export default App;
