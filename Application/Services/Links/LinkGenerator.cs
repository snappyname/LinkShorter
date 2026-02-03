namespace Application.Services.Links
{
    public static class LinkGenerator
    {
        static readonly string alphabet = "abcdefghijklmnopqrstuvwxyz";
        
        public static string GetNextLink(string value)
        {
            if (value == string.Empty)
            {
                return "aaaa";
            }
            
            var chars = value.ToCharArray();
            int baseN = alphabet.Length;

            for (int i = chars.Length - 1; i >= 0; i--)
            {
                int index = alphabet.IndexOf(chars[i]);
                
                if (index + 1 < baseN)
                {
                    chars[i] = alphabet[index + 1];
                    return new string(chars);
                }
                chars[i] = alphabet[0];
            }

            throw new InvalidOperationException("Достигнут максимальный предел");
        }
        
    }
}
