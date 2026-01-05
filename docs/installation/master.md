---
sidebar_position: 1
---

# Master Installation

Panduan lengkap instalasi DSP Master Server.

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4 cores |
| RAM | 2 GB | 4 GB |
| Disk | 10 GB | 50 GB |
| OS | Linux, macOS, Windows | Ubuntu 22.04 LTS |

## Key Features

- **Single Binary** - Tidak butuh install database server terpisah (SQLite embedded)
- **Bundled UI** - React/Vite dashboard ter-bundle di binary
- **Multi-platform** - Build untuk Linux, macOS, Windows

## Installation Methods

### 1. Build from Source (Recommended)

```bash
# Clone repository
git clone https://github.com/alfalaq12/dsp-platform.git
cd dsp-platform

# Build untuk semua platform
./scripts/build-release.sh 1.0.0

# atau Windows:
.\scripts\build-release.ps1 -Version "1.0.0"
```

### 2. Download Release

Download binary dari [GitHub Releases](https://github.com/alfalaq12/dsp-platform/releases):

```bash
# Linux
wget https://github.com/alfalaq12/dsp-platform/releases/latest/download/dsp-master-linux
chmod +x dsp-master-linux
```

## Configuration

### Environment Variables

Buat file `.env` dari template:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
# Server Ports
PORT=441               # Master Console/Web UI (customizable)
TCP_PORT=447           # Agent Listener (customizable)

# Security - WAJIB DIGANTI!
JWT_SECRET=your-secure-random-string-here

# TLS (Opsional)
TLS_ENABLED=false

# Database settings dikonfigurasi via Web Console -> Settings
```

:::warning Port Configuration
Jika port 441 atau 447 tidak diizinkan di network Anda, ubah `PORT` dan `TCP_PORT` ke port yang tersedia.
:::

### Generate TLS Certificates (Opsional)

```bash
mkdir -p certs
openssl req -x509 -newkey rsa:4096 \
  -keyout certs/server.key \
  -out certs/server.crt \
  -days 365 -nodes \
  -subj "/CN=dsp-master"
```

## Running as Service

### Systemd (Linux)

Buat file `/etc/systemd/system/dsp-master.service`:

```ini
[Unit]
Description=DSP Master Server
After=network.target

[Service]
Type=simple
User=dsp
WorkingDirectory=/opt/dsp
ExecStart=/opt/dsp/dsp-master
Restart=always
RestartSec=5
EnvironmentFile=/opt/dsp/.env

[Install]
WantedBy=multi-user.target
```

Enable dan start service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable dsp-master
sudo systemctl start dsp-master
sudo systemctl status dsp-master
```

### Windows Service

```powershell
# Install sebagai service (requires NSSM atau sc.exe)
sc.exe create DSPMaster binPath= "C:\dsp\dsp-master.exe" start= auto
sc.exe start DSPMaster
```

## Verify Installation

```bash
# Check web console
curl http://localhost:441

# Check API health
curl http://localhost:441/api/health
```

Akses Dashboard: `http://localhost:441`
Login Default: `admin` / `admin`

## Default Ports

| Port | Purpose | Customizable |
|------|---------|--------------|
| 441 | Master Console/Web UI & REST API | ✅ via `PORT` |
| 447 | Agent TCP Listener | ✅ via `TCP_PORT` |

## Next Steps

- [Install Agent](/docs/installation/agent) - Setup agent di server remote
- [Configure Network](/docs/network/setup) - Setup koneksi database
