using System.ComponentModel.DataAnnotations;

namespace Kikis.Models.DTOs;
public class StatusDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}