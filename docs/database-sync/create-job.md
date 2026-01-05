---
sidebar_position: 1
---

# Creating Sync Jobs

Panduan membuat dan menjalankan job sinkronisasi database.

## Overview

Sync job adalah unit kerja di DSP untuk sinkronisasi data dari source database ke target database. DSP mendukung:

- **Full Sync** - Sync seluruh data dari tabel
- **Incremental Sync** - Sync hanya data yang berubah (berdasarkan timestamp)
- **Scheduled Sync** - Sync otomatis berdasarkan jadwal (cron)

## Prerequisites

Sebelum membuat sync job, pastikan Anda sudah:

1. ✅ Setup [Network Connection](/docs/network/setup) ke source database
2. ✅ Setup [Network Connection](/docs/network/setup) ke target database  
3. ✅ Definisikan Schema untuk mapping tabel

## Step-by-Step Guide

### 1. Create Network Connections

Buat koneksi untuk source dan target database di menu **Network**:

#### Source Database
```json
{
  "name": "Production DB (Source)",
  "type": "postgresql",
  "host": "prod-db.example.com",
  "port": 5432,
  "database": "myapp_prod",
  "username": "readonly_user",
  "password": "***"
}
```

#### Target Database
```json
{
  "name": "Analytics DB (Target)",
  "type": "postgresql", 
  "host": "analytics-db.example.com",
  "port": 5432,
  "database": "analytics",
  "username": "sync_user",
  "password": "***"
}
```

### 2. Define Schema

Di menu **Schema**, definisikan mapping tabel:

```json
{
  "name": "Users Sync Schema",
  "source_table": "users",
  "target_table": "dim_users",
  "primary_key": "id",
  "columns": [
    {"source": "id", "target": "user_id", "type": "integer"},
    {"source": "email", "target": "email", "type": "string"},
    {"source": "name", "target": "full_name", "type": "string"},
    {"source": "created_at", "target": "created_at", "type": "timestamp"}
  ]
}
```

### 3. Create Sync Job

Di menu **Jobs**, klik **Create Job**:

| Field | Value |
|-------|-------|
| Name | `Sync Users to Analytics` |
| Network | `Production DB (Source)` |
| Schema | `Users Sync Schema` |
| Sync Mode | `Full Sync` |
| Schedule | `0 0 * * *` (daily at midnight) |

### 4. Run Job

Klik **Run Now** untuk menjalankan job secara manual, atau tunggu jadwal cron berjalan.

## Monitor Progress

Saat job berjalan, Anda bisa melihat:

- **Progress bar** - Persentase records yang sudah di-sync
- **Records/sec** - Kecepatan sync saat ini
- **Logs** - Detail log untuk debugging

```
[INFO] Starting sync job: Sync Users to Analytics
[INFO] Fetching records from source: users
[INFO] Total records: 50,000
[INFO] Processing batch 1/50 (1000 records)
[INFO] Processing batch 2/50 (1000 records)
...
[INFO] Sync completed. Total: 50,000, Success: 50,000, Failed: 0
```

## Best Practices

:::tip Performance Tips
- Gunakan **batch size** yang optimal (default: 1000)
- Untuk tabel besar (>1M records), gunakan **Incremental Sync**
- Pastikan index ada di primary key dan timestamp column
:::

:::warning Avoid Data Loss
- Selalu backup target database sebelum first sync
- Test di staging environment terlebih dahulu
- Gunakan user dengan minimum required permissions
:::
