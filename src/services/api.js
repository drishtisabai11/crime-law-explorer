const API_BASE_URL = "/api";

const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong"
    );

    error.status = response.status;

    throw error;
  }

  return data;
};

export const registerUser = async (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const getCurrentUser = async (token) => {
  return apiRequest("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ARCHIVE

export const getSavedCases = async (token) => {
  return apiRequest("/archive", {
    method: "GET",
    headers: getAuthHeaders(token),
  });
};

export const saveCase = async (token, caseId) => {
  return apiRequest("/archive", {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      caseId,
    }),
  });
};

export const removeSavedCase = async (token, caseId) => {
  return apiRequest(`/archive/${caseId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
};

