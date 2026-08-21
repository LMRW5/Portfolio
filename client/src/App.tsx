import { Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Projects } from "./pages/Projects"
import { MainTemplate } from "./templates/MainTemplate"
import { Gallery } from "./pages/Gallery"
import Contact from "./pages/Contact"

function App() {
const navigate = useNavigate();
return (
  <Routes>
    <Route element={<MainTemplate />}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact isOpen={true} onClose={() => {navigate(-1)}} />} />
    </Route>
  </Routes>
)
}

export default App
