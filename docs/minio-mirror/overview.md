---
sidebar_position: 1
---

# MinIO Mirroring

Panduan mirroring data antar MinIO Object Storage.

## Overview

DSP Platform mendukung fitur **MinIO-to-MinIO Mirroring** yang memungkinkan replikasi bucket secara real-time atau scheduled antara dua instance MinIO. Fitur ini didukung baik oleh **Master Server** maupun **Tenant Agent**.

## Use Cases

- **Disaster Recovery** - Replikasi data ke data center cadangan
- **Geo-Replication** - Distribusi content ke region lain
- **Backup** - Backup bucket production ke environment archive
- **Migration** - Migrasi data antar MinIO cluster

## Configuration

### 1. Setup Network Connections

Buat koneksi untuk Source MinIO dan Target MinIO di menu **Network**.

#### Source MinIO
```json
{
  "name": "Source MinIO",
  "type": "minio",
  "source_config": {
    "endpoint": "minio-source.example.com:9000",
    "access_key": "minioadmin",
    "secret_key": "minioadmin",
    "bucket": "my-source-bucket",
    "use_ssl": true,
    "region": "us-east-1"
  }
}
```

#### Target MinIO
```json
{
  "name": "Target MinIO",
  "type": "minio",
  "source_config": {
    "endpoint": "minio-target.example.com:9000",
    "access_key": "targetadmin",
    "secret_key": "targetadmin",
    "bucket": "my-target-bucket",
    "use_ssl": true,
    "region": "us-west-1"
  }
}
```

### 2. Create Mirror Job

Buat job mirroring di menu **Jobs**.

| Field | Value |
|-------|-------|
| Name | `Mirror Production to DR` |
| Type | `MinIO Mirror` |
| Source | `Source MinIO` |
| Target | `Target MinIO` |
| Mode | `Mirror` (One-way sync) |
| Schedule | `*/5 * * * *` (Every 5 minutes) or Real-time |

## Features

- **Recursive Mirror** - Replikasi seluruh folder/prefix structure
- **Differential Sync** - Hanya upload file yang berubah (size/timestamp)
- **Delete Propagation** - Opsi untuk menghapus file di target jika di source hilang
- **Bandwidth Control** - Limit bandwidth usage (via config)

## Architecture

```
┌─────────────┐                    ┌─────────────┐
│  Source     │     Download       │   DSP       │      Upload      ┌─────────────┐
│  MinIO      │ ─────────────────► │ Master/Agent│ ───────────────► │  Target     │
│             │                    │             │                  │  MinIO      │
└─────────────┘                    └─────────────┘                  └─────────────┘
```

## Setup di Agent

Agent juga bisa melakukan mirroring lokal ke remote atau sebaliknya.

1. Install Agent di server yang memiliki akses ke MinIO network
2. Configure Network connections di Master dan assign ke Agent tersebut
3. Create Job dengan execute on Agent

## Best Practices

:::tip Recommendations
1. **Use SSL** - Selalu gunakan HTTPS untuk transfer data
2. **Same Region** - Jika memungkinkan, letakkan Agent dekat dengan Source MinIO untuk read performance
3. **Consistency Check** - Jalankan job verifikasi berkala
:::
