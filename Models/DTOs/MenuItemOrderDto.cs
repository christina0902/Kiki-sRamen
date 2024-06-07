namespace Kikis.Models.DTOs;
public class MenuItemOrderDTO
{
    public int OrderId { get; set; }
    public OrderDTO Order { get; set; }
    public int MenuItemId { get; set; }
    public MenuItemDTO MenuItem { get; set; }
    public int Quantity { get; set; }
}