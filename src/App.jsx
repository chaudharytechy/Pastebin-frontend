import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste";
import ViewPaste from "./pages/ViewPaste";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
