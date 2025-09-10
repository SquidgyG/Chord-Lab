/// <reference types="vite/client" />

declare module '*.css';
declare module '*.css?inline' {
  const content: string;
  export default content;
}

interface Window {
  webkitAudioContext: typeof AudioContext
}
