const sql = require("mssql");

const config = {
  server: "DESKTOP-RTN1GJD\\MSSQLSERVERR", 
  database: "PainMapDB",
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};

async function test() {
  try {
    console.log("Пробуем подключиться к базе...");
    await sql.connect(config);
    const result = await sql.query`SELECT GETDATE() AS Время`;
    console.log("Успешно! Текущее время:", result.recordset[0].Время);
    sql.close();
  } catch (err) {
    console.error("Ошибка подключения:", err);
  }
}

test();
