---
sidebar_position: 1
---

# Network Setup

Panduan konfigurasi Network connections di DSP Platform.

## Overview

Network di DSP adalah konfigurasi koneksi ke berbagai sumber data:

| Type | Sources |
|------|---------|
| **Database** | PostgreSQL, MySQL, SQL Server, Oracle |
| **NoSQL** | MongoDB, Redis |
| **Object Storage** | MinIO |
| **File** | FTP, SFTP |
| **API** | REST endpoints |

## Creating a Connection

### Via Web Console

1. Navigate ke **Network** di sidebar
2. Klik **Add Network**
3. Pilih source type
4. Isi form konfigurasi
5. Klik **Test Connection** untuk validasi
6. Klik **Save**

## Connection Types

### PostgreSQL

```json
{
  "name": "Production PostgreSQL",
  "source_type": "postgresql",
  "source_config": {
    "host": "db.example.com",
    "port": 5432,
    "database": "mydb",
    "username": "user",
    "password": "password",
    "ssl_mode": "require"
  }
}
```

### MySQL

```json
{
  "name": "Production MySQL",
  "source_type": "mysql",
  "source_config": {
    "host": "mysql.example.com",
    "port": 3306,
    "database": "mydb",
    "username": "user",
    "password": "password"
  }
}
```

### SQL Server

```json
{
  "name": "Production SQL Server",
  "source_type": "sqlserver",
  "source_config": {
    "host": "sqlserver.example.com",
    "port": 1433,
    "database": "mydb",
    "username": "sa",
    "password": "password"
  }
}
```

### Oracle

```json
{
  "name": "Production Oracle",
  "source_type": "oracle",
  "source_config": {
    "host": "oracle.example.com",
    "port": 1521,
    "service_name": "ORCL",
    "username": "user",
    "password": "password"
  }
}
```

### MongoDB

```json
{
  "name": "MongoDB Cluster",
  "source_type": "mongodb",
  "source_config": {
    "uri": "mongodb://user:password@mongo.example.com:27017",
    "database": "mydb"
  }
}
```


### MinIO

```json
{
  "name": "MinIO Objects",
  "source_type": "minio",
  "source_config": {
    "endpoint": "minio.example.com",
    "port": 9000,
    "access_key": "minioadmin",
    "secret_key": "minioadmin",
    "bucket": "my-bucket",
    "use_ssl": true,
    "region": "us-east-1"
  }
}
```

### Redis

```json
{
  "name": "Redis Cache",
  "source_type": "redis",
  "source_config": {
    "host": "redis.example.com",
    "port": 6379,
    "password": "password",
    "db": 0
  }
}
```

### FTP

```json
{
  "name": "FTP Server",
  "source_type": "ftp",
  "source_config": {
    "host": "ftp.example.com",
    "port": 21,
    "username": "ftpuser",
    "password": "password",
    "path": "/data/exports"
  }
}
```

### SFTP

```json
{
  "name": "SFTP Server",
  "source_type": "sftp",
  "source_config": {
    "host": "sftp.example.com",
    "port": 22,
    "username": "sftpuser",
    "password": "password",
    "path": "/data/exports"
  }
}
```

### REST API

```json
{
  "name": "External API",
  "source_type": "api",
  "source_config": {
    "url": "https://api.example.com/v1/data",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer your-api-token",
      "Content-Type": "application/json"
    }
  }
}
```

## Port Reference

| Database | Default Port |
|----------|--------------|
| PostgreSQL | 5432 |
| MySQL | 3306 |
| SQL Server | 1433 |
| Oracle | 1521 |
| MongoDB | 27017 |
| MinIO | 9000 |
| Redis | 6379 |
| FTP | 21 |
| SFTP | 22 |

## Security Best Practices

:::tip Recommendations
1. **Use SSL/TLS** - Enable SSL untuk semua database connections
2. **Least Privilege** - Gunakan user dengan minimum permissions (SELECT only untuk source)
3. **Network Segmentation** - Pisahkan DSP dari public network
4. **Rotate Credentials** - Ganti password secara berkala
:::

## Firewall Rules

Pastikan firewall mengizinkan koneksi dari Agent ke data sources:

```bash
# Contoh: buka akses ke PostgreSQL
sudo ufw allow out 5432/tcp

# Buka akses ke MySQL
sudo ufw allow out 3306/tcp
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| Connection refused | Pastikan service running dan port terbuka |
| Authentication failed | Verify username/password |
| SSL certificate error | Gunakan `ssl_mode: require` atau install CA cert |
| Timeout | Check network connectivity dan firewall |
