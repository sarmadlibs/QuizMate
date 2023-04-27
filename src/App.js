import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { LandingPage } from "./views/landing";
import StudyCards from "./components/StudyCards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/studycards" element={<StudyCards />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
