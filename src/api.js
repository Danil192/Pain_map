const API_URL = "http://localhost:5000/api"; 

export async function sendPainData(data) {
  try {
    const response = await fetch(`${API_URL}/pain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке на сервер");
    }

    const result = await response.json();
    console.log("Ответ от сервера:", result);
    return result;
  } catch (error) {
    console.error("Ошибка API:", error);
    throw error;
  }
}

export async function registerUser(userData) {
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Ошибка регистрации");
  }

  return await response.json();
}
