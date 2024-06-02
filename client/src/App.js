import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./components/UpdateBlog";
import ProtectedCreateBlog from "./components/ProtectedCreateBlog";
import ProtectedUpdateBlog from "./components/ProtectedUpdateBlog";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route
          path="/createPost"
          element={
            <ProtectedCreateBlog>
              <CreateBlog />
            </ProtectedCreateBlog>
          }
        />
        <Route
          path="/post/:id/update"
          element={
            <ProtectedUpdateBlog>
              <UpdateBlog />
            </ProtectedUpdateBlog>
          }
        />
        <Route path="/post/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
