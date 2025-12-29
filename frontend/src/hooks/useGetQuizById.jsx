import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider"
import { getQuizById } from "../api/QuizApi.js";

export const useGetQuizById = (quizId) => {
    const { api } = useAuth();
    return useQuery({
        queryKey: ['quizById', quizId],
        queryFn: () => getQuizById(api, quizId),
    });
};