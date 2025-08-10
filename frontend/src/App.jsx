import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Entry from './components/Entry'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ResetPassword from './pages/ResetPassword';
import ResetConfirm from './pages/ResetConfirm';

export default function App() {
  const [entries, setEntries] = useState([])
  const [pages, setPages] = useState({})

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/core/')
    .then(res => res.json())
    .then(data => {
      console.log("Fetched core data:", data);  // Add this line
      setEntries(data);
    })
    .catch(err => console.error("Error loading entries:", err));

  fetch('http://127.0.0.1:8000/api/pages/')
    .then(res => res.json())
    .then(data => setPages(data))
    .catch(err => console.error("Error loading pages:", err));
}, []);

  const entryElements = entries.map(entry => (
    <Entry key={entry.id} {...entry} img={{ src: entry.img_src, alt: entry.img_alt }} />
  ))

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home entries={entryElements} content={pages.home} />} />
        <Route path='/about' element={<About content={pages.about} />} />
        <Route path='/contact' element={<Contact content={pages.contact} />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password-confirm/:uid/:token" element={<ResetConfirm />} />


      </Routes>
    </div>
  )
}