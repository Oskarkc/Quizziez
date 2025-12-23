import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.jsx";
import { editUserQuiz } from "../api/QuizApi.js";
import { useState } from "react";

export const useEditQuiz = (dialogVisible, existingQuiz) => {
  const { api } = useAuth();
  const queryClient = useQueryClient();

  const [quizTitle, setQuizTitle] = useState(existingQuiz ? existingQuiz.name : "");
  const [difficulty, setDifficulty] = useState(existingQuiz ? existingQuiz.difficulty : "");
  const [category, setCategory] = useState(existingQuiz ? existingQuiz.category : "");

  const [questions, setQuestions] = useState(() => {
    if (!existingQuiz || !existingQuiz.questions) return [];
    
    return existingQuiz.questions.map((q) => ({
      id: q.id,
      question: q.question || "",
      answers: q.answers.map((a) => ({
        id: a.id,
        text: a.answer || "", 
      })),
      correctAnswerIndex: q.answers.findIndex((a) => a.isCorrectAnswer === true),
    }));
  });

  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: (quizData) => editUserQuiz(api, existingQuiz.id, quizData),
    onSuccess: (data) => {
      console.log("Quiz został zmodyfikowany:", data);
      queryClient.invalidateQueries(["userQuizzes"]);
      handleBack();
    },
    onError: (error) => {
      console.error(
        "Błąd przy modyfikowaniu quizu:",
        error.response?.data || error.message
      );
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (!quizTitle.trim()) newErrors.title = "Quiz title is required";
    if (!difficulty) newErrors.difficulty = "Select difficulty";
    if (!category) newErrors.category = "Select category";

    const hasEmptyQuestion = questions.some((q) => !(q.question || "").trim());
    if (hasEmptyQuestion) newErrors.emptyQuestion = "All questions must have text";

    const hasEmptyAnswer = questions.some((q) =>
      q.answers.some((a) => !(a.text || "").trim())
    );
    if (hasEmptyAnswer) newErrors.emptyAnswer = "All answers must be filled";

    const hasMissingCorrect = questions.some(
      (q) => q.correctAnswerIndex === null || q.correctAnswerIndex === -1
    );
    if (hasMissingCorrect)
      newErrors.missingCorrect = "Mark correct answer for all questions";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSelectCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleBack = () => {
        dialogVisible(false);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { 
        id: 0,
        question: "", 
        answers: [
            { id: 0, text: "" }, 
            { id: 0, text: "" }, 
            { id: 0, text: "" }, 
            { id: 0, text: "" }
        ], 
        correctAnswerIndex: null 
      },
    ]);
  };

  const handleQuestionChange = (questionIndex, value, answerIndex = null) => {
    const updatedQuestions = [...questions];
    
    const currentQ = { ...updatedQuestions[questionIndex] };

    if (answerIndex === null) {
      currentQ.question = value;
    } else {
      const currentAnswers = [...currentQ.answers];
      currentAnswers[answerIndex] = { 
          ...currentAnswers[answerIndex], 
          text: value 
      };
      currentQ.answers = currentAnswers;
    }

    updatedQuestions[questionIndex] = currentQ;
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleonSave = () => {
    setErrors({});
    if (!validateForm()) {
      return;
    }

    const quizData = {
      Id: existingQuiz.id,    
      Name: quizTitle,        
      Category: category,
      Difficulty: difficulty,
      Questions: questions.map((q) => ({
        Id: q.id,
        Question: q.question,
        Answers: q.answers.map((answer, index) => ({
          Id: answer.id,
          Answer: answer.text, 
          IsCorrectAnswer: index === q.correctAnswerIndex,
        })),
      })),
    };

    console.log("Wysyłanie danych edycji:", quizData);
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