import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import SignUp from "./Pages/SignUp.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import Login from "./Pages/Login.jsx";
import Modal from "./components/Modal.jsx";
import Verified from "./components/Verified.jsx";
import SearchResults from "./components/SearchResults.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="Home" element={<Home />} />
          <Route path="/" element={<SignUp />} />
          <Route path="Login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="Modal" element={<Modal />} />
          <Route path="Verified" element={<Verified />} />
          <Route path="SearchResults" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
