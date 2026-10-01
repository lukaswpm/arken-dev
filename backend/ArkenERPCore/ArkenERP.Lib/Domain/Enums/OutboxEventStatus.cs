using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Enums
{
    public enum OutboxEventStatus
    {
        Pending = 1,
        Processing = 2,
        Processed = 3,
        Failed = 4
    }
}
