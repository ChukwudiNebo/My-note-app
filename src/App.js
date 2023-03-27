import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "./Note/Note";
import Typetest from "./Type test/Typetest";

import "./App.css";
import Recipe from "./Recipe app/Recipe";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Note />}></Route>
          <Route path="/type" exact element={<Typetest />}></Route>
          <Route path="/recipe" exact element={<Recipe />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
