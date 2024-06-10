
using Microsoft.AspNetCore.Mvc;
using Kikis.Data;
using Kikis.Models;
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
  
}