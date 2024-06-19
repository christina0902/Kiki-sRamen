
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Kikis.Models;
namespace Kikis.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoryController : ControllerBase
{
    private KikisDbContext _dbContext;

    public CategoryController(KikisDbContext context)
    {
        _dbContext = context;
    }

   [HttpGet]
   public IActionResult GetCategories()
   {
        return Ok(_dbContext.Categories.ToList());
   }
}