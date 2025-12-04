// env.d.ts
/// <reference types="vite/client" /> 
// Обязательная строка, чтобы подключить типы Vite

interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string;
  // добавляй сюда остальные переменные позже
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
