const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Настройки подключения к MSSQL
const config = {
  server: "DESKTOP-RTN1GJD\\MSSQLSERVERR",
  database: "PainMapDB",
  options: {
    trustServerCertificate: true
  }
};

// Секрет для JWT
const JWT_SECRET = "super_secret_key"; // можешь заменить на свой

// ======================== РЕГИСТРАЦИЯ ========================
app.post("/register", async (req, res) => {
  const { фамилия, имя, отчество, email, пароль } = req.body;

  if (!фамилия || !имя || !email || !пароль) {
    return res.status(400).json({ error: "Заполните все обязательные поля." });
  }

  try {
    await sql.connect(config);

    const existing = await sql.query`
      SELECT * FROM Пользователь WHERE Email = ${email}
    `;
    if (existing.recordset.length > 0) {
      return res.status(409).json({ error: "Email уже зарегистрирован." });
    }

    const hashed = await bcrypt.hash(пароль, 10);
    const now = new Date();

    await sql.query`
      INSERT INTO Пользователь (Фамилия, Имя, Отчество, Email, Пароль, Дата_регистрации, Роль)
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
      SELECT * FROM Пользователь WHERE Email = ${email}
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

// ======================== СТАРТ ========================
app.listen(5000, () => {
  console.log("Сервер слушает на http://localhost:5000");
});
