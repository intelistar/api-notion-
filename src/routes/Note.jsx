import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import editIcon from "../../public/icons/edit.png";
import trashIcon from "../../public/icons/trash.png";
import { server } from "../App";

export const loader = async ({ params: { id } }) => {
  const note = await server.getNote(id);

  return { note };
};

export default function Note() {
  const { note } = useLoaderData();

  const { authorId } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await server.deleteNote(note.id);

    navigate(`/notes/${authorId}`);
  };

  return (
    <div className=" py-5">
      <div className="flex justify-between">
        <div className="w-1/3 flex justify-start items-center">
          <button
            onClick={() => navigate(`/notes/${authorId}`)}
            className="  text-center text-emerald-800 font-semibold text-lg  h-10"
          >
            Back
          </button>
        </div>
        <h1 className=" w-1/3 text-3xl font-bold text-center ">{note.title}</h1>
        <div className=" w-1/3 flex gap-5 justify-end items-center ">
          <img
            src={editIcon}
            onClick={() => navigate(`/notes/${authorId}/${note.id}/edit`)}
            width="20px"
            className=" cursor-pointer"
            alt="edit"
          />
          <img
            src={trashIcon}
            onClick={handleDelete}
            alt="delete"
            width="20px"
            className=" cursor-pointer"
          />
        </div>
      </div>
      <hr />
      <p className="w-full text-xl mt-4 p-3 text-start break-all ">
        {note.text}
      </p>
    </div>
  );
}
