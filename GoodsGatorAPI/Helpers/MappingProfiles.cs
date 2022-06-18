using AutoMapper;
using GoodsGatorAPI.Models.DbEntities;
using GoodsGatorAPI.Models.DTOs;

namespace GoodsGatorAPI.Helpers;

public class MappingProfiles: Profile
{
    public MappingProfiles()
    {
        CreateMap<Product, ProductDTO>()
            .ForMember(des => des.Brand, op => op.MapFrom(src => src.Brand.Name))
            .ForMember(des => des.Category, op => op.MapFrom(src => src.Category.Name))
            .ForMember(des => des.ImageUrl, op => op.MapFrom<ProductUrlResolver>());
    }
}
