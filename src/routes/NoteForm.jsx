import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteForm({ onSave, name, initial }) {
  const [title, setTitle] = useState(initial.title);
  const [text, setText] = useState(initial.text);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSave = () => {
    if (title.trim() === "") {
      setError("you can not add an empty name or name only from spaces");
      setTitle("");
    } else {
      onSave({ title, text });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center mb-5">
        <div className="w-1/4 flex justify-start items-center">
          <button
            onClick={() => navigate(-1)}
            className="  text-center text-emerald-800 font-semibold text-lg  h-10"
          >
            Back
          </button>
        </div>
        <h1 className="w-1/2 text-3xl  font-bold">{name.page}</h1>
        <div className="w-1/4"></div>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Name"
        className="h-10 border-2 border-emerald-950 pl-2 text-lg "
      />
      {error && <div className="text-red-500">{error}</div>}
      <textarea
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Note text"
        className="border-2 border-emerald-950 pl-2 pt-2 text-lg"
      ></textarea>
      <button
        onClick={handleSave}
        className="text-center bg-emerald-900 text-white text-xl font-medium  h-14"
      >
        {name.button}
      </button>
    </div>
  );
}

export default React.memo(NoteForm);
