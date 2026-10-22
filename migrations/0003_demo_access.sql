-- Demonstrações de 24 horas para contas descartáveis, sem pedidos pagos.
ALTER TABLE users ADD COLUMN demo_until TEXT;
CREATE TABLE IF NOT EXISTS demo_access_grants (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_demo_grants_user ON demo_access_grants(user_id,created_at DESC);
