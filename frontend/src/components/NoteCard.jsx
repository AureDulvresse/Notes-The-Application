import { Link } from "react-router-dom";
import { BiCheck, BiX } from "react-icons/bi";

import { updatedAgo } from "../index.js";

const NoteCard = ({ note }) => {
  const updateDate = updatedAgo(note.updated_at);

  return (
    <>
      <Link to={note.uuid + "/show"}>
        <div
          className="px-4 flex-wrap py-2 shadow-md rounded-md h-[180px] relative"
          style={{ backgroundColor: note.bgColor }}
        >
          <h3 className="text-white font-bold">{note.content}</h3>
          <p className="text-slate-100 font-light break-words line-clamp-4">
            {note.description}
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 absolute bottom-4">
            <p className="text-slate-100 text-[14px]">
              Mise à jour:{" "}
              {updateDate == 0 ? "Aujourd'hui" : "il y a ".concat(updateDate)}
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
