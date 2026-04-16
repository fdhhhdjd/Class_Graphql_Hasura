<div align="center">

<img src="https://res.cloudinary.com/ecommerce2021/image/upload/v1659065987/avatar/logo_begsn1.png" width="120" alt="Logo" />

# 🔁 Class GraphQL Hasura

**A full-stack backend course project demonstrating real-time GraphQL APIs with Hasura, Node.js, and PostgreSQL — all containerized with Docker.**

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)](https://graphql.org)
[![Hasura](https://img.shields.io/badge/Hasura-1EB4D4?style=flat-square&logo=hasura&logoColor=white)](https://hasura.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

[📖 Documentation](#-graphql-examples) • [🚀 Quick Start](#-quick-start) • [🏗 Architecture](#-architecture) • [🤝 Contact](#-contact)

</div>

---

## 📌 Overview

This project is a hands-on class repository for learning how to build a production-ready backend using **Hasura GraphQL Engine** on top of **PostgreSQL**, with a custom **Node.js / Express** API layer for business logic, authentication, and event handling.

**Key highlights:**
- ⚡ Instant GraphQL API auto-generated from your database schema via Hasura
- 🔐 JWT-based authentication with bcrypt password hashing
- 📡 Real-time data sync using GraphQL Subscriptions
- 🎯 Event Triggers & Cron Jobs powered by Hasura
- 🐳 One-command setup with Docker Compose

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Client                          │
│           (REST API / GraphQL Client)               │
└────────────────┬────────────────┬───────────────────┘
                 │                │
     ┌───────────▼──────┐  ┌──────▼────────────────┐
     │  Node.js Express │  │   Hasura GraphQL Engine│
     │  (Auth, Logic)   │  │   (Auto GraphQL API)   │
     └───────────┬──────┘  └──────┬────────────────┘
                 │                │
                 └───────┬────────┘
                         │
              ┌──────────▼──────────┐
              │     PostgreSQL      │
              │  (Primary Database) │
              └─────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | 20.x |
| Framework | Express.js | 4.x |
| GraphQL Engine | Hasura | Latest |
| Database | PostgreSQL | Latest |
| Query Builder | Knex.js | 3.x |
| Auth | JWT + bcrypt | — |
| Containerization | Docker / Docker Compose | — |
| Security | Helmet, CORS, Validator | — |
| Email | Nodemailer + Handlebars | — |

---

## 📋 Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org) `v20.x` or higher
- [Docker](https://www.docker.com/get-started) & Docker Compose
- [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/overview/) _(optional, for metadata management)_

```bash
# Verify your setup
node --version   # v20.x
docker --version
docker compose version
```

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/fdhhhdjd/Class_Graphql_Hasura.git
cd Class_Graphql_Hasura
```

### 2. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

<details>
<summary>📄 View .env example variables</summary>

```env
# Server
PORT=3000
NODE_ENV=development

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database

# Hasura
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080
HASURA_ADMIN_SECRET=class_docker

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```
</details>

### 3. Start all services with Docker

```bash
docker compose up -d
```

This will spin up:
- 🐘 **PostgreSQL** — database on port `5432`
- 🔷 **Hasura GraphQL Engine** — GraphQL API on port `8080`
- 🟢 **Node.js Express** — REST API on port `3000`

### 4. Apply Hasura metadata _(optional)_

```bash
# Install Hasura CLI
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# Apply metadata
hasura init --endpoint http://localhost:8080 --admin-secret class_docker
cd hasura && hasura metadata apply
```

### 5. Run Node.js server (local dev)

```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
Class_Graphql_Hasura/
├── src/
│   ├── app/
│   │   └── v1/              # API routes version 1
│   ├── commons/             # Shared utilities & helpers
│   ├── cores/               # Core middlewares & configs
│   └── views/               # Email templates (Handlebars)
├── hasura/                  # Hasura metadata & migrations
├── database/                # DB seed & migration files
├── docker/                  # Dockerfiles
├── docker-compose.yml       # Multi-service orchestration
├── index.js                 # App entry point
├── .env.example             # Environment variable template
├── GRAPHQL.md               # GraphQL query examples
└── makefile                 # Shortcut commands
```

---

## 📖 GraphQL Examples

Once running, access the **Hasura Console** at `http://localhost:8080` with admin secret `class_docker`.

### Query — Get all users

```graphql
query GetUsers {
  user {
    id
    fullname
    email
    created_at
  }
}
```

### Mutation — Create a user

```graphql
mutation CreateUser($email: String!, $fullname: String!, $password: String!) {
  insert_user(objects: { email: $email, fullname: $fullname, password: $password }) {
    returning {
      id
      fullname
      created_at
    }
  }
}
```

### Mutation — Insert user with nested comment

```graphql
mutation InsertUserAndComment {
  insert_user_one(
    object: {
      email: "tai@gmail.com"
      fullname: "Nguyen Tien Tai"
      password: "hashed_password"
      comments: { data: { comment: "Hello World!" } }
    }
  ) {
    id
    fullname
    comments {
      comment
    }
  }
}
```

### Subscription — Real-time users

```graphql
subscription GetLiveUsers {
  user(order_by: { id: desc }) {
    id
    email
    fullname
    created_at
  }
}
```

---

## 🔒 Security Features

- 🔐 **JWT Authentication** — stateless token-based auth
- 🔑 **bcrypt** — secure password hashing (10 salt rounds)
- 🛡 **Helmet** — sets secure HTTP headers
- 🌐 **CORS** — configurable cross-origin resource sharing
- ✅ **Validator** — input sanitization and validation
- 🍪 **Cookie Parser** — secure cookie handling

---

## 🧪 Available Scripts

```bash
npm run dev    # Start server with hot-reload (Node watch)
npm run node   # Start server with nodemon
npm start      # Start production server
```

---

## 🤝 Contact

<div align="center">

**Author: Nguyen Tien Tai**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tai-nguyen-tien-787545213/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://profile-forme.com)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nguyentientai10@gmail.com)

If this project helped you, consider giving it a ⭐️ — it means a lot!

</div>

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://profile-forme.com">Nguyen Tien Tai</a></sub>
</div>
