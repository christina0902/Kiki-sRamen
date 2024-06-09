
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Microsoft.AspNetCore.Authorization;
namespace Kikis.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MenuController : ControllerBase
{
    private KikisDbContext _dbContext;

    public MenuController(KikisDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    
    public IActionResult GetMenu()
    {
        return Ok(_dbContext.MenuItems.OrderBy(mu => mu.Name));
    }
}