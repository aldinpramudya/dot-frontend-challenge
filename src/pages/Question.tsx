"use client"

import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { useNavigate } from "react-router-dom";

const API_URL =  import.meta.env.VITE_API_URL

export default function Question() {

    const navigate = useNavigate();
    const backHome = () => {
        navigate('/home');
    }

    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch Data API
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.results.map((q: any) => ({
                    question: q.question,
                    correct: q.correct_answer,
                    answers: [...q.incorrect_answers, q.correct_answer],
                }));
                setQuestions(formatted);
                setLoading(false);
            })
    }, []);

    // Timer Countdown
    const [timer, setTimer] = useState(15);
    useEffect(() => {
        if (finished || loading) return;
        const timer = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Bersihkan interval saat komponen unmount
        return () => clearInterval(timer);
    }, [finished, loading]);

    // Handler Jawaban + Hitung benar salah
    const handleAnswer = (answer: string): void => {
        if (answer === questions[current].correct) {
            setScore((prev) => prev + 1);
            setCorrectAnswer((prev) => prev + 1);
        } else {
            setWrongAnswer((prev) => prev + 1);
        }

        const next = current + 1;
        if (next < questions.length) {
            setCurrent(next);
        } else {
            setFinished(true);
        }
    };

    // Loading Page
    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-black text-xl">Loading questions...</p>
            </div>
        )

    // Halaman Selesai
    if (finished) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] text-center">
                    <h2 className="text-2xl font-semibold mb-4">Quiz Finished 🎉</h2>
                    <p className="text-lg">
                        Your score: {score} / {questions.length}
                    </p>
                    <p className="text-lg">
                        Correct Answer: {correctAnswer}
                    </p>
                    <p className="text-lg">
                        Wrong Answer: {wrongAnswer}
                    </p>
                    <div className="space-x-3">
                        <button
                            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            onClick={() => window.location.reload()}
                        >
                            Play Again
                        </button>
                        <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" onClick={backHome}>
                            Back Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Card Pertanyaan
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="pb-10 font-bold text-lg">
                    {timer}
                </div>
                <QuestionCard
                    question={questions[current]}
                    questionNumber={current + 1}
                    total={questions.length}
                    onAnswer={handleAnswer}
                />
            </div >
        </>
    )
}