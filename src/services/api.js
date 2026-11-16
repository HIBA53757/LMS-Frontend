
const API_URL = "http://localhost:3000/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Une erreur est survenue.");
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function loginUser(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getCourses() {
  const data = await request("/courses");
  return data.data.courses;
}

export async function getCourseById(id) {
  const data = await request(`/courses/${id}`);
  return data.data.course;
}

export async function createCourse(course, token) {
  const data = await request("/courses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  });

  return data.data.course;
}

export async function updateCourse(id, course, token) {
  const data = await request(`/courses/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  });

  return data.data.course;
}

export async function publishCourse(id, token) {
  const data = await request(`/courses/${id}/publish`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.course;
}

export async function unpublishCourse(id, token) {
  const data = await request(`/courses/${id}/unpublish`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.course;
}

export async function archiveCourse(id, token) {
  const data = await request(`/courses/${id}/archived`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.course;
}

export async function getMyEnrollments(token) {
  const data = await request("/enrollments/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.enrollments;
}
