
import { useState } from "react";
import { loginUser } from "../../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ email, password });
      setPassword("");
      onLogin(data);
    } catch (err) {
      setError(err.message);
      setPassword("");
    }

    setLoading(false);
  }

  return (
    <main>
      <h1>EduLearn LMS</h1>
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}

export default Login;
