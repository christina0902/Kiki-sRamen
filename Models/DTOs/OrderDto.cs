using System.ComponentModel.DataAnnotations.Schema;

namespace Kikis.Models.DTOs;

public class OrderDTO
{
    public int Id { get; set; }
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    public int StatusId { get; set; }
    public StatusDTO Status { get; set; }
    public DateTime? OrderDate { get; set; }
    public List<MenuItemOrderDTO> MenuItemOrders { get; set; }

    [NotMapped]
    public decimal Total 
        {
            get
            {
                return MenuItemOrders.Sum(item => item.MenuItem.Price * item.Quantity);
            }
        }

}