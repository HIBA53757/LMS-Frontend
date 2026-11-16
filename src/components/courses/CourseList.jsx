
import { useState } from "react";

function CourseList({ courses, loading, error, onSelectCourse, onAddCourse }) {
  const [category, setCategory] = useState("all");

  const categories = [...new Set(courses.map((course) => course.category))];

  const filteredCourses = courses.filter((course) => {
    return category === "all" || course.category === category;
  });

  if (loading) return <p>Chargement des cours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Catalogue des cours</h2>

      <button onClick={onAddCourse}>Ajouter un cours</button>

      <div>
        <label htmlFor="category">Filtrer par catégorie :</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">Toutes les catégories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <p>Aucun cours disponible.</p>
      ) : (
        filteredCourses.map((course) => (
          <article key={course._id}>
            <h3>{course.title}</h3>
            <p>Catégorie : {course.category}</p>
            <p>Niveau : {course.level}</p>
            <p>Statut : {course.status}</p>

            <button onClick={() => onSelectCourse(course._id)}>
              Voir les détails
            </button>
          </article>
        ))
      )}
    </section>
  );
}

export default CourseList;
