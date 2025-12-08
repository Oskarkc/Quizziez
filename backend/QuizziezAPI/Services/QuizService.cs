using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizziezAPI.Data;
using QuizziezAPI.DTO_s;

namespace QuizziezAPI.Services;

public class QuizService : IQuizService
{
      private readonly AppDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public QuizService(AppDbContext context , ICurrentUserService currentUserService)
      {
          _context = context;
          _currentUserService = currentUserService;
      }
      
    public async Task<IEnumerable<QuizzezDto>> GetQuizzesAsync()
    {
       
        var userId = _currentUserService.UserId; 
        var quizzez = await _context.Quizzes
            .Where(q => q.UserId == userId)
            .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
            .ToListAsync();
        return quizzez.Select(q => new QuizzezDto
        {
            Id = q.Id,
            Name = q.Name,
            Questions = q.Questions.Select(qq => new QuestionDto
            {
                Id = qq.Id,
                Question = qq.QuestionText,
                Answers = qq.Answers.Select(a => new AnswerDto
                {
                    Id = a.Id,
                    Answer = a.Text,
                    IsCorrectAnswer = a.IsCorrectAnswer,
                }).ToList()
            }).ToList()
        });
    }
}