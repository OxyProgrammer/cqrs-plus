using Post.Common.DTOs;

namespace Post.Cmd.Api.DTOs.Response
{
    public class NewPostResponseDto : BaseResponse
    {
        public Guid Id { get; set; }
    }
}
