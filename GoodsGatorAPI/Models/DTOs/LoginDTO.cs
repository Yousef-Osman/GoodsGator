﻿using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DTOs;

public class LoginDTO
{
    [Required, EmailAddress]
    public string Email { get; set; }
    [Required, DataType(DataType.Password)]
    public string Password { get; set; }
}
