const API_URL = "http://51.250.4.123:8001/AccessPoints";

// Отправка координат точки боли
export const savePainPoint = async (data) => {
  const res = await fetch(`${API_URL}/SavePainPoints/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Ошибка от сервера:", err);
    throw new Error(err.detail?.[0]?.msg || "Ошибка при сохранении точки боли");
  }

  return await res.json();
};

// Отправка записи о боли пользователя
export const saveUserPainRecord = async (data) => {
  const res = await fetch(`${API_URL}/SaveUserPainRecord/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Ошибка от сервера:", err);
    throw new Error(err.detail?.[0]?.msg || "Ошибка при отправке записи боли");
  }

  return await res.json();
};

// Получение справочников (характеристики боли и прочее)
export const getPainCharacteristics = async () => {
  const res = await fetch(`${API_URL}/GetPainCharacteristics/`);
  if (!res.ok) throw new Error("Не удалось получить справочники");
  return await res.json();
};

// Загрузка всех точек боли по платформе (по умолчанию 1)
export const getPainPoints = async (platformId = 1) => {
  const res = await fetch(`${API_URL}/GetPainPoints/?platform_id=${platformId}`);
  if (!res.ok) throw new Error("Не удалось загрузить точки боли");
  return await res.json();
};

// Получение записей боли пользователя
export const getUserPainRecords = async (userId = 1) => {
  const res = await fetch(`${API_URL}/GetUserPainRecords/?user_id=${userId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail?.[0]?.msg || "Ошибка при получении записей боли");
  }
  return await res.json();
};
