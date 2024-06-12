using Microsoft.AspNetCore.Mvc;
using Kikis.Models;
using Kikis.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private KikisDbContext _dbContext;

    public UserProfileController(KikisDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        UserProfile foundUser = _dbContext.UserProfiles
        .Include(up => up.Orders)
        .ThenInclude(s => s.Status)
        .Include(up => up.Orders)
        .ThenInclude(mi => mi.MenuItemOrders)
        .ThenInclude(mi => mi.MenuItem)
        .Include(id => id.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            PhoneNumber = up.PhoneNumber,
            Email = up.Email,
            IdentityUserId = up.IdentityUserId,
            Orders = up.Orders.Select(o => new Order
            {
                Id = o.Id,
                UserProfileId = o.UserProfileId,
                StatusId = o.StatusId,
                Status = new Status 
                {
                    Id = o.Status.Id,
                    Name = o.Status.Name
                },
                OrderDate = o.OrderDate,
                MenuItemOrders = o.MenuItemOrders.Select(mi => new MenuItemOrder
                {
                    OrderId = mi.OrderId,
                    MenuItemId = mi.MenuItemId,
                    MenuItem = new MenuItem
                    {
                        Id = mi.MenuItem.Id,
                        Name = mi.MenuItem.Name,
                        Description = mi.MenuItem.Description,
                        ImageLocation = mi.MenuItem.ImageLocation,
                        Price = mi.MenuItem.Price
                    },
                    Quantity = mi.Quantity
                }).ToList()
            }).Where(o => o.OrderDate == null).ToList()
        })
        .SingleOrDefault(up => up.Id == id);
        
        if(foundUser == null)
        {
            return NotFound();
        }

        return Ok(foundUser);
    }

  
}

