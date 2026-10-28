/// <reference types="vite/client" />
interface Window {
  __saariBootDeadline?: ReturnType<typeof setTimeout>;
}
