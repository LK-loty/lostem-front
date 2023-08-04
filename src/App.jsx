import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LostItemPostPage from "./pages/LostItemPostPage/LostItemPostPage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/LostItemPost" element={<LostItemPostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
