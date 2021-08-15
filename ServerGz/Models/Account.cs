using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ServerGz.Models
{
    public class Account
    {
        [Key]
        public string name {get;set;}

        public string role {get;set;}
        public string password {get;set;}

        public string nameReceiver {get;set;}
        public string phone {get;set;}
        public string address {get;set;}
    }


}