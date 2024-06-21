
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Kikis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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
        if (foundOrder == null)
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
[HttpGet("{id}")]
[Authorize]
public IActionResult GetById(int id) 
{
    Order foundOrder = _dbContext.Orders
        .Include(o => o.MenuItemOrders)
        .ThenInclude(mio => mio.MenuItem)
        .SingleOrDefault(o => o.Id == id);

        if (foundOrder == null)
        {
            return NotFound(); 
        }

      return Ok(foundOrder);
}

    [HttpDelete("{id}")]
    // [Authorize]

    public IActionResult RemoveOrder(int id)
    {
        Order foundOrder = _dbContext.Orders.SingleOrDefault(o =>  o.Id == id);

        if (foundOrder == null)
        {
            return NotFound(); 
        }

        _dbContext.Orders.Remove(foundOrder);
        _dbContext.SaveChanges();
        return NoContent();
    }

}