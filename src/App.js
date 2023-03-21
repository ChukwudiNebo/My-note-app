import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "./Note/Note";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Note />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
