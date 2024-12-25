import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomePage from "./containers/HomePage"
import NotFoundPage from "./containers/NotFoundPage"
import SavedPage from "./containers/SavedPage"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/saved" element={<SavedPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default App
