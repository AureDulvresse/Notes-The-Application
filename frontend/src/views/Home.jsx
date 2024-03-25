import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className="mt-4 mb-2 mx-auto w-3/4 bg-white dark:bg-gray-700">
      <nav className="flex items-center gap-4 mb-3">
        <Link
          to={""}
          className="text-slate-700 dark:text-slate-200 text-[20px] border px-3 py-2 rounded-md font-normal hover:text-orange-400  active:text-orange-500 active:font-normal"
        >
          Categories
        </Link>
        <Link
          to={"notes/"}
          className="text-slate-700 dark:text-slate-200 text-[20px] border px-4 py-2 rounded-md font-normal hover:text-orange-400  active:text-orange-500 active:font-normal"
        >
          Notes
        </Link>
      </nav>
      <Outlet />
    </main>
  );
};

export default Home;
