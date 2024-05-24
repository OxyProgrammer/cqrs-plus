﻿using System.Text.Json;

namespace Post.Common.DTOs
{
    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public override string ToString() => JsonSerializer.Serialize(this);
    }
}
