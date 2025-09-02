declare module '*.json' {
  const value: {
    videos: Record<string, Array<{ title: string; url: string }>>;
    songs: Record<string, Record<string, Array<{ title: string; url: string }>>>;
    meta: Record<string, { artist: string; key: string }>;
  };
  export default value;
}
