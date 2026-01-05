---
sidebar_position: 1
---

# Quick Start

Panduan cepat untuk memulai dengan DSP Platform dalam 5 menit.

## Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- **Linux/macOS/Windows** - DSP mendukung semua platform utama
- **Port 441** - Untuk Master Console/Web UI (customizable jika port tidak bisa dibuka)
- **Port 447** - Untuk Agent Listener/TCP (customizable jika port tidak bisa dibuka)

:::tip Port Customization
Jika port default (441, 447) tidak diizinkan di environment Anda, gunakan port alternatif dengan mengubah di `.env`
:::

## Download & Install

### Linux

```bash
# Clone repository
git clone https://github.com/alfalaq12/dsp-platform.git
cd dsp-platform

# Build untuk semua platform
./scripts/build-release.sh 1.0.0

# Buat .env dari template
cp .env.example .env
# Edit JWT_SECRET!

# Jalankan
./dsp-master
```

### Windows

```powershell
# Clone repository
git clone https://github.com/alfalaq12/dsp-platform.git
cd dsp-platform

# Build
.\scripts\build-release.ps1 -Version "1.0.0"

# Buat .env dari template
Copy-Item .env.example .env
# Edit JWT_SECRET!

# Jalankan
.\dsp-master.exe
```

## First Login

1. Akses web console di `http://localhost:441`
2. Login dengan kredensial default:
   - **Username**: `admin`
   - **Password**: `admin`
3. **WAJIB** ubah password setelah login pertama!

:::warning Security
Jangan pernah gunakan password default di production! Segera ganti setelah login pertama.
:::

## Konfigurasi Master

Edit file `.env` untuk konfigurasi:

```bash
# Server ports
PORT=441            # Master Console/Web UI (customizable)
TCP_PORT=447        # Agent Listener (customizable)

# Security
JWT_SECRET=your-secure-random-string-here

# TLS (opsional)
TLS_ENABLED=false

# Database settings dikonfigurasi via Web Console -> Settings
```

## Next Steps

Setelah berhasil login, lanjutkan ke:

- [Instalasi Agent](/docs/installation/agent) - Setup agent di server source
- [Konfigurasi Network](/docs/network/setup) - Setup koneksi ke database/file server
- [Membuat Sync Job](/docs/database-sync/create-job) - Buat job sync pertama Anda
