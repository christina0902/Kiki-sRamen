
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Kikis.Models;
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

    [HttpGet("{id}")]
    
    public IActionResult GetMenuById(int id)
    {
        MenuItem foundMenuItem = _dbContext.MenuItems.SingleOrDefault(mi => mi.Id == id);

        if(foundMenuItem == null)
        {
            return NotFound();
        }

        return Ok(foundMenuItem);
    }
}