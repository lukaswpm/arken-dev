using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Enums
{
    public enum SubscriptionStatus
    {
        Trialing = 1,
        Active = 2,
        PastDue = 3,
        Canceled = 4,
        Suspended = 5,
        Expired = 6
    }
}
