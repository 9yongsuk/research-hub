import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Role from "./pages/about/Role";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Layout이 공통 틀 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/role" element={<Role />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          </Route>
      </Routes>
    </HashRouter>
  );
}