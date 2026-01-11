<img width="600" height="600" alt="logo" src="https://github.com/user-attachments/assets/5d61c808-1c8e-4e35-9718-2ff0663c5360" />

# RAG.io - Retrieval-Augmented Generation

**Enterprise-grade RAG platform with multi-provider LLM support, document intelligence, and real-time streaming**

![License](https://img.shields.io/badge/MIT-00599C?style=for-the-badge&logo=MIT&logoColor=black)
![Python](https://img.shields.io/badge/Python-4EAA25?style=for-the-badge&logo=Python&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-4EAA25?style=for-the-badge&logo=FastAPI&logoColor=black)
![React](https://img.shields.io/badge/React-4EAA25?style=for-the-badge&logo=React&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-0078D6?style=for-the-badge&logo=Docker&logoColor=black)


## 📋 Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

RAG Multi-Expert is a production-ready Retrieval-Augmented Generation platform that combines the power of vector databases, intelligent document processing, and multi-provider LLM integration. Built for enterprises and developers who need:

- **Intelligent Document Search**: ChromaDB-powered semantic search with adjustable retrieval parameters
- **Multi-Provider LLM Support**: Seamless integration with OpenAI, Claude, Gemini, Ollama, and 10+ providers
- **Project-Based Organization**: Isolate document collections and conversations by project
- **Real-Time Streaming**: Server-Sent Events for progressive responses
- **Fine-Grained Control**: Per-conversation temperature, top-k, and context window management
- **Enterprise Security**: JWT authentication, AES-256 encryption, GDPR compliance

### Key Differentiators

| Feature | Traditional RAG | This Platform |
|---------|----------------|---------------|
| **Context Window** | Fixed 4K-8K | Adaptive 8K-2M (auto-detects model) |
| **Chunking** | Static 512 tokens | Smart chunking with overlap (100-2000 tokens) |
| **History Management** | No truncation | Intelligent truncation with recency bias |
| **Provider Support** | Single provider | 13+ providers with fallback |
| **Real-Time UX** | Blocking requests | SSE streaming with auto-reconnect |

---

## Demo

### 1. RAG Chat Interface
<img width="1719" height="911" alt="Capture d&#39;écran 2025-12-05 235210" src="https://github.com/user-attachments/assets/01661270-926b-4409-8c18-757d0210c835" />
*Real-time streaming with source attribution and intelligent context management*

### 2. Document Upload & Processing
<img width="1702" height="905" alt="Capture d&#39;écran 2025-12-05 235411" src="https://github.com/user-attachments/assets/20666ce0-59f0-4a94-aab9-1b9b0448c7d1" />
*Repo/Manual upload with automatic chunking and vectorization*

### 3. Project Dashboard
<img width="1719" height="908" alt="Capture d&#39;écran 2025-12-05 235129" src="https://github.com/user-attachments/assets/e391f4c8-da1c-4d7b-9dbd-2d79db4bb01e" />
*Multi-project organization with statistics and document management*

### 4. Provider Configuration
<img width="1716" height="908" alt="Capture d&#39;écran 2025-12-05 235528" src="https://github.com/user-attachments/assets/34b36ea4-3b67-44cb-984e-73ea799237c1" />
*Graphical configuration for 13+ LLM providers*

---

## Features

### Core RAG Capabilities

#### **Document Processing**
- **Supported Formats**: PDF, DOCX, TXT, MD, HTML, CSV, JSON (50+ file types)
- **Smart Chunking**: Adaptive chunk size (100-2000 tokens) with configurable overlap
- **Metadata Extraction**: Automatic filename, page number, and document type tagging
- **Token Tracking**: Real-time token counting for cost estimation
- **Batch Processing**: Background async processing with progress tracking

#### **Semantic Search**
- **Vector Database**: ChromaDB with HNSW indexing
- **Embedding Models**: sentence-transformers/all-MiniLM-L6-v2 (default), OpenAI embeddings
- **Adjustable top-k**: Dynamic retrieval (1-20 chunks) based on model context
- **Distance Scoring**: Cosine similarity with configurable threshold
- **Metadata Filtering**: Filter by document type, date, or custom tags

#### **Multi-Provider LLM Support**

| Provider | Models | Context Window | Streaming | Temperature |
|----------|--------|----------------|-----------|-------------|
| **OpenAI** | GPT-4, GPT-4-turbo, o1-preview | 8K-128K | ✅ | 0.0-2.0 |
| **Anthropic** | Claude 3.5 Sonnet, Opus, Haiku | 200K | ✅ | 0.0-1.0 |
| **Google** | Gemini 1.5 Pro/Flash, 2.0 | 2M | ✅ | 0.0-2.0 |
| **Ollama** | Llama 3.1, Mistral, Phi-3 | 8K-128K | ✅ | 0.0-2.0 |
| **Groq** | Llama 3, Mixtral | 32K | ✅ | 0.0-2.0 |
| **OpenRouter** | 200+ models | Varies | ✅ | 0.0-2.0 |
| **HuggingFace** | Custom models | Varies | ✅ | 0.0-2.0 |


**Features:**
- ✅ Auto-detect model context limits
- ✅ Dynamic top-k adjustment (more chunks for large context models)
- ✅ Intelligent history truncation (keeps recent messages + summary)
- ✅ RAG context capped at 50% of total context
- ✅ Real-time token counting with overflow protection

#### 💬 **Conversation Management**
- **Multi-Conversation**: Unlimited conversations per project
- **History Storage**: PostgreSQL with full conversation replay
- **Smart Truncation**: Keeps recent messages, summarizes older ones
- **Export**: JSON, Markdown, HTML formats
- **Search**: Full-text search across all conversations

### Advanced Features

#### 🎛️ **Fine-Grained Control**
- **Temperature**: Per-conversation creativity control (0.0-2.0)
- **Top-k**: Adjustable chunk retrieval (1-20)
- **Chunk Size**: Configurable per project (100-2000 tokens)
- **Overlap**: Smart overlap to preserve context (10-500 tokens)

#### **Analytics & Monitoring**
- Real-time token usage tracking
- Per-provider cost estimation
- Document processing statistics
- Conversation metrics (latency, token count)

#### **Security & Privacy**
- JWT-based authentication
- AES-256 API key encryption
- CORS protection
- Rate limiting (60 req/min)
- GDPR-compliant data storage

---

## Tech Stack

### Backend
- **Framework**: FastAPI 0.104+ (async, type-safe)
- **Vector DB**: ChromaDB 0.4+ (persistent, HNSW indexing)
- **Database**: PostgreSQL 15+ (production) / SQLite (dev)
- **ORM**: SQLAlchemy 2.0+ (async support)
- **Embeddings**: sentence-transformers (all-MiniLM-L6-v2)
- **Document Processing**: PyPDF2, python-docx, beautifulsoup4
- **Auth**: JWT (PyJWT), AES-256 (cryptography)
- **Streaming**: SSE (Server-Sent Events)

### Frontend
- **Framework**: React 18.2 (Vite)
- **State Management**: Zustand
- **Routing**: React Router v6
- **UI**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **HTTP**: Axios with interceptors
- **Markdown**: react-markdown, react-syntax-highlighter

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx (production)
- **Deployment**: Single `docker-compose up`

---

## Installation

### Prerequisites

```bash
# Required
- Docker 24.0+
- Docker Compose 2.20+
- 8GB RAM minimum (16GB recommended)
- 10GB disk space

# Optional (for local development)
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
```
### Quick start with Kubernetes *(Production-ready)*

> **Helm Chart + Documentation**

[📚 **Documentation Kubernetes officiel** →](https://iwebbo.github.io/RAG.io/)

https://iwebbo.github.io/RAG.io/


### Quick Start (Docker)

```bash
# 1. Clone repository
git clone https://github.com/iwebbo/rag.io.git
cd rag.io

# 2. Copy config files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Generate secrets
python3 -c "import secrets; print(secrets.token_hex(32))"  # SECRET_KEY
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"  # ENCRYPTION_KEY

# 4. Edit backend/.env with your secrets

# 4.1 Edit backend/.env if (need to be run from VM/PROD Server)
# Change by your hostname.fqdn or IP
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost,http://localhost:80
# Change by your hostname.fqdn or IP

# 4.1 Edit frontend/.env if (need to be run from VM/PROD Server)
# Change by your hostname.fqdn or IP
VITE_API_URL=http://localhost:8000 

# Will be solve in 1.1.0
cd backend/
mkdir -p /app/data/chromadb
chmod -R 777 /app/data

# 5. Start application
docker-compose up -d

# 6. Check status
docker-compose ps

# 4. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

**First-time setup:**
```bash
# Create first user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"SecurePass123!"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -d "username=admin&password=SecurePass123!"
```

### Manual Installation (Development)

#### Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python -c "from app.database import init_db; init_db()"

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Configure API URL
echo "VITE_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

---

## API Documentation
```bash
API Docs: http://localhost:8000/docs
```

## Usage Guide

### 1. Create Your First Project

```bash
# Via API
curl -X POST http://localhost:8000/api/projects/ \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Company Docs",
    "description": "Internal documentation",
    "chunk_size": 500,
    "chunk_overlap": 50
  }'
```

Or via UI: **Projects → New Project**

### 2. Upload Documents

```bash
# Via API
curl -X POST http://localhost:8000/api/documents/projects/{project_id}/upload \
  -H "Authorization: Bearer {token}" \
  -F "file=@employee_handbook.pdf"
```

Or via UI: **Project → Documents → Upload**

**Processing Status:**
- `processing`: Document is being chunked and vectorized
- `completed`: Ready for RAG queries
- `failed`: Check `error_message` field

### 3. Start a RAG Conversation

```javascript
// Frontend example (React)
const startChat = async (message, projectId) => {
  const response = await fetch('/api/rag/chat/stream', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      project_id: projectId,
      provider_name: 'ollama',
      model: 'llama3.1:8b',
      temperature: 0.7,
      top_k: 5
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('event: message')) {
        const dataLine = lines[lines.indexOf(line) + 1];
        const data = JSON.parse(dataLine.substring(6));
        console.log('Token:', data.content);
      }
    }
  }
};
```

### 5. Monitor Performance

Check **Projects → Statistics** for:
- Document processing status
- Total chunks and tokens
- Conversation metrics
- Provider usage statistics

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) file for details.

**Built with ❤️ for Community**

⭐ Star us on GitHub if you find this useful!
