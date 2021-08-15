using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System;
namespace ServerGz.Models
{
    public class Bill
    {

        public int id { get; set; }

        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }

        public double totalPrice { get; set; }
        public DateTime orderDate { get; set; }

        public string accountName { get; set; }

        [ForeignKey("accountName")]
        public Account account { get; set; }
        public BillStatus billStatus { get; set; }
        public ICollection<BillDetail> billDetail { get; set; }
    }
}
