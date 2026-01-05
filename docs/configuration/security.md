---
sidebar_position: 1
---

# Security Configuration

Panduan konfigurasi keamanan DSP Platform.

## Overview

DSP Platform dirancang dengan security-first approach:

| Feature | Description |
|---------|-------------|
| JWT Authentication | Token dengan HttpOnly Cookies |
| Password Hashing | Bcrypt |
| TLS Support | Optional TLS/SSL untuk TCP dan HTTP |
| RBAC | Role-based access (Admin/Viewer) |
| Audit Log | Semua aksi user ter-log |
| Session Timeout | Auto-logout setelah idle |

## Authentication

### JWT Configuration

Edit `.env`:

```bash
# WAJIB diganti! Gunakan string random minimal 32 karakter
JWT_SECRET=your-super-secure-random-string-here-min-32-chars
```

Generate random secret:

```bash
openssl rand -base64 32
```

### Session Timeout

Default session timeout adalah 30 menit idle. User akan otomatis logout dengan warning modal sebelumnya.

## Role-Based Access Control (RBAC)

DSP menggunakan 2 role:

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: Create, Read, Update, Delete semua resources |
| **Viewer** | Read-only: Hanya bisa lihat data, tidak bisa modify |

### Feature Access Matrix

| Feature | Admin | Viewer |
|---------|-------|--------|
| Dashboard | ✅ | ✅ |
| View Jobs | ✅ | ✅ |
| Create/Edit Jobs | ✅ | ❌ |
| View Networks | ✅ | ✅ |
| Create/Edit Networks | ✅ | ❌ |
| Terminal Console | ✅ | ❌ |
| User Management | ✅ | ❌ |
| Settings | ✅ | ❌ |

## TLS/SSL

### Enable TLS

Edit `.env`:

```bash
TLS_ENABLED=true
TLS_CERT=./certs/server.crt
TLS_KEY=./certs/server.key
```

### Generate Self-Signed Certificate

```bash
mkdir -p certs

openssl req -x509 -newkey rsa:4096 \
  -keyout certs/server.key \
  -out certs/server.crt \
  -days 365 -nodes \
  -subj "/CN=dsp-master"
```

:::warning Production
Untuk production, gunakan certificate dari CA terpercaya (Let's Encrypt, DigiCert, dll).
:::

## Audit Logging

Semua aksi user ter-log di database:

| Field | Description |
|-------|-------------|
| Timestamp | Waktu aksi |
| User | User yang melakukan aksi |
| Action | Jenis aksi (CREATE, UPDATE, DELETE) |
| Resource | Resource yang diakses |
| Details | Detail perubahan |

### View Audit Logs

1. Login sebagai Admin
2. Go to **Settings** → **Audit Logs**
3. Filter by user, action, atau date range

### Example Log Entry

```json
{
  "timestamp": "2024-01-15T10:30:45Z",
  "user": "admin",
  "ip": "192.168.1.100",
  "action": "CREATE",
  "resource": "Network",
  "resource_id": "net-123",
  "details": "Created PostgreSQL connection 'Production DB'"
}
```

## Password Policy

### Default Admin Password

- **Username**: `admin`
- **Password**: `admin`

:::danger WAJIB Ganti!
Segera ganti password default setelah login pertama!
:::

### Password Requirements

- Minimum 8 karakter
- Kombinasi huruf dan angka (recommended)

## Network Security

### Firewall Configuration

```bash
# Buka port untuk Web Console
sudo ufw allow 441/tcp  # atau 8441

# Buka port untuk Agent Listener
sudo ufw allow 447/tcp   # atau 8447

# Blokir akses lain
sudo ufw default deny incoming
sudo ufw enable
```

### Recommended Architecture

```
                    ┌─────────────────┐
                    │    Firewall     │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
    ┌─────────┐        ┌─────────┐        ┌─────────┐
    │  Admin  │        │ Master  │        │  Agent  │
    │ Network │◄──────►│ Server  │◄──────►│ Network │
    │ (441)   │        │         │        │ (447)   │
    └─────────┘        └─────────┘        └─────────┘
```

## Best Practices

:::tip Security Checklist
1. ✅ Ganti `JWT_SECRET` dengan random string
2. ✅ Ganti password default admin
3. ✅ Enable TLS untuk production
4. ✅ Gunakan firewall untuk restrict access
5. ✅ Review audit logs secara berkala
6. ✅ Buat user terpisah dengan role yang sesuai
7. ✅ Rotate credentials secara berkala
:::
