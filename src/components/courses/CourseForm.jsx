
import { useState } from "react";

function CourseForm({ initialData, onSubmit, onCancel, error }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [level, setLevel] = useState(initialData?.level || "beginner");
  const [duration, setDuration] = useState(
    initialData?.estimatedDuration || ""
  );
  const [objectives, setObjectives] = useState(
    initialData?.objectives?.join("\n") || ""
  );

  function handleSubmit(event) {
    event.preventDefault();

    const course = {
      title,
      description,
      category,
      level,
      estimatedDuration: Number(duration),
      objectives: objectives.split("\n").filter((item) => item.trim() !== ""),
    };

    onSubmit(course);
  }

  return (
    <section>
      <h2>{initialData ? "Modifier le cours" : "Ajouter un cours"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Catégorie</label>
          <input
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="level">Niveau</label>
          <select
            id="level"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          >
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>
        </div>

        <div>
          <label htmlFor="duration">Durée estimée en heures</label>
          <input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="objectives">Objectifs (un par ligne)</label>
          <textarea
            id="objectives"
            value={objectives}
            onChange={(event) => setObjectives(event.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      </form>
    </section>
  );
}

export default CourseForm;
