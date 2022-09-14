import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

import Navbar from './components/Navbar'
import Footer from './components/layout/Footer'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allusers" element={<Navigate to="/users" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/company" element={<Company />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        
      </Routes>
      <Footer />
    </Router>
  )  
}

export default App

 
