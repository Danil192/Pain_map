const API_URL = "http://51.250.4.123:8001/AccessPoints";

// Отправка записи о боли
export const sendPainData = async (data) => {
  const res = await fetch(`${API_URL}/SaveUserPainRecord/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    if (!res.ok) {
      const err = await res.json();
      console.error("Ошибка от сервера:", err);
      throw new Error(err.detail?.[0]?.msg || "Ошибка при отправке боли");
    }
  }

  return await res.json();
};

// Получить справочник типов боли
export const getPainCharacteristics = async () => {
  const res = await fetch("http://51.250.4.123:8001/AccessPoints/GetPainCharacteristics/");
  if (!res.ok) throw new Error("Не удалось получить справочники");
  return await res.json();
};

// Получить все точки боли (по platform_id)
export const getPainPoints = async (platformId = 1) => {
  const res = await fetch(`${API_URL}/GetPainPoints/?platform_id=${platformId}`);
  if (!res.ok) throw new Error("Не удалось загрузить точки боли");
  return await res.json();
};

// Получить записи боли пользователя
export const getUserPainRecords = async (userId = 1) => {
  const res = await fetch(`http://51.250.4.123:8001/AccessPoints/GetUserPainRecords/?user_id=${userId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail?.[0]?.msg || "Ошибка при получении записей боли");
  }
  return await res.json();
};



