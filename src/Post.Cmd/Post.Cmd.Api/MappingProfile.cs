using AutoMapper;
using Post.Cmd.Api.Commands;
using Post.Cmd.Api.DTOs.Request;

namespace Post.Cmd.Api
{
    /// <summary>
    /// Contains mappings of DTOs to commands
    /// </summary>
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<NewPostDto, NewPostCommand>();
            CreateMap<EditPostDto, EditPostCommand>();
            CreateMap<DeletePostDto, DeletePostCommand>();
            CreateMap<AddCommentDto, AddCommentCommand>();
            CreateMap<EditCommentDto, EditCommentCommand>();
            CreateMap<RemoveCommentDto, RemoveCommentCommand>();
        }
    }
}
