
function AdminLayout({ currentView, onNavigate, children }) {
  return (
    <div className="admin-layout">
      <header>
        <h1>EduLearn - Administration</h1>
        <nav>
          <button onClick={() => onNavigate("users")}>
            Utilisateurs
          </button>

          <button onClick={() => onNavigate("courses")}>
            Catalogue des cours
          </button>
        </nav>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
