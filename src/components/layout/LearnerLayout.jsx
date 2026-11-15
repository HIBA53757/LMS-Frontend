
function LearnerLayout({ user, children }) {
  return (
    <div className="learner-layout">
      <header>
        <h1>EduLearn</h1>

        <div>
          <p>Bienvenue, {user.name}</p>
          <span>Apprenant</span>
        </div>
      </header>

      <nav>
        <h2>Mon espace</h2>
        <p>Mes cours</p>
      </nav>

      <main>
        {children}
      </main>
    </div>
  );
}

export default LearnerLayout;
