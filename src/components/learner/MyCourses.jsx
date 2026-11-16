
import { useState } from "react";
import { getMyEnrollments } from "../../services/api";

function MyCourses({ token, onUnauthorized }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function handleLoadCourses() {
    setLoading(true);
    setError("");

    try {
      const data = await getMyEnrollments(token);
      setCourses(data);
      setLoaded(true);
    } catch (err) {
      if (err.status === 401) {
        onUnauthorized();
      } else {
        setError(
          err.status === 403 ? "Accès refusé." : err.message
        );
      }
    }

    setLoading(false);
  }

  return (
    <section>
      <h2>Mes cours</h2>

      <button onClick={handleLoadCourses} disabled={loading}>
        {loading ? "Chargement..." : "Afficher mes cours"}
      </button>

      {error && <p>{error}</p>}

      {loaded && courses.length === 0 && (
        <p>Vous n'êtes inscrit à aucun cours.</p>
      )}

      {courses.map((enrollment) => (
        <article key={enrollment._id}>
          <h3>{enrollment.course?.title}</h3>
          <p>{enrollment.course?.description}</p>
          <p>Statut : {enrollment.status}</p>
        </article>
      ))}
    </section>
  );
}

export default MyCourses;
