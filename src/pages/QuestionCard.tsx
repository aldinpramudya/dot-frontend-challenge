interface QuestionProps {
    question: {
        question: string;
        correct: string;
        answers: string[];
    };
    questionNumber: number;
    total: number;
    onAnswer: (answer: string) => void;
}

export default function QuestionCard({
    question,
    questionNumber,
    total,
    onAnswer,
}: QuestionProps) {
    return (
        <>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] text-center">
                <h3 className="text-xl font-bold mb-2">
                    Question {questionNumber} / {total}
                </h3>
                <p
                    className="mb-6 text-gray-700 text-lg"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                />
                <div className="flex flex-col gap-3">
                    {question.answers.map((ans, i) => (
                        <button
                            key={i}
                            onClick={() => onAnswer(ans)}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                            dangerouslySetInnerHTML={{ __html: ans }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}