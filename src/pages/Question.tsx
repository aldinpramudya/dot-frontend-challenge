"use client"

import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { useNavigate } from "react-router-dom";

const API_URL = "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"

export default function Question() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const backHome = () => {
        navigate('/');
    }

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.results.map((q) => ({
                    question: q.question,
                    correct: q.correct_answer,
                    answers: [...q.incorrect_answers, q.correct_answer],
                }));
                setQuestions(formatted);
                setLoading(false);
            })
    }, []);

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

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-black text-xl">Loading questions...</p>
            </div>
        )

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


    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <QuestionCard
                    question={questions[current]}
                    questionNumber={current + 1}
                    total={questions.length}
                    onAnswer={handleAnswer}
                />
            </div>
        </>
    )
}