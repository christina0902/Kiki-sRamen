using System.ComponentModel.DataAnnotations;

namespace Kikis.Models.DTOs;
public class MenuItemDTO
{
 public int Id { get; set; }

 [Required]
 [MaxLength(50)]
 public string Name { get; set; }

 public decimal Price { get; set; }

 [Required]
 public string ImageLocation { get; set; }
 
 [Required]
 public string Description { get; set; }
 
}