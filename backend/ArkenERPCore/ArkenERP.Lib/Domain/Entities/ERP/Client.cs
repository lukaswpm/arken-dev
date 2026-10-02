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
        public string? AvatarUrl { get; private set; }
        public ClientStatus Status { get; private set; } = ClientStatus.Active;

        public static Client Create(
            string name,
            string surname,
            string email,
            string phone,
            string document,
            string address,
            string city,
            string state,
            ClientStatus status = ClientStatus.Active,
            string? avatarUrl = null)
        {
            return new Client
            {
                Name = name,
                Surname = surname,
                Email = email,
                Phone = phone,
                Document = document,
                Address = address,
                City = city,
                State = state,
                Status = status,
                AvatarUrl = avatarUrl
            };
        }

        public void Update(
            string name,
            string surname,
            string email,
            string phone,
            string document,
            string address,
            string city,
            string state,
            ClientStatus? status = null,
            string? avatarUrl = null)
        {
            Name = name;
            Surname = surname;
            Email = email;
            Phone = phone;
            Document = document;
            Address = address;
            City = city;
            State = state;
            if (status.HasValue)
                Status = status.Value;
            if (avatarUrl != null)
                AvatarUrl = avatarUrl;
        }

        public void ChangeStatus(ClientStatus status)
        {
            Status = status;
        }
    }
}
