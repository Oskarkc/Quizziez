using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizziezAPI.Data;
using QuizziezAPI.DTO_s;
using QuizziezAPI.Exceptions;
using QuizziezAPI.Models;

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
            .Include(q => q.Category)
            .Include(q => q.Difficulty)
            .ToListAsync();
        return quizzez.Select(q => new QuizzezDto
        {
            Id = q.Id,
            Name = q.Name,
            Difficulty = q.Difficulty.Name,
            Category = q.Category.Name,
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

    public async Task CreateQuizAsync(CreateQuizDto body, CancellationToken cancellationToken)
    {
        if(body is null)
            throw new QuizValidationException("body is null");
        
        var difficulty = await _context.Difficulties.FirstOrDefaultAsync(e=> e.Name == body.Difficulty, cancellationToken);
        var category = await _context.Categories.FirstOrDefaultAsync(e => e.Name == body.Category, cancellationToken);
        
        if(difficulty is null)
            throw new QuizValidationException("difficulty is null");
        
        if(category is null)
            throw new QuizValidationException("category is null");
        
        var userId = _currentUserService.UserId;
        var quiz = new Quiz()
        {
            Name = body.Name,
            UserId = userId,
            DifficultyId = difficulty.Id,
            CategoryId = category.Id,
            Questions = body.Questions.Select(q => new Question()
            {
                QuestionText = q.Question,
                Answers = q.Answers.Select(a => new Answer()
                {
                    Text = a.Answer,
                    IsCorrectAnswer = a.IsCorrectAnswer,
                }).ToList()
            }).ToList()
        };
        _context.Quizzes.Add(quiz);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteQuizzezAsync(int id, CancellationToken cancellationToken)
    {
        var quiz = await _context.Quizzes.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
        if(quiz is null)
            throw new QuizValidationException("quiz is null");
        _context.Quizzes.Remove(quiz);
        await _context.SaveChangesAsync(cancellationToken);
    }
}