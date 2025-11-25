# Инструкция по настройке базы данных

## Шаг 1: Создание базы данных

1. Откройте **SQL Server Management Studio (SSMS)**
2. Подключитесь к вашему SQL Server: `DESKTOP-RTN1GJD\MSSQLSERVER01`
3. Откройте файл `createDatabase.sql` в SSMS
4. Выполните скрипт (F5)

Или выполните вручную через командную строку:
```bash
sqlcmd -S DESKTOP-RTN1GJD\MSSQLSERVER01 -i createDatabase.sql
```

## Шаг 2: Проверка подключения

Запустите тестовый скрипт:
```bash
cd pain-map
node testConnection.js
```

Если видите "Успешно! Текущее время:", значит подключение работает.

## Шаг 3: Запуск сервера

```bash
cd pain-map
node server.js
```

Сервер должен запуститься на `http://localhost:5000`

## Шаг 4: Запуск React приложения

В другом терминале:
```bash
cd pain-map
npm start
```

## Важные замечания:

1. **Учетные данные**: В файле `server.js` указаны:
   - User: `painmap_user`
   - Password: `Qwerty123!`
   - Server: `DESKTOP-RTN1GJD\MSSQLSERVER01`
   
   Если у вас другие учетные данные, измените их в `server.js`

2. **Windows Authentication**: Если используете Windows Authentication, измените `server.js`:
   ```javascript
   const config = {
     server: "DESKTOP-RTN1GJD\\MSSQLSERVER01",
     database: "PainMapDB",
     options: {
       encrypt: false,
       trustServerCertificate: true,
       trustedConnection: true  // Добавьте эту строку
     }
   };
   ```
   И уберите `user` и `password` из конфига.

3. **Проверка существования БД**: Если база данных уже существует, скрипт не будет создавать её заново.

