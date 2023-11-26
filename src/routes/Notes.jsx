import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import editIcon from "../../public/icons/edit.png";
import trashIcon from "../../public/icons/trash.png";
import { server } from "../App";

export const loader = async ({ params: { authorId } }) => {
  await server.getUser(authorId);
  const Notes = await server.getNotes(authorId);
  return { Notes };
};

export default function Notes() {
  let { Notes } = useLoaderData();
  const { authorId } = useParams();
  const [notes, setNotes] = useState(Notes);

  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();

    const id = e.target.parentElement.parentElement.attributes.id.value;
    server.deleteNote(id);

    setNotes(notes.filter((note) => note.id != id));
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    const id = e.target.parentElement.parentElement.attributes.id.value;
    navigate(`/notes/${authorId}/${id}/edit`);
  };

  const sortedNotes = notes.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="flex flex-col items-center gap-3 pt-4 pb-4">
      <h1 className="w-1/2 text-5xl font-bold mb-10">Notes</h1>
      <button
        onClick={() => navigate(`/notes/${authorId}/add`)}
        className="w-full h-12 text-center bg-emerald-900 text-white text-xl font-medium  "
      >
        Add new note
      </button>
      <div className="w-full flex flex-col gap-2">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            id={note.id}
            onClick={() => navigate(`/notes/${authorId}/${note.id}`)}
            className=" h-11  flex justify-between items-center w-full px-2 border-emerald-900 border-2 text-emerald-950 cursor-pointer"
          >
            <div className="flex gap-5">
              <p className=" font-medium">{note.title}</p>
              <p className="text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-5">
              <img
                src={editIcon}
                onClick={handleEdit}
                width="17px"
                alt="edit"
              />
              <img
                src={trashIcon}
                onClick={handleDelete}
                alt="delete"
                width="17px"
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
