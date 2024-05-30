using AutoMapper;
using Post.Query.Api.DTOs;
using Post.Query.Domain.Entities;
namespace Post.Query.Api
{
    /// <summary>
    /// Contains mappings of DTOs to commands
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CommentEntity, CommentDto>();
            CreateMap<PostEntity, PostDto>();
        }
    }
}
