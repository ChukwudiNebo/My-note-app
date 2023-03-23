import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import "./note.css";

const Note = (e) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [notes, setNotes] = useState([]);
  const random = Math.random();
  // const [title, setTitle] = useState({});
  const [textarea, setTextarea] = useState({
    id: random,
    title: "",
    text: "",
  });

  const { id, title, text } = textarea;
  const onChange = (e) => {
    setTextarea({
      ...textarea,
      id: textarea.id,
      [e.target.name]: e.target.value,
    });
  };
  const onClick = () => {
    if (!text && !title) {
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
      setTextarea({ text: "", title: "" });
    }
  };

  // Edit notes
  const edit = (index) => {
    const obj = notes[index];
    setTextarea({ ...obj });
    // index .. My Code
    // const arr = notes[index].note;
    // setTextarea((prev) => ({ ...prev, note: arr }));
  };

  // Delete notes
  const deleteNote = (index) => {
    const removeItemFromArray = notes.filter((element, i) => index !== i);
    setNotes(removeItemFromArray);
  };

  const filteredSearch = notes.filter((items) =>
    items.title.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  useEffect(() => {
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const saveArrayToTextFile =()=>{
    // console.log(notes)
    const file = new Blob([JSON.stringify(notes,null,2)],{type:'text/plain;charset=utf-8'});
    FileSaver.saveAs(file,'notes.txt')
  }

  return (
    <>
      <div className="note">
        <div className="note__header">
          <h3>Type your notes here</h3>
          <p>Your notes are safe here</p>
        </div>
        <div className="d-flex flex-wrap justify-content-center note__section">
          <form className="">
            <div>
              <div className="">
                <input
                  placeholder="Title of Note"
                  name="title"
                  value={textarea.title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="">
                <textarea
                  name="text"
                  // id={textarea.id}
                  cols={30}
                  rows={10}
                  value={textarea.text}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
          </form>
          <div className="note__button">
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div>
            {notes.length && (
              <div className="note__search-content">
                <div>
                  <label>Search Note</label>
                </div>
                <div>
                  <input
                    type="search"
                    name=""
                    id="note__array-searchbar"
                    placeholder="Search Note"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  {!searchTerm ? (
                    <div style={{ color: "white", fontSize: "12px" }}>
                      No search note
                    </div>
                  ) : (
                    filteredSearch.map((search, index) => (
                      <div style={{ color: "white" }} key={index}>
                        {search.title}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ paddingBottom: "50px" }}>
            {notes.map((item, index) => (
              <div key={index} className="p-3 my-2 note__array">
                <div className="note__array-paragraph">
                  <div className="note__array-title">
                    <h4>{item.title}</h4>
                  </div>
                  <div>
                    <p>{item.text}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="">
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
              </div>
            ))}
          </div>
          <div>
            <button className="btn btn-danger" onClick={saveArrayToTextFile}>
              Save Notes as textFile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
