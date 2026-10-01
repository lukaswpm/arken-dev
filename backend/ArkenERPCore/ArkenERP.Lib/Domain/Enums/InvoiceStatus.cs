using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Enums
{
    public enum InvoiceStatus
    {
        Draft = 1,
        Open = 2,
        Paid = 3,
        Void = 4,
        Uncollectible = 5
    }
}
