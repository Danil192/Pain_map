const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "painmap_user",
  password: "Qwerty123!",
  server: "DESKTOP-RTN1GJD\\MSSQLSERVER01",
  database: "PainMapDB",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Секрет для JWT
const JWT_SECRET = "super_secret_key"; 

// ======================== БОЛЬ ========================
app.post("/pain", async (req, res) => {
  const data = req.body;

  try {
    await sql.connect(config);

    // Тут вставка по твоей структуре — адаптируй под конкретные таблицы
    await sql.query`
      INSERT INTO Запись_о_боли (
        id_точки_боли, id_интенсивность_боли, id_характер_боли, id_время_суток,
        id_связь_с_положением_тела, id_связь_с_дыханием, id_связь_со_стрессом, id_связь_с_физической_нагрузкой,
        Дата_и_время_создания_записи, id_пользователь
      )
      VALUES (
        ${data.pointId}, ${data.intensityId}, ${data.characterId}, ${data.timeOfDayId},
        ${data.triggers.position ? 1 : null}, ${data.triggers.breath ? 1 : null}, 
        ${data.triggers.stress ? 1 : null}, ${data.triggers.physical ? 1 : null},
        ${new Date()}, ${data.userId || null}
      )
    `;

    res.status(201).json({ message: "Боль сохранена" });
  } catch (error) {
    console.error("Ошибка при сохранении боли:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});


// ======================== РЕГИСТРАЦИЯ ========================
app.post("/register", async (req, res) => {
  const { фамилия, имя, отчество, email, пароль } = req.body;

  if (!фамилия || !имя || !email || !пароль) {
    return res.status(400).json({ error: "Заполните все обязательные поля (фамилия, имя, email, пароль)." });
  }

  try {
    await sql.connect(config);

    const existing = await sql.query`
      SELECT * FROM Пользователи WHERE Email = ${email}
    `;
    if (existing.recordset.length > 0) {
      return res.status(409).json({ error: "Email уже зарегистрирован." });
    }

    const hashed = await bcrypt.hash(пароль, 10);
    const now = new Date();

    await sql.query`
      INSERT INTO Пользователи (Фамилия, Имя, Отчество, Email, Пароль, Дата_регистрации, Роль)
      VALUES (${фамилия}, ${имя}, ${отчество}, ${email}, ${hashed}, ${now}, 'user')
    `;

    res.status(201).json({ message: "Регистрация успешна." });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ error: "Ошибка сервера." });
  }
});

// ======================== ЛОГИН ========================
app.post("/login", async (req, res) => {
  const { email, пароль } = req.body;

  if (!email || !пароль) {
    return res.status(400).json({ error: "Введите email и пароль." });
  }

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT * FROM Пользователи WHERE Email = ${email}
    `;

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: "Неверный email или пароль." });
    }

    const match = await bcrypt.compare(пароль, user.Пароль);
    if (!match) {
      return res.status(401).json({ error: "Неверный email или пароль." });
    }

    // Формируем JWT
    const token = jwt.sign(
      { id: user.id, email: user.Email, имя: user.Имя, роль: user.Роль },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Вход выполнен", token });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ error: "Ошибка сервера." });
  }
});

// ======================== ОТПРАВКА ДАННЫХ ВРАЧУ ========================
app.post("/send-to-doctor", async (req, res) => {
  const { doctor_id, doctor_name, doctor_specialty, pain_history, sent_at } = req.body;

  if (!doctor_id || !pain_history || !Array.isArray(pain_history)) {
    return res.status(400).json({ error: "Неверный формат данных. Требуются: doctor_id, pain_history (массив)" });
  }

  try {
    // Здесь можно сохранить данные в БД или отправить уведомление врачу
    // Для демо-версии просто логируем и возвращаем успех
    
    console.log("=== ОТПРАВКА ДАННЫХ ВРАЧУ ===");
    console.log("Врач ID:", doctor_id);
    console.log("Врач:", doctor_name, `(${doctor_specialty})`);
    console.log("Количество записей:", pain_history.length);
    console.log("Данные:", JSON.stringify(req.body, null, 2));
    console.log("Время отправки:", sent_at);
    console.log("==============================");

    // В реальной системе здесь бы было:
    // - Сохранение в БД в таблицу "Отправки_врачам"
    // - Отправка уведомления врачу (email, push, и т.д.)
    // - Логирование в систему уведомлений

    res.status(200).json({ 
      message: "Данные успешно отправлены врачу",
      doctor_id: doctor_id,
      records_count: pain_history.length,
      sent_at: sent_at || new Date().toISOString()
    });
  } catch (error) {
    console.error("Ошибка при отправке данных врачу:", error);
    res.status(500).json({ error: "Ошибка сервера при отправке данных" });
  }
});

// ======================== СТАРТ ========================
app.listen(5000, () => {
  console.log("Сервер слушает на http://localhost:5000");
});
