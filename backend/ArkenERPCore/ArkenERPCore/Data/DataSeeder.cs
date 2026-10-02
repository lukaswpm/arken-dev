using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Entities.ERP;
using ArkenERP.Lib.Domain.Entities.Identity;
using ArkenERP.Lib.Domain.Entities.Tenancy;
using ArkenERP.Lib.Domain.Enums;
using ArkenERP.Lib.Domain.Runtime.AI;
using Microsoft.EntityFrameworkCore;

namespace ArkenERP.Core.Data
{
    public static class DataSeeder
    {
        public static readonly Guid DefaultTenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        public static readonly Guid DefaultUserId = Guid.Parse("22222222-2222-2222-2222-222222222222");

        public static async Task SeedAsync(ManagerDbContext managerDb, RuntimeDbContext runtimeDb)
        {
            // =========================================================================
            // 1. SEED NO MYSQL (ManagerDbContext)
            // =========================================================================
            var tenantExists = await managerDb.Tenants.AnyAsync(t => t.Id == DefaultTenantId);
            if (!tenantExists)
            {
                var tenant = Tenant.Create("Arken Demo Store", "loja-modelo");
                tenant.SetId(DefaultTenantId);
                tenant.Activate();
                await managerDb.Tenants.AddAsync(tenant);

                var user = User.Create(
                    email: "lucas@arken.io",
                    username: "lucas.santos",
                    passwordHash: "admin123",
                    firstName: "Lucas",
                    lastName: "Santos",
                    avatarUrl: "/images/lucas_avatar.jpg"
                );
                user.SetId(DefaultUserId);
                await managerDb.Users.AddAsync(user);

                var adminUser = User.Create(
                    email: "admin@arken.com",
                    username: "admin",
                    passwordHash: "admin123",
                    firstName: "Administrador",
                    lastName: "Sistema",
                    avatarUrl: "/images/lucas_avatar.jpg"
                );
                await managerDb.Users.AddAsync(adminUser);

                var roleId = Guid.Parse("33333333-3333-3333-3333-333333333333");
                var adminRole = Role.Create("Admin", DefaultTenantId, isSystem: true);
                adminRole.SetId(roleId);
                await managerDb.Roles.AddAsync(adminRole);

                var tenantUser = TenantUser.Create(DefaultTenantId, DefaultUserId, roleId);
                await managerDb.TenantUsers.AddAsync(tenantUser);

                var adminTenantUser = TenantUser.Create(DefaultTenantId, adminUser.Id, roleId);
                await managerDb.TenantUsers.AddAsync(adminTenantUser);

                await managerDb.SaveChangesAsync();
            }

            // =========================================================================
            // 2. SEED NO POSTGRESQL (RuntimeDbContext)
            // =========================================================================
            var hasCategories = await runtimeDb.ProductCategories.AnyAsync();
            if (!hasCategories)
            {
                var catEletronicos = ProductCategory.Create("Eletrônicos", "Aparelhos e eletrônicos de consumo");
                var catCelulares = ProductCategory.Create("Celulares", "Smartphones e acessórios móveis");
                var catRoupas = ProductCategory.Create("Roupas", "Vestuário geral");
                var catAudio = ProductCategory.Create("Áudio", "Fones e caixas de som");
                var catEletro = ProductCategory.Create("Eletrodomésticos", "Equipamentos para casa");
                var catPerifericos = ProductCategory.Create("Periféricos", "Mouses, teclados e webcams");
                var catMonitores = ProductCategory.Create("Monitores", "Telas e displays");
                var catArmazenamento = ProductCategory.Create("Armazenamento", "SSDs e cartões de memória");

                await runtimeDb.ProductCategories.AddRangeAsync(
                    catEletronicos, catCelulares, catRoupas, catAudio,
                    catEletro, catPerifericos, catMonitores, catArmazenamento
                );
                await runtimeDb.SaveChangesAsync();

                // Produtos
                var products = new List<Product>
                {
                    Product.Create("Notebook Dell Inspiron 15", "Intel i5, 8GB, 256GB SSD", "NT001", 2500.00m, catEletronicos.Id, 45, brand: "Dell", model: "Inspiron 15", imageUrl: "/images/notebook.jpg", status: ProductStatus.Active, sku: "NT001-DELL"),
                    Product.Create("Smartphone Galaxy A54", "128GB, 6GB RAM", "CEL002", 1520.00m, catCelulares.Id, 38, brand: "Samsung", model: "Galaxy A54", imageUrl: "/images/smartphone.jpg", status: ProductStatus.Active, sku: "CEL002-SAMS"),
                    Product.Create("Camiseta Premium", "Algodão, várias cores", "RPS003", 89.90m, catRoupas.Id, 62, brand: "Arken Wear", model: "Premium", imageUrl: "/images/tshirt.jpg", status: ProductStatus.Active, sku: "RPS003-TSHIRT"),
                    Product.Create("Fone Bluetooth", "Alta qualidade de som", "FON004", 120.00m, catAudio.Id, 12, brand: "SoundPro", model: "BT-100", imageUrl: "/images/headphones.jpg", status: ProductStatus.Active, sku: "FON004-SOUND"),
                    Product.Create("Cafeteira Elétrica", "12 xícaras, 110V/220V", "CAF005", 279.90m, catEletro.Id, 5, brand: "HomeBrew", model: "12C", imageUrl: "/images/coffeemaker.jpg", status: ProductStatus.Active, sku: "CAF005-COFFEE"),
                    Product.Create("Mouse Sem Fio", "Ergonômico, 2.4GHz", "MOU006", 79.90m, catPerifericos.Id, 0, brand: "TechGrip", model: "WL-01", imageUrl: "/images/mouse.jpg", status: ProductStatus.Inactive, sku: "MOU006-MOUSE"),
                    Product.Create("Teclado Mecânico", "Switch Blue, RGB", "TEC007", 349.90m, catPerifericos.Id, 18, brand: "KeyMaster", model: "Mech-RGB", imageUrl: "/images/keyboard.jpg", status: ProductStatus.Active, sku: "TEC007-KEYB"),
                    Product.Create("Monitor 24\" Full HD", "IPS, 75Hz", "MON008", 899.90m, catMonitores.Id, 22, brand: "VisionMax", model: "24FHD", imageUrl: "/images/monitor.jpg", status: ProductStatus.Active, sku: "MON008-MON"),
                    Product.Create("SSD 1TB", "Leitura 550MB/s", "SSD009", 449.90m, catArmazenamento.Id, 9, brand: "FastDrive", model: "1TB-SATA", imageUrl: "/images/ssd.jpg", status: ProductStatus.Active, sku: "SSD009-SSD"),
                    Product.Create("Webcam Full HD", "1080p, USB", "WEB010", 199.90m, catPerifericos.Id, 14, brand: "ClearCam", model: "1080P", imageUrl: "/images/webcam.jpg", status: ProductStatus.Active, sku: "WEB010-CAM")
                };

                await runtimeDb.Products.AddRangeAsync(products);
                await runtimeDb.SaveChangesAsync();
            }

            // Clientes
            var hasClients = await runtimeDb.Clients.AnyAsync();
            if (!hasClients)
            {
                var cli1 = Client.Create("Maria Oliveira ME", "Oliveira", "maria@oliveira.com", "(27) 99999-9999", "12.345.678/0001-90", "Rua das Flores, 100", "Vitória", "ES");
                var cli2 = Client.Create("Tech Solutions Ltda", "Solutions", "contato@tech.com", "(27) 98888-1122", "98.765.432/0001-10", "Av. Central, 500", "Vila Velha", "ES");
                var cli3 = Client.Create("Construtora Alfa", "Alfa", "comercial@alfa.com", "(27) 97777-3344", "11.222.333/0001-44", "Rua Projetada, 12", "Serra", "ES");
                var cli4 = Client.Create("Supermercado Bom Preço", "Bom Preço", "compras@bompreco.com", "(27) 96666-5566", "22.333.444/0001-55", "Av. Brasil, 1200", "Cariacica", "ES");
                var cli5 = Client.Create("Almeida & Cia", "Almeida", "vendas@almeida.com", "(27) 95555-7788", "33.444.555/0001-66", "Rodovia 262, km 5", "Viana", "ES");
                var cli6 = Client.Create("João", "Ferreira", "joao@email.com", "(27) 94444-9900", "123.456.789-00", "Rua da Praia, 45", "Vila Velha", "ES", ClientStatus.Active, "/images/joao.jpg");
                var cli7 = Client.Create("Fernanda", "Costa", "fernanda@costa.com", "(19) 99876-5432", "234.567.890-11", "Rua Barão de Jundiaí, 320", "Campinas", "SP", ClientStatus.Active, "/images/fernanda.jpg");
                var cli8 = Client.Create("Distribuidora Santos", "Santos", "contato@santosdistribuidora.com", "(13) 3456-7890", "45.678.901/0001-22", "Av. Ana Costa, 80", "Santos", "SP", ClientStatus.Active, "/images/santos.jpg");
                var cli9 = Client.Create("Ana Paula", "Lima", "ana.lima@email.com", "(16) 98123-4567", "345.678.901-22", "Rua Tibiriçá, 750", "Ribeirão Preto", "SP", ClientStatus.Inactive, "/images/ana.jpg");

                await runtimeDb.Clients.AddRangeAsync(cli1, cli2, cli3, cli4, cli5, cli6, cli7, cli8, cli9);
                await runtimeDb.SaveChangesAsync();

                // Pedidos e Vendas
                var now = DateTime.UtcNow;
                var ord1 = Orders.Create(cli1.Id, 1250.00m, "Concluído", now.AddDays(-2), "#000128", 3);
                var ord2 = Orders.Create(cli3.Id, 980.00m, "Concluído", now.AddDays(-5), "#000127", 5);
                var ord3 = Orders.Create(cli4.Id, 2340.50m, "Em andamento", now.AddDays(-10), "#000126", 2);
                var ord4 = Orders.Create(cli2.Id, 3480.00m, "Concluído", now.AddDays(-15), "#000125", 4);
                var ord5 = Orders.Create(cli5.Id, 760.00m, "Pendente", now.AddDays(-20), "#000124", 1);
                var ord6 = Orders.Create(cli6.Id, 3210.90m, "Concluído", now.AddDays(-25), "#000123", 2);
                var ord7 = Orders.Create(cli7.Id, 4120.00m, "Concluído", now.AddDays(-28), "#000122", 6);

                await runtimeDb.Orders.AddRangeAsync(ord1, ord2, ord3, ord4, ord5, ord6, ord7);
                await runtimeDb.SaveChangesAsync();
            }
            else
            {
                // Sincroniza AvatarUrl no banco para clientes já existentes no banco que estejam com coluna nula
                var existingClients = await runtimeDb.Clients.Where(c => c.AvatarUrl == null).ToListAsync();
                if (existingClients.Count > 0)
                {
                    foreach (var c in existingClients)
                    {
                        var seedAvatar = c.Name.Equals("João", StringComparison.OrdinalIgnoreCase) ? "/images/joao.jpg" :
                                         c.Name.Equals("Fernanda", StringComparison.OrdinalIgnoreCase) ? "/images/fernanda.jpg" :
                                         c.Name.Contains("Santos", StringComparison.OrdinalIgnoreCase) ? "/images/santos.jpg" :
                                         c.Name.Contains("Ana", StringComparison.OrdinalIgnoreCase) ? "/images/ana.jpg" : null;
                        if (seedAvatar != null)
                        {
                            c.Update(c.Name, c.Surname, c.Email, c.Phone, c.Document, c.Address, c.City, c.State, c.Status, seedAvatar);
                        }
                    }
                    await runtimeDb.SaveChangesAsync();
                }
            }

            // Insights de IA
            var hasInsights = await runtimeDb.BusinessInsights.AnyAsync();
            if (!hasInsights)
            {
                var insight1 = BusinessInsight.Create(
                    DefaultTenantId,
                    InsightType.Bottleneck,
                    "Estoque Crítico: Cafeteira Elétrica",
                    "Restam apenas 5 unidades em estoque da Cafeteira Elétrica. O ritmo de saída indica esgotamento em 4 dias.",
                    InsightPriority.High
                );

                var insight2 = BusinessInsight.Create(
                    DefaultTenantId,
                    InsightType.Opportunity,
                    "Oportunidade de Preço: SSD 1TB",
                    "Aumento de 28% na demanda detectado. Reajuste de 4% no preço unitário maximiza a receita sem perda de conversão.",
                    InsightPriority.Medium
                );

                var insight3 = BusinessInsight.Create(
                    DefaultTenantId,
                    InsightType.FunnelSuggestion,
                    "Atenção a Clientes Inativos",
                    "O cliente Ana Paula Lima não realiza pedidos há mais de 60 dias. Recomendado contato com oferta personalizada.",
                    InsightPriority.Low
                );

                await runtimeDb.BusinessInsights.AddRangeAsync(insight1, insight2, insight3);
                await runtimeDb.SaveChangesAsync();
            }
        }
    }
}
