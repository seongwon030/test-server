# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

```bash
npm install   # 의존성 설치
npm start     # 서버 실행 (기본 포트: 8080)
```

## Architecture

웹 배포 세미나용 Todo API 서버. Node.js + Express 기반, 메모리(배열) 저장 방식.

**API Endpoints** (`/api` prefix):
- `GET /api/todos` - 전체 목록 조회
- `POST /api/todos` - Todo 추가 (body: `{ "text": "..." }`)
- `PATCH /api/todos/:id` - 완료 상태 토글
- `DELETE /api/todos/:id` - Todo 삭제
