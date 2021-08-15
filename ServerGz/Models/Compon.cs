using System.Text.Json.Serialization;

namespace ServerGz.Models
{
    public class Compon
    {
        public int id { get; set; }
        public string cpu { get; set; }
        public string screen { get; set; }
        public string disk { get; set; }
        public string ram { get; set; }
        public string pin { get; set; }
        public string weight { get; set; }

        public string size {get;set;}
        public string image { get; set; }

        public int computerId { get; set; }

       [JsonIgnore]
        public Computer computer { get; set; }
    }
}