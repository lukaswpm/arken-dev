namespace ArkenERP.Lib.Domain.Entities.Tenancy
{
    public class TenantSettings
    {
        public bool AiEnabled { get; set; } = true;

        public int MaxStorageGB { get; set; } = 10;

        public string DefaultLanguage { get; set; } = "pt-BR";

        public string DefaultTimezone { get; set; }
            = "America/Sao_Paulo";

        // Espaço para configs futuras
        public Dictionary<string, object>? Extensions { get; set; }
            = new();
    }
}
