using System.Text.Json.Serialization;
using System;
namespace ServerGz.Models
{
    public class BillStatus
    {
        public int id { get; set; }
        public DateTime shippingDate { get; set; }
        public DateTime received { get; set; }
        public string Status { get; set; }
    }
}
