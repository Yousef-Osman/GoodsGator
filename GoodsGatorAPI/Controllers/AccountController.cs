using AutoMapper;
using GoodsGatorAPI.Extensions;
using GoodsGatorAPI.Helpers.Errors;
using GoodsGatorAPI.Models.DTOs;
using GoodsGatorAPI.Models.IdentityEntities;
using GoodsGatorAPI.Services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager, 
                             SignInManager<AppUser> signInManager,
                             ITokenService tokenService,
                             IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login (LoginDTO loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized(new ApiResponse(401));

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return Ok(GetUserDto(user));
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO registerDto)
    {
        var user = new AppUser
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user);

        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return Ok(GetUserDto(user));
    }

    [Authorize]
    [HttpGet("CurrentUser")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var user = await _userManager.FindUserAsync(User);
        return Ok(GetUserDto(user));
    }

    [Authorize]
    [HttpGet("Address")]
    public async Task<IActionResult> GetUserAddress()
    {
        var user = await _userManager.FindUserWithAddressAsync(User);
        return Ok(_mapper.Map<Address, AddressDTO>(user.Address));
    }

    [Authorize]
    [HttpPost("UpdateAddress")]
    public async Task<IActionResult> UpdateAddress(AddressDTO addressDto)
    {
        var address = _mapper.Map<AddressDTO, Address>(addressDto);

        var user = await _userManager.FindUserWithAddressAsync(User);
        user.Address = address;
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return Ok(GetUserDto(user));
    }

    [HttpGet("CheckEmail")]
    public async Task<IActionResult> CheckEmailExists([FromQuery] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return Ok(user != null);
    }

    private UserDTO GetUserDto(AppUser user)
    {
        return new UserDTO
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Token = _tokenService.createToken(user)
        };
    }
}
