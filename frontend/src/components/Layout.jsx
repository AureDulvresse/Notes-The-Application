const Layout = ({ username }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-[28px] text-nowrap text-orange-500 font-semibold">
          Notes
        </h2>
        <h4 className="text-[18px] text-slate-500 font-light">
          Welcome back {username}
        </h4>
      </div>
    </div>
  );
};

export default Layout;
