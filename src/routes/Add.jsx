import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import { server } from "../App";
import { useCallback } from "react";

export default function Add() {
  const { authorId } = useParams();

  const navigate = useNavigate();

  const handleAddNote = useCallback(async ({ title, text }) => {
    const newNote = {
      id: Date.now(),
      authorId: authorId,
      title: title.trim(),
      text,
      createdAt: Date.now(),
    };

    await server.addNote(newNote);

    navigate(`/notes/${authorId}/${newNote.id}`);
  }, []);

  return (
    <NoteForm
      onSave={handleAddNote}
      name={{ page: "Create new note", button: "Create" }}
      initial={{ title: "", text: "" }}
    />
  );
}
