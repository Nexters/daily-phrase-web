export default function HomePage() {
  return (
    <main className="pt-10 px-4">
      <h1 className="mb-1 text-2xl font-semibold">매일 글귀</h1>
      <p>좋은 시, 좋은 명언, 좋은 말 모음</p>

      <div className="mt-2 flex flex-col gap-1">
        <a href="/phrase-web/1">/phrase-web/1</a>
        <a href="/phrase-webview/1">/phrase-webview/1</a>
      </div>
    </main>
  );
}
