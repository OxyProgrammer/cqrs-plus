using Post.Common.DTOs;
using Post.Query.Domain.Entities;

namespace Post.Query.Api.DTOs
{
    public class PostLookupResponse:BaseResponse
    {
        public IEnumerable<PostDto> Posts { get; set; }
    }
}
