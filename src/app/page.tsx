export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App 🚀</h1>
      <p className="text-muted-foreground mb-6">
        Manage students, billing, and more — all in one place.
      </p>
      <a
        href="/dashboard"
        className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90"
      >
        Go to Dashboard
      </a>
    </main>
  )
}
