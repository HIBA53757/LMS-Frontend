import { useState } from "react";
import "./App.css";

import Login from "./components/auth/Login";
import AppShell from "./components/layout/AppShell";
import AdminLayout from "./components/layout/AdminLayout";
import LearnerLayout from "./components/layout/LearnerLayout";
import ProtectedView from "./components/common/ProtectedView";

import CourseList from "./components/courses/CourseList";
import CourseDetails from "./components/courses/CourseDetails";
import CourseForm from "./components/courses/CourseForm";
import MyCourses from "./components/learner/MyCourses";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  publishCourse,
  unpublishCourse,
  archiveCourse,
} from "./services/api";

function App() {
  const [session, setSession] = useState(null);
  const [currentView, setCurrentView] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(data) {
    setSession({
      token: data.token,
      user: data.data.user,
    });
  }

  function handleLogout() {
    setSession(null);
    setCurrentView("");
    setCourses([]);
    setSelectedCourse(null);
    setShowForm(false);
    setEditingCourse(null);
    setError("");
  }

  function handleUnauthorized() {
    handleLogout();
  }

  async function handleNavigate(view) {
    setCurrentView(view);
    setError("");
    setSelectedCourse(null);
    setShowForm(false);
    setEditingCourse(null);

    if (view === "courses") {
      setLoading(true);

      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        if (err.status === 401) {
          handleUnauthorized();
        } else if (err.status === 403) {
          setError("Accès refusé.");
        } else {
          setError(err.message);
        }
      }

      setLoading(false);
    }
  }

  async function handleSelectCourse(id) {
    setError("");

    try {
      const course = await getCourseById(id);
      setSelectedCourse(course);
    } catch (err) {
      if (err.status === 401) {
        handleUnauthorized();
      } else if (err.status === 403) {
        setError("Accès refusé.");
      } else {
        setError(err.message);
      }
    }
  }

  function handleAddCourse() {
    setEditingCourse(null);
    setShowForm(true);
    setSelectedCourse(null);
    setError("");
  }

  function handleEditCourse() {
    setEditingCourse(selectedCourse);
    setShowForm(true);
    setError("");
  }

  async function handleSaveCourse(courseData) {
    setError("");

    try {
      let savedCourse;

      if (editingCourse) {
        savedCourse = await updateCourse(
          editingCourse._id,
          courseData,
          session.token,
        );
      } else {
        savedCourse = await createCourse(courseData, session.token);
      }

      setSelectedCourse(savedCourse);
      setShowForm(false);
      setEditingCourse(null);

      const updatedCourses = await getCourses();
      setCourses(updatedCourses);
    } catch (err) {
      if (err.status === 401) {
        handleUnauthorized();
      } else if (err.status === 403) {
        setError("Accès refusé : vous ne pouvez pas effectuer cette action.");
      } else {
        setError(err.message);
      }
    }
  }

  async function handleCourseAction(action) {
    const confirmed = window.confirm("Confirmer cette action ?");

    if (!confirmed) return;

    setError("");

    try {
      let updatedCourse;

      if (action === "publish") {
        updatedCourse = await publishCourse(selectedCourse._id, session.token);
      }

      if (action === "unpublish") {
        updatedCourse = await unpublishCourse(
          selectedCourse._id,
          session.token,
        );
      }

      if (action === "archive") {
        updatedCourse = await archiveCourse(selectedCourse._id, session.token);
      }

      setSelectedCourse(updatedCourse);

      const updatedCourses = await getCourses();
      setCourses(updatedCourses);
    } catch (err) {
      if (err.status === 401) {
        handleUnauthorized();
      } else if (err.status === 403) {
        setError("Accès refusé : vous ne pouvez pas effectuer cette action.");
      } else {
        setError(err.message);
      }
    }
  }

  if (!session) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AppShell user={session.user} onLogout={handleLogout}>
      {session.user.role === "admin" && (
        <ProtectedView session={session} allowedRoles={["admin"]}>
          <AdminLayout currentView={currentView} onNavigate={handleNavigate}>
            {currentView === "courses" && (
              <>
                {error && <p>{error}</p>}

                {showForm ? (
                  <CourseForm
                    initialData={editingCourse}
                    onSubmit={handleSaveCourse}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingCourse(null);
                      setError("");
                    }}
                    error={error}
                  />
                ) : (
                  <>
                    <CourseList
                      courses={courses}
                      loading={loading}
                      error={error}
                      onSelectCourse={handleSelectCourse}
                      onAddCourse={handleAddCourse}
                    />

                    {selectedCourse && (
                      <CourseDetails
                        course={selectedCourse}
                        onEdit={handleEditCourse}
                        onPublish={() => handleCourseAction("publish")}
                        onUnpublish={() => handleCourseAction("unpublish")}
                        onArchive={() => handleCourseAction("archive")}
                      />
                    )}
                  </>
                )}
              </>
            )}

            {currentView === "users" && (
              <p>
                La gestion des utilisateurs nécessite des routes backend qui ne
                sont pas disponibles actuellement.
              </p>
            )}
          </AdminLayout>
        </ProtectedView>
      )}

      {session.user.role === "learner" && (
        <ProtectedView session={session} allowedRoles={["learner"]}>
          <LearnerLayout user={session.user}>
            <MyCourses
              token={session.token}
              onUnauthorized={handleUnauthorized}
            />
          </LearnerLayout>
        </ProtectedView>
      )}
    </AppShell>
  );
}

export default App;
