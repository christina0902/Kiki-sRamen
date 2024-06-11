
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Kikis.Models;
using Microsoft.AspNetCore.Authorization;
namespace Kikis.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MenuItemOrderController : ControllerBase
{
    private KikisDbContext _dbContext;

    public MenuItemOrderController(KikisDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]

    public IActionResult NewMenuItemOrder(MenuItemOrder menuItemOrderToCreate)
    {
        MenuItemOrder foundOrder = _dbContext.MenuItemOrders.SingleOrDefault(o => o == menuItemOrderToCreate);

        if (foundOrder == null)
        {
            menuItemOrderToCreate.Quantity = 1;
            _dbContext.MenuItemOrders.Add(menuItemOrderToCreate);
            _dbContext.SaveChanges();
            return Ok(menuItemOrderToCreate);
        }
        _dbContext.MenuItemOrders.Remove(foundOrder);
        MenuItemOrder menuItemOrderToAdd = new MenuItemOrder
        {
            MenuItemId = foundOrder.MenuItemId,
            OrderId = foundOrder.OrderId,
            Quantity = foundOrder.Quantity + 1
        };
        _dbContext.MenuItemOrders.Add(menuItemOrderToAdd);
        _dbContext.SaveChanges();
        return Ok(menuItemOrderToAdd);
    }

    [HttpDelete()]
    // [Authorize]

    public IActionResult RemoveMenuItemOrder(MenuItemOrder menuItemOrder)    
    {
        MenuItemOrder menuItemToDelete = _dbContext.MenuItemOrders.SingleOrDefault(mi => mi == menuItemOrder);
        _dbContext.MenuItemOrders.Remove(menuItemToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    }
  
}