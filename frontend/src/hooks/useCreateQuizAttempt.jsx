import { useAuth } from "../auth/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createQuizAttempt } from "../api/QuizApi.js";
import { useGetQuizById } from "./useGetQuizById.jsx";

export const useCreateQuizAttempt = (quiz) => {
  const { api } = useAuth();
  const queryClient = useQueryClient();
  const [userAnswers, setUserAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  const handleAnswerSelect = (currentQuestionIndex, answerIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answerIndex,
    }));
  };

  const mutation = useMutation({
    mutationFn: (data) => createQuizAttempt(api, quiz.id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["quizAttempts"]);
      console.log(data);
    },
  });

  const onFinish = (quiz) => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] != undefined) {
        if (question.answers[userAnswers[index]].isCorrectAnswer) {
          correctCount++;
        }
      }
    });
    setCorrectCount(correctCount);
    mutation.mutate({
      QuizTitle: quiz.name,
      Score: Math.round((correctCount / quiz.questions.length) * 100),
    });
  };

  return { userAnswers, handleAnswerSelect, onFinish, correctCount };
};
