
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Kikis.Models;
using Microsoft.AspNetCore.Authorization;
namespace Kikis.Controllers;

[ApiController]
[Route("api/[controller]")]

public class OrderController : ControllerBase
{
    private KikisDbContext _dbContext;

    public OrderController(KikisDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]
    public IActionResult NewOrder(Order orderToCreate)
    {
        Order foundOrder = _dbContext.Orders.SingleOrDefault(o => o == orderToCreate);
        if(foundOrder == null)
        {
            orderToCreate.StatusId = 1;
            _dbContext.Add(orderToCreate);
            _dbContext.SaveChanges();
            return Created("/api/Order/${orderToCreate.id}", orderToCreate);
        }
        return BadRequest();
    }

    [HttpPut]
    [Authorize]
    public IActionResult PlaceOrder(Order orderToPlace)
    {
        Order foundOrder = _dbContext.Orders.SingleOrDefault(o => o == orderToPlace);

        foundOrder.StatusId = 2;
        foundOrder.OrderDate = DateTime.Now;
        _dbContext.SaveChanges();

        return Ok(foundOrder);
    }

  
}