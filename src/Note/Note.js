import React, { useState } from "react";
import "./note.css";

const Note = (e) => {
  const [notes, setNotes] = useState([]);
  const random = Math.random();
  const [textarea, setTextarea] = useState({
    id: random,
    note: "",
  });

  const onChange = (e) => {
    setTextarea({ id: textarea.id, note: e.target.value });
  };

  const onClick = () => {
    if (!textarea.note) {
      console.log("empty");
    } else {
      //   const obj = notes.find((element) => element.id === textarea.id);
      const index = notes.findIndex((item) => item.id === textarea.id);

      if (index !== -1) {
        // const filter = notes.filter((item) => item.id !== textarea.id);
        const cloneNotes = [...notes];
        cloneNotes.splice(index, 1, textarea);
        setNotes([...cloneNotes]);
      } else {
        setNotes((prev) => [...prev, textarea]);
      }
      setTextarea({ id: random, note: "" });
    }
  };

  const edit = (index) => {
    const obj = notes[index];
    setTextarea({ ...obj });
    // index .. My Code
    // const arr = notes[index].note;
    // setTextarea((prev) => ({ ...prev, note: arr }));
  };

  const deleteNote = (index) => {
    const removeItemFromArray = notes.filter((element,i)=>index!==i)
    setNotes(removeItemFromArray)
  };

  return (
    <>
      <div>
        <h3>Type your notes here</h3>
        <div>
          <textarea
            name="textarea"
            id={textarea.id}
            cols={30}
            rows={10}
            value={textarea.note}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={onClick}
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <div>
            {notes.map((item, index) => (
              <div
                key={index}
                className="d-flex p-3 my-2"
                style={{
                  border: "1px solid red",
                  height: "200px",
                  width: "250px",
                }}
              >
                <p>{item.note}</p>
                <div className="mx-2">
                  <button
                    className="btn-secondary btn"
                    onClick={() => edit(index)}
                  >
                    Edit
                  </button>
                </div>
                <div className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteNote(index)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
