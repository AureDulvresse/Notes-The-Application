// eslint-disable-next-line react/prop-types
const Header = ({ username }) => {
  return (
    <header className="flex items-center justify-around px-5 py-3 shadow-md bg-white dark:bg-gray-700">
      <div className="flex items-center justify-between w-80 gap-6">
        <h2 className="text-[28px] text-orange-500 font-semibold">Notes</h2>
        <h4 className="text-[18px] text-slate-500 font-light dark:text-white">
          Welcome back {username}
        </h4>
      </div>

      <img
        className="inline-block h-10 w-10 rounded-full ring-1 ring-orange-400"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </header>
  );
};

export default Header;
