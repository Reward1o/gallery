import './App.css'
import Image from "./pages/ImageGallery/Image.tsx";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Video from "./pages/VideoGallery/Video.tsx";
import {FC} from "react";
import Home from "./components/Home.tsx";

const App: FC = () => {

   return (
      <Router>
         <NavBar/>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="image" element={<Image/>}/>
            <Route path="video" element={<Video/>}/>
         </Routes>
      </Router>
   )
}

export default App
