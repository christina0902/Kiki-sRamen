using Microsoft.AspNetCore.Mvc;
using Kikis.Models;
using Kikis.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

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

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.Include(up => up.Orders).ToList());
    }

    [HttpGet("withroles")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            PhoneNumber = up.PhoneNumber,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList(),

        }));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        UserProfile foundUser = _dbContext.UserProfiles
        .Include(up => up.Orders)
        .ThenInclude(s => s.Status)
        .Include(up => up.Orders)
        .ThenInclude(mi => mi.MenuItemOrders)
        .ThenInclude(mi => mi.MenuItem)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
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

