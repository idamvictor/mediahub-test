import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home.jsx"
import PageNotFound from "./Pages/PageNotFound.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
