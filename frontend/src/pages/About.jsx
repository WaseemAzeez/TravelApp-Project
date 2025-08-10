// src/pages/About.jsx
import { useEffect, useState } from 'react';
import '../styles/About.css';

export default function About() {
  const [aboutContent, setAboutContent] = useState({ title: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:8000/api/pages/') // Adjust base URL if needed
      .then((res) => res.json())
      .then((data) => {
        setAboutContent(data.about);
      });
  }, []);

  return (
    <main className="about-page">
      <section className="about-container">
        <h1>{aboutContent.title}</h1>
        <p>{aboutContent.description}</p>
      </section>
    </main>
  );
}
