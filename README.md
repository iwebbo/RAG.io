<img width="1198" height="889" alt="ragio" src="https://github.com/user-attachments/assets/feb860f4-eb97-48c9-9edb-986672ade375" />

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

## 🎯 Overview

RAG Multi-Expert is a production-ready Retrieval-Augmented Generation platform that combines the power of vector databases, intelligent document processing, and multi-provider LLM integration. Built for enterprises and developers who need:

- **🔍 Intelligent Document Search**: ChromaDB-powered semantic search with adjustable retrieval parameters
- **🤖 Multi-Provider LLM Support**: Seamless integration with OpenAI, Claude, Gemini, Ollama, and 10+ providers
- **📚 Project-Based Organization**: Isolate document collections and conversations by project
- **⚡ Real-Time Streaming**: Server-Sent Events for progressive responses
- **🎛️ Fine-Grained Control**: Per-conversation temperature, top-k, and context window management
- **🔐 Enterprise Security**: JWT authentication, AES-256 encryption, GDPR compliance

### Key Differentiators

| Feature | Traditional RAG | This Platform |
|---------|----------------|---------------|
| **Context Window** | Fixed 4K-8K | Adaptive 8K-2M (auto-detects model) |
| **Chunking** | Static 512 tokens | Smart chunking with overlap (100-2000 tokens) |
| **History Management** | No truncation | Intelligent truncation with recency bias |
| **Provider Support** | Single provider | 13+ providers with fallback |
| **Real-Time UX** | Blocking requests | SSE streaming with auto-reconnect |

---

## 🖼️ Demo

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

## ✨ Features

### Core RAG Capabilities

#### 📄 **Document Processing**
- **Supported Formats**: PDF, DOCX, TXT, MD, HTML, CSV, JSON (50+ file types)
- **Smart Chunking**: Adaptive chunk size (100-2000 tokens) with configurable overlap
- **Metadata Extraction**: Automatic filename, page number, and document type tagging
- **Token Tracking**: Real-time token counting for cost estimation
- **Batch Processing**: Background async processing with progress tracking

#### 🔍 **Semantic Search**
- **Vector Database**: ChromaDB with HNSW indexing
- **Embedding Models**: sentence-transformers/all-MiniLM-L6-v2 (default), OpenAI embeddings
- **Adjustable top-k**: Dynamic retrieval (1-20 chunks) based on model context
- **Distance Scoring**: Cosine similarity with configurable threshold
- **Metadata Filtering**: Filter by document type, date, or custom tags

#### 🤖 **Multi-Provider LLM Support**

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

#### ⚡ **Real-Time Streaming**
```javascript
// Server-Sent Events with auto-reconnect
const response = await fetch('/api/rag/chat/stream', {
  method: 'POST',
  body: JSON.stringify({ message, project_id, conversation_id })
});

const reader = response.body.getReader();
// Progressive token-by-token rendering
```

#### 🎛️ **Fine-Grained Control**
- **Temperature**: Per-conversation creativity control (0.0-2.0)
- **Top-k**: Adjustable chunk retrieval (1-20)
- **Chunk Size**: Configurable per project (100-2000 tokens)
- **Overlap**: Smart overlap to preserve context (10-500 tokens)

#### 📊 **Analytics & Monitoring**
- Real-time token usage tracking
- Per-provider cost estimation
- Document processing statistics
- Conversation metrics (latency, token count)

#### 🔐 **Security & Privacy**
- JWT-based authentication
- AES-256 API key encryption
- CORS protection
- Rate limiting (60 req/min)
- GDPR-compliant data storage

---


### RAG Pipeline Architecture

```
1. Document Ingestion
   ├─ Upload (drag-and-drop)
   ├─ Text Extraction (PyPDF2, python-docx, beautifulsoup4)
   ├─ Smart Chunking (overlap-based)
   ├─ Embedding Generation (sentence-transformers)
   └─ Vector Storage (ChromaDB)

2. Query Processing
   ├─ User Query → Embedding
   ├─ Semantic Search (cosine similarity)
   ├─ Top-k Retrieval (dynamic based on context)
   └─ Reranking (distance-based)

3. Context Building
   ├─ System Prompt + RAG Context (50% budget)
   ├─ Conversation History (35% budget)
   ├─ User Message (5% budget)
   └─ Response Buffer (40% budget)

4. LLM Invocation
   ├─ Provider Selection (with fallback)
   ├─ Streaming Response (SSE)
   ├─ Token Counting
   └─ Response Storage
```

---

## 🛠️ Tech Stack

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

## 📦 Installation

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
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost,http://localhost:80
# Change by your hostname.fqdn or IP

# 4.1 Edit frontend/.env if (need to be run from VM/PROD Server)
VITE_API_URL=http://localhost:8000 
# Change by your hostname.fqdn or IP

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

## ⚙️ Configuration

### Environment Variables

```bash
# Backend (.env)
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ragdb
# or
DATABASE_URL=sqlite:///./data/app.db

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# ChromaDB
CHROMA_PERSIST_DIRECTORY=./data/chromadb

# LLM Providers (optional, configure via UI)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
```

### Provider Configuration (UI)

Navigate to **Settings → Providers** to configure:

**OpenAI**
```
API Key: sk-...
Base URL: https://api.openai.com/v1 (default)
Models: Auto-detected (GPT-4, GPT-3.5-turbo, etc.)
```

**Ollama (Local)**
```
Base URL: http://localhost:11434 (default)
Models: Auto-detected (llama3.1, mistral, etc.)
No API key required
```

**Anthropic Claude**
```
API Key: sk-ant-...
Base URL: https://api.anthropic.com (default)
Models: claude-3-5-sonnet-20241022, claude-3-opus-20240229
```

### Project Configuration

When creating a new project:

```json
{
  "name": "Company Knowledge Base",
  "description": "Internal documentation and policies",
  "chunk_size": 500,           // 100-2000 tokens
  "chunk_overlap": 50,          // 10-500 tokens
  "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
  "top_k": 5                    // 1-20 chunks
}
```

**Chunk Size Guidelines:**
- **Small (100-300)**: Short FAQs, code snippets
- **Medium (400-700)**: Standard documents, articles
- **Large (800-2000)**: Technical docs, legal documents

**Overlap Guidelines:**
- **Low (10-50)**: Independent chunks (FAQs)
- **Medium (50-100)**: Standard documents
- **High (100-500)**: Context-heavy documents (legal, technical)

---

## 📚 API Documentation

### Authentication

All RAG endpoints require JWT authentication:

```bash
# Login
POST /api/auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=SecurePass123!

Response:
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}

# Use token in subsequent requests
Authorization: Bearer eyJ...
```

### RAG Chat API

#### Stream Chat (SSE)

```bash
POST /api/rag/chat/stream
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "What is our refund policy?",
  "project_id": "uuid",
  "conversation_id": "uuid",  // optional, creates new if null
  "provider_name": "ollama",
  "model": "llama3.1:8b",
  "temperature": 0.7,
  "top_k": 5
}

Response (Server-Sent Events):
event: retrieval
data: {"chunks": [...], "tokens": 1234}

event: message
data: {"content": "Based on the documents...", "tokens": 45}

event: message
data: {"content": " our refund policy states...", "tokens": 89}

event: done
data: {"conversation_id": "uuid", "total_tokens": 2567}
```

#### Get Conversation

```bash
GET /api/rag/conversation/{conversation_id}
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "project_id": "uuid",
  "title": "Refund Policy Discussion",
  "provider_name": "ollama",
  "model": "llama3.1:8b",
  "temperature": 0.7,
  "top_k": 5,
  "created_at": "2024-01-15T10:30:00Z",
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "content": "What is our refund policy?",
      "created_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "Based on the documents, our refund policy...",
      "retrieved_chunks": "[{...}]",
      "tokens_used": 234,
      "created_at": "2024-01-15T10:30:05Z"
    }
  ]
}
```

#### List Conversations

```bash
GET /api/rag/conversations/{project_id}
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "title": "Refund Policy Discussion",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z",
    "message_count": 4
  },
  ...
]
```

#### Delete Conversation

```bash
DELETE /api/rag/conversations/{conversation_id}
Authorization: Bearer {token}

Response:
{
  "message": "Conversation deleted"
}
```

### Project API

#### Create Project

```bash
POST /api/projects/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Company Knowledge Base",
  "description": "Internal documentation",
  "chunk_size": 500,
  "chunk_overlap": 50,
  "embedding_model": "sentence-transformers/all-MiniLM-L6-v2"
}

Response:
{
  "id": "uuid",
  "name": "Company Knowledge Base",
  "chunk_size": 500,
  "created_at": "2024-01-15T10:00:00Z"
}
```

#### List Projects

```bash
GET /api/projects/
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "name": "Company Knowledge Base",
    "description": "Internal documentation",
    "document_count": 12,
    "total_chunks": 456,
    "is_active": true,
    "created_at": "2024-01-15T10:00:00Z"
  },
  ...
]
```

#### Get Project

```bash
GET /api/projects/{project_id}
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "name": "Company Knowledge Base",
  "chunk_size": 500,
  "chunk_overlap": 50,
  "documents": [
    {
      "id": "uuid",
      "filename": "employee_handbook.pdf",
      "status": "completed",
      "chunk_count": 234
    }
  ]
}
```

#### Update Project

```bash
PUT /api/projects/{project_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "chunk_size": 700,
  "is_active": false
}

Response:
{
  "id": "uuid",
  "name": "Updated Name",
  "chunk_size": 700,
  "is_active": false
}
```

#### Delete Project

```bash
DELETE /api/projects/{project_id}
Authorization: Bearer {token}

Response: 204 No Content
```

#### Project Statistics

```bash
GET /api/projects/{project_id}/stats
Authorization: Bearer {token}

Response:
{
  "project_id": "uuid",
  "name": "Company Knowledge Base",
  "documents": 12,
  "chunks": 456,
  "tokens": 123456,
  "vector_count": 456
}
```

### Document API

#### Upload Document

```bash
POST /api/documents/projects/{project_id}/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file=@/path/to/document.pdf

Response:
{
  "document_id": "uuid",
  "filename": "document.pdf",
  "status": "processing",
  "message": "Document uploaded successfully"
}
```

**Supported file types:**
- PDF (.pdf)
- Word Documents (.docx)
- Text (.txt, .md)
- HTML (.html)
- CSV (.csv)
- JSON (.json)
- (50+ file types)

#### List Documents

```bash
GET /api/documents/projects/{project_id}/documents
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "filename": "employee_handbook.pdf",
    "file_type": "pdf",
    "file_size": 1024000,
    "chunk_count": 234,
    "total_tokens": 56789,
    "status": "completed",
    "uploaded_at": "2024-01-15T10:00:00Z",
    "processed_at": "2024-01-15T10:02:00Z"
  },
  ...
]
```

#### Get Document

```bash
GET /api/documents/{document_id}
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "filename": "employee_handbook.pdf",
  "status": "completed",
  "chunk_count": 234
}
```

#### Delete Document

```bash
DELETE /api/documents/projects/{project_id}/documents/{document_id}
Authorization: Bearer {token}

Response:
{
  "message": "Document deleted successfully"
}
```

### Provider API

#### List Providers

```bash
GET /api/providers/
Authorization: Bearer {token}

Response:
[
  {
    "id": "uuid",
    "name": "ollama",
    "display_name": "Ollama (Local)",
    "base_url": "http://localhost:11434",
    "is_active": true
  },
  {
    "id": "uuid",
    "name": "openai",
    "display_name": "OpenAI",
    "base_url": "https://api.openai.com/v1",
    "is_active": false
  }
]
```

#### Create Provider

```bash
POST /api/providers/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "openai",
  "display_name": "OpenAI",
  "base_url": "https://api.openai.com/v1",
  "api_key": "sk-...",
  "is_active": true
}

Response:
{
  "id": "uuid",
  "name": "openai",
  "is_active": true,
  "created_at": "2024-01-15T10:00:00Z"
}
```

#### Update Provider

```bash
PUT /api/providers/{provider_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "api_key": "sk-new-key...",
  "is_active": true
}

Response:
{
  "id": "uuid",
  "is_active": true,
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Test Provider

```bash
POST /api/providers/{provider_id}/test
Authorization: Bearer {token}

Response:
{
  "status": "success",
  "latency_ms": 234,
  "models_available": 5
}
```

#### List Models

```bash
GET /api/providers/{provider_id}/models
Authorization: Bearer {token}

Response:
{
  "provider": "ollama",
  "models": [
    {
      "id": "llama3.1:8b",
      "name": "Llama 3.1 8B",
      "context_window": 128000
    },
    {
      "id": "mistral:7b",
      "name": "Mistral 7B",
      "context_window": 32000
    }
  ]
}
```

### Error Responses

All API endpoints follow this error format:

```json
{
  "detail": "Error message",
  "status_code": 400
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `204`: No Content (successful deletion)
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `422`: Unprocessable Entity (Pydantic validation error)
- `500`: Internal Server Error

---

## 💡 Usage Guide

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

### 4. Optimize RAG Parameters

**For Different Use Cases:**

| Use Case | chunk_size | overlap | top_k | temperature |
|----------|-----------|---------|-------|-------------|
| **FAQ** | 200-400 | 20-50 | 3-5 | 0.3-0.5 |
| **Technical Docs** | 500-800 | 100-200 | 5-10 | 0.5-0.7 |
| **Legal Documents** | 800-1500 | 200-400 | 8-15 | 0.3-0.5 |
| **Creative Writing** | 400-700 | 50-100 | 3-7 | 0.8-1.2 |

**Model Selection:**

```javascript
// For large document collections (256K+ context)
{
  provider_name: 'anthropic',
  model: 'claude-3-5-sonnet-20241022',
  top_k: 15  // More chunks fit in large context
}

// For fast responses (small context)
{
  provider_name: 'ollama',
  model: 'llama3.1:8b',
  top_k: 5
}

// For highest quality (2M context!)
{
  provider_name: 'google',
  model: 'gemini-1.5-pro-002',
  top_k: 20
}
```

### 5. Monitor Performance

Check **Projects → Statistics** for:
- Document processing status
- Total chunks and tokens
- Conversation metrics
- Provider usage statistics

---

## 🛠️ Development

### Project Structure

```
rag-multi-expert/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app
│   │   ├── config.py               # Settings
│   │   ├── database.py             # SQLAlchemy setup
│   │   ├── dependencies.py         # Auth dependencies
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── project.py          # RAG models
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── rag_chat.py         # RAG streaming
│   │   │   ├── projects.py
│   │   │   ├── documents.py
│   │   │   └── providers.py
│   │   ├── services/
│   │   │   ├── vector_store.py     # ChromaDB
│   │   │   ├── embeddings.py       # Sentence transformers
│   │   │   ├── document_processor.py
│   │   │   ├── chunker.py          # Smart chunking
│   │   │   ├── llm_service.py      # Multi-provider
│   │   │   └── provider_factory.py
│   │   └── schemas/
│   │       ├── rag_chat.py
│   │       └── ...
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── RAGChat.jsx         # RAG interface
│   │   │   ├── Projects.jsx
│   │   │   ├── Documents.jsx
│   │   │   └── ...
│   │   └── stores/
│   │       ├── authStore.js
│   │       └── ...
│   └── package.json
├── data/
│   ├── documents/                  # Uploaded files
│   ├── chromadb/                   # Vector database
│   └── app.db                      # SQLite (dev)
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pytest` (backend), `npm test` (frontend)
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- **Python**: Follow PEP 8, use Black formatter
- **JavaScript**: Use ESLint + Prettier
- **Commits**: Conventional Commits format

### Areas for Contribution

- 🆕 **New LLM Providers**: Add support for more providers
- 🧪 **Testing**: Increase test coverage
- 📚 **Documentation**: Improve guides and examples
- 🐛 **Bug Fixes**: Check GitHub Issues
- 🎨 **UI/UX**: Enhance frontend experience

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) file for details.

---

## 💬 Support

- **GitHub Issues**: [https://github.com/yourusername/rag-multi-expert/issues](https://github.com/yourusername/rag-multi-expert/issues)

---

## 🗓️ Roadmap

### Q1 2025
- [ ] Multi-modal RAG (images, audio)
- [ ] Advanced reranking (Cohere, cross-encoder)
- [ ] Hybrid search (keyword + semantic)
- [ ] Graph RAG (Neo4j integration)

### Q2 2025
- [ ] Multi-tenant support
- [ ] Fine-tuning interface
- [ ] Custom embedding models
- [ ] Advanced analytics dashboard

### Q3 2025
- [ ] Mobile app (React Native)
- [ ] Voice interface
- [ ] Collaborative features
- [ ] Enterprise SSO

---

## 🙏 Acknowledgments

- **ChromaDB** - Vector database
- **LangChain** - RAG framework inspiration
- **Hugging Face** - Embedding models
- **FastAPI** - Modern Python web framework
- **React** - UI framework

---

**Built with ❤️ for Community**

⭐ Star us on GitHub if you find this useful!
