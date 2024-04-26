namespace CQRS.Core.Exceptions
{
    [Serializable]
    public class ConcurrencyExcpetion : Exception
    {
        public ConcurrencyExcpetion()
        {
        }

        public ConcurrencyExcpetion(string message) : base(message)
        {
        }

        public ConcurrencyExcpetion(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
