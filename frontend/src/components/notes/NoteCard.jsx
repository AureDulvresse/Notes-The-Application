import { Link } from "react-router-dom";
import { BiCheck, BiX } from "react-icons/bi";
import since from "since-time-ago";

const NoteCard = ({ note }) => {
  const updateDate = since(new Date(note.updated_at));

  return (
    <>
      <Link to={note.uuid + "/show"} className="">
        <div
          className="px-4 flex-wrap py-2 shadow-md rounded-md h-[200px] relative"
          style={{ backgroundColor: note.bgColor }}
        >
          <h3 className="text-white font-bold">{note.content}</h3>
          <p className="text-slate-100 font-light leading-[21px] italic line-clamp-2">
            {note.description}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 absolute bottom-4">
            <p className="text-slate-100 text-[13px] italic">
              Mise à jour: <span className=" font-medium">{updateDate}</span>
            </p>
            {note.is_task ? (
              note.status ? (
                <BiCheck className="bg-green-400 rounded-full w-5 h-5 ring-1 ring-green-400 text-slate-100 text-[20px] animate-bounce" />
              ) : (
                <BiX className="bg-red-400 rounded-full w-5 h-5 ring-1 ring-red-400 text-slate-100 text-[20px] animate-bounce" />
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default NoteCard;
