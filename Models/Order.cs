using System.ComponentModel.DataAnnotations.Schema;

namespace Kikis.Models;
public class Order
{
    public int Id { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    public int StatusId { get; set; }
    public Status Status { get; set; }
    public DateTime? OrderDate { get; set; }
    public List<MenuItemOrder> MenuItemOrders { get; set; }

    [NotMapped]
    public decimal Total 
        {
            get
            {
                return MenuItemOrders.Sum(item => item.MenuItem.Price * item.Quantity);
            }
        }

}