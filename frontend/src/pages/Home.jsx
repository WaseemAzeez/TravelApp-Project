// src/pages/Home.jsx
import '../styles/Home.css'

export default function Home({ entries }) {
    return (
        <main className="home-page">
            <h1 className="home-title">Welcome to the travel app!</h1>
            <div className="entries-list">
                {entries}
            </div>
        </main>
    )
}
