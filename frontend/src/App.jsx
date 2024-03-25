import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./views/Home";
import Note from "./views/Note";
import ErrorPage from "./views/ErrorPage";

import Dashboard from "./components/dashboard/Dashboard";
import NotesGrid from "./components/notes/NotesGrid";
import CategoriesGrid from "./components/categories/CategoriesGrid";

const queryClient = new QueryClient();

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
        path: "categories/",
        element: <CategoriesGrid />,
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
]);

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
