import { useAuth } from "../auth/AuthProvider"
import { getAllQuizzes } from "../api/QuizApi.js";
import { useQuery } from "@tanstack/react-query";

export const useGetAllQuizzes = () => {
  const {api} = useAuth();
   return useQuery(
        {
            queryKey: ['allQuizzes'],
            queryFn: () => getAllQuizzes(api),
        }
    );
}
  