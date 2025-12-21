import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.jsx";
import { createQuiz } from "../api/QuizApi.js";
import { useState } from "react";

export const useCreateQuiz = (dialogVisible) => {
  const { api } = useAuth();
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correctAnswerIndex: null },
  ]);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: (quizData) => createQuiz(api, quizData),
    onSuccess: (data) => {
      console.log("Quiz został utworzony:", data);
      handleBack();
    },
    onError: (error) => {
      console.error(
        "Błąd przy tworzeniu quizu:",
        error.response?.data || error.message
      );
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (!quizTitle.trim()) newErrors.title = "Quiz title is required";
    if (!difficulty) newErrors.difficulty = "Select difficulty";
    if (!category) newErrors.category = "Select category";

    const hasEmptyQuestion = questions.some(q => !q.question.trim());
    if (hasEmptyQuestion) newErrors.emptyQuestion = "All questions must have text";

    const hasEmptyAnswer = questions.some(q => q.answers.some(a => !a.trim()));
    if (hasEmptyAnswer) newErrors.emptyAnswer = "All answers must be filled";

    const hasMissingCorrect = questions.some(q => q.correctAnswerIndex === null);
    if (hasMissingCorrect) newErrors.missingCorrect = "Mark correct answer for all questions";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSelectCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleBack = () => {
    setQuizTitle("");
    setDifficulty("");
    setCategory("");
    setQuestions([
      { question: "", answers: ["", "", "", ""], correctAnswerIndex: null },
    ]);
    dialogVisible(false);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: ["", "", "", ""], correctAnswerIndex: null },
    ]);
  };

  const handleQuestionChange = (questionIndex, value, answerIndex = null) => {
    const updatedQuestions = [...questions];
    if (answerIndex === null) {
      updatedQuestions[questionIndex].question = value;
    } else {
      updatedQuestions[questionIndex].answers[answerIndex] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleonSave = () => {
    setErrors({});
    if(!validateForm()){
      return;
    }
    const quizData = {
      name: quizTitle,
      category,
      difficulty,
      questions: questions.map((q) => ({
        question: q.question,
        answers: q.answers.map((answer, index) => ({
          answer: answer,
          isCorrect: index === q.correctAnswerIndex,
        })),
      })),
    };

    mutation.mutate(quizData);
  };

  return {
    handleSelectCorrectAnswer,
    questions,
    setQuestions,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    quizTitle,
    setQuizTitle,
    handleAddQuestion,
    handleQuestionChange,
    handleRemoveQuestion,
    handleonSave,
    handleBack,
    errors,
  };
};
