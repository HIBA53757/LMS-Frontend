
function AppShell({ user, onLogout, children }) {
  return (
    <div className="app-shell">
      <header>
        <h1>EduLearn</h1>

        <div>
          <span>{user.name}</span>
          <span> — {user.role}</span>

          <button onClick={onLogout}>
            Se déconnecter
          </button>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}

export default AppShell
