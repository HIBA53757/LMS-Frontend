
function CourseDetails({
  course,
  onEdit,
  onPublish,
  onUnpublish,
  onArchive,
}) {
  if (!course) {
    return <p>Sélectionnez un cours.</p>;
  }

  return (
    <section>
      <h2>{course.title}</h2>

      <p>{course.description}</p>
      <p>Catégorie : {course.category}</p>
      <p>Niveau : {course.level}</p>
      <p>Statut : {course.status}</p>
      <p>Durée : {course.estimatedDuration} heures</p>

      <h3>Objectifs</h3>

      {course.objectives && course.objectives.length > 0 ? (
        <ul>
          {course.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun objectif disponible.</p>
      )}

      <button onClick={onEdit}>Modifier</button>

      {course.status === "draft" && (
        <button onClick={onPublish}>Publier</button>
      )}

      {course.status === "published" && (
        <>
          <button onClick={onUnpublish}>Dépublier</button>
          <button onClick={onArchive}>Archiver</button>
        </>
      )}
    </section>
  );
}

export default CourseDetails;
