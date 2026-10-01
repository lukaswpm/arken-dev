using ArkenERP.Lib.Domain.Entities.Base;
using ArkenERP.Lib.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArkenERP.Lib.Domain.Entities.ERP
{
    public class Client: AuditableEntity
    {
        public string Name { get; private set; } = string.Empty;
        public string Surname { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public string Document { get; private set; } = string.Empty;
        public string Address { get; private set; } = string.Empty;
        public string City { get; private set; } = string.Empty;
        public string State { get; private set; } = string.Empty;
        public ClientStatus Status { get; private set; } = ClientStatus.Active;
    }
}
