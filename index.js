const express = require("express");
const cors = require("cors");

// dotenv 로드 (.env 파일이 없어도 에러 없이 진행)
try {
  require("dotenv").config();
} catch (e) {
  // dotenv 로드 실패해도 무시
}

const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어
app.use(cors()); // 모든 origin 허용
app.use(express.json());

// 초기 Todo 데이터 (메모리 저장)
let todos = [
  { id: 1, text: "Express 서버 배포하기", completed: false },
  { id: 2, text: "프론트엔드와 API 연동하기", completed: false },
  { id: 3, text: "배포 완료 후 테스트하기", completed: true },
];

let nextId = 4;

// GET /api/todos - 전체 목록 조회
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST /api/todos - 새로운 Todo 추가
app.post("/api/todos", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  const newTodo = {
    id: nextId++,
    text,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PATCH /api/todos/:id - 완료 상태 토글
app.patch("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE /api/todos/:id - 특정 Todo 삭제
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deleted = todos.splice(index, 1)[0];
  res.json(deleted);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
