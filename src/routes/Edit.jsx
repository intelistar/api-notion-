import { useCallback } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { server } from "../App";
import NoteForm from "./NoteForm";

export const loader = async ({ params: { id } }) => {
  const note = await server.getNote(id);
  return { note };
};

export default function Edit() {
  const { note } = useLoaderData();
  const { authorId } = useParams();

  const navigate = useNavigate();

  const handleSave = useCallback( async ({ title, text }) => {
    await server.editNote(note.id, { ...note, title: title.trim(), text });

    navigate(`/notes/${authorId}/${note.id}`);
  },[]);

  return (
    <NoteForm
      onSave={handleSave}
      name={{ page: "Edit note", button: "Save" }}
      initial={{ title: note.title, text: note.text }}
    />
  );
}
