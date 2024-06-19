using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Kikis.Models;
using Microsoft.AspNetCore.Identity;
using System.Reflection;

namespace Kikis.Data;
public class KikisDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<MenuItemOrder> MenuItemOrders { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Category> Categories { get; set; }

    public KikisDbContext(DbContextOptions<KikisDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MenuItemOrder>().HasKey(mo => new {mo.OrderId, mo.MenuItemId});

          modelBuilder.Entity<MenuItemOrder>()
            .HasOne(mo => mo.Order)
            .WithMany(o => o.MenuItemOrders)
            .HasForeignKey(mi => mi.OrderId);
            modelBuilder.Entity<MenuItemOrder>()
            .HasOne(mo => mo.MenuItem)
            .WithMany(mi => mi.MenuItemOrders)
            .HasForeignKey(pt => pt.MenuItemId);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "christinam1215",
            Email = "christinam1215@yahoo.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Christina",
            LastName = "Morales",
            PhoneNumber = "615-604-0339",
        });
        modelBuilder.Entity<Status>().HasData(new Status[]
        {
            new Status
            {
                Id = 1,
                Name = "Pending"
            },
            new Status
            {
                Id = 2,
                Name = "Placed"
            },
            new Status
            {
                Id = 3,
                Name = "In Progress"
            },
            new Status
            {
                Id = 4,
                Name = "Complete"
            }
        });
        modelBuilder.Entity<Order>().HasData(new Order[]
        {
            new Order
            {
                Id = 1,
                UserProfileId = 1,
                StatusId = 2,
                OrderDate = DateTime.Now
            }
        });
        modelBuilder.Entity<MenuItemOrder>().HasData(new MenuItemOrder[]
        {
            new MenuItemOrder
            {
                OrderId = 1,
                MenuItemId = 1,
                Quantity = 1
            },
            new MenuItemOrder
            {
                OrderId = 1,
                MenuItemId = 2,
                Quantity = 1
            }
        });
        modelBuilder.Entity<MenuItem>().HasData(new MenuItem[]
        {
            new MenuItem
            {
                Id = 1,
                Name = "Tonkotsu Ramen",
                Price = 15.5M,
                ImageLocation = "/Uploads/Ramen.png",
                Description = "Roasted pork belly, fish cake, ramen egg, black fungus, bamboo, green onion, seaweed, black garlic oil, in creamy pork bone broth",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 2,
                Name = "Tori Ramen",
                Price = 15M,
                ImageLocation = "/Uploads/Ramen copy.png",
                Description = "Sous vide (slow-cooked) chicken chashu, ramen egg, corn, sesame seeds, green onion,  seaweed, in creamy chicken soup base",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 3,
                Name = "Shoyu Ramen",
                Price = 15M,
                ImageLocation = "/Uploads/ramen (5).png",
                Description = "Roasted pork belly, fish cake, ramen egg, bamboo shoots, corn, green onion, seaweed, black garlic oil, in soy sauce soup base",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 4,
                Name = "Tempura Shrimp",
                Price = 8M,
                ImageLocation = "/Uploads/Tempura.png",
                Description = "Japanese style deep fried shrimp",
                CategoryId = 1
            },
            new MenuItem
            {
                Id = 5,
                Name = "Takoyaki",
                Price = 8M,
                ImageLocation = "/Uploads/Takoyaki.png",
                Description = "Minced octopus batter fried, top with bonito, served with Japanese mayo & Takoyaki sauce",
                CategoryId = 1
            },
            new MenuItem
            {
                Id = 6,
                Name = "Gyoza",
                Price = 7M,
                ImageLocation = "/Uploads/Gyoza.png",
                Description = "Pan fried chicken pot stickers",
                CategoryId = 1
            },
            new MenuItem
            {
                Id = 7,
                Name = "Seafood Ramen",
                Price = 16M,
                ImageLocation = "/Uploads/Template5.png",
                Description = "Shrimp, muscle, squid, crabmeat, fish cake, green onion, corn, seaweed, black garlic oil, in pork bone broth",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 8,
                Name = "Spicy Miso Ramen",
                Price = 15M,
                ImageLocation = "/Uploads/Template7.png",
                Description = "Roasted pork belly, ramen egg, corn, bean sprout, green onion, seaweed, in creamy miso soup base",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 9,
                Name = "Vegetable Ramen",
                Price = 13M,
                ImageLocation = "/Uploads/Template1.png",
                Description = "Bamboo shoots, black fungus, bean sprouts, corn, green onion, seaweed, black garlic oil, in creamy vegetable soup base",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 10,
                Name = "Cheese Ramen",
                Price = 16M,
                ImageLocation = "/Uploads/Template8.png",
                Description = "Fish cake, ramen egg, corn, seaweed, top w. melting American cheese, black garlic oil, in creamy pork bone broth",
                CategoryId = 2
            },
            new MenuItem
            {
                Id = 11,
                Name = "Spicy Miso Ramen",
                Price = 16.95M,
                ImageLocation = "/Uploads/Template4.png",
                Description = "Ramen noodle with spicy miso topped with char siu, egg, green onion, and sesame seeds.",
                CategoryId = 2
            }
        });

         modelBuilder.Entity<Category>().HasData(new Category[]
        {
            new Category
            {
                Id = 1,
                Name = "Appetizers"
            },
            new Category
            {
                Id = 2,
                Name = "Ramen"
            },
            new Category
            {
                Id = 3,
                Name = "Desserts"
            }
        });

    }
}