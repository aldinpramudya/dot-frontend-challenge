import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("user");
        if (storedName) {
            setUsername(storedName);
        } else {
            navigate("/"); // jika belum login, kembali ke login
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const startQuiz = () => {
        navigate("/question")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-black text-center px-6">
            <p className="text-lg mb-8 max-w-lg">
                Welcome {username}
            </p>
            <h1 className="text-5xl font-bold mb-4">DOT Challenge Frontend</h1>
            <p className="text-lg mb-8 max-w-lg">
                Opentdb API Quiz
            </p>
            <div className="flex space-x-4">
                <button
                    onClick={startQuiz}
                    className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition duration-200 shadow-lg"
                >
                    Mulai Kuis
                </button>
                <button
                    onClick={handleLogout}
                    className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition duration-200 shadow-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}