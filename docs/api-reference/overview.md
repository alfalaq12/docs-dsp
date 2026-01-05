---
sidebar_position: 1
---

# API Reference

Dokumentasi REST API DSP Platform.

## Authentication

Semua request ke API harus menyertakan JWT Token di Header atau Cookie.

```bash
Authorization: Bearer <your-token>
```

## Base URL

```
http://localhost:441/api/v1
```

## Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get current user profile |

### Networks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/networks` | List defined networks |
| POST | `/networks` | Create new network connection |
| GET | `/networks/:id` | Get network details |
| PUT | `/networks/:id` | Update network |
| DELETE | `/networks/:id` | Delete network |
| POST | `/networks/test` | Test connection |

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | List sync jobs |
| POST | `/jobs` | Create new sync job |
| POST | `/jobs/:id/run` | Trigger job manual run |

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/agents` | List registered agents |
| POST | `/agents/token` | Generate new agent token |

:::info Swagger UI
Untuk dokumentasi API yang interaktif (Swagger UI), silakan akses endpoint `/swagger/index.html` pada instance Master yang berjalan.
:::
