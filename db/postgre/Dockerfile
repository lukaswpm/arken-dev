# Usando a versão 16, que é estável e moderna para 2026
FROM postgres:16

# Atualiza os pacotes e instala o mysql_fdw E o pgvector em uma única camada
RUN apt-get update && apt-get install -y \
    postgresql-16-mysql-fdw \
    postgresql-16-pgvector \
    && rm -rf /var/lib/apt/lists/*