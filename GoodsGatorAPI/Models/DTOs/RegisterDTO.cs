﻿using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DTOs;

public class RegisterDTO
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}