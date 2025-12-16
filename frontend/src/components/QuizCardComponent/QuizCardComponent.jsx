import "./QuizCardComponent.css";
export default function QuizCardComponent({ quiz }) {
    return (
        <div className="quizcardcomponent">
            <h2>{quiz.name}</h2>
            <p>Category: {quiz.category}</p>
            <p>Difficulty: {quiz.difficulty}</p>
        </div>
    );
}