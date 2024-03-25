import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";

import NotesGrid from "./components/notes/NotesGrid";
import Note from "./components/notes/Note";
import Category from "./components/categories/Category";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Category />,
        errorElement: <ErrorPage />,
      },
      {
        path: "category/:id/show",
        element: <Category />,
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
