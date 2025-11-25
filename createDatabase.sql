-- Создание базы данных PainMapDB
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'PainMapDB')
BEGIN
    CREATE DATABASE PainMapDB;
    PRINT 'База данных PainMapDB создана успешно.';
END
ELSE
BEGIN
    PRINT 'База данных PainMapDB уже существует.';
END
GO

-- Использование базы данных
USE PainMapDB;
GO

-- Создание таблицы Пользователи
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Пользователи]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Пользователи] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [Фамилия] NVARCHAR(100) NOT NULL,
        [Имя] NVARCHAR(100) NOT NULL,
        [Отчество] NVARCHAR(100) NULL,
        [Email] NVARCHAR(255) NOT NULL UNIQUE,
        [Пароль] NVARCHAR(255) NOT NULL,
        [Дата_регистрации] DATETIME NOT NULL DEFAULT GETDATE(),
        [Роль] NVARCHAR(50) NOT NULL DEFAULT 'user'
    );
    PRINT 'Таблица Пользователи создана успешно.';
END
ELSE
BEGIN
    PRINT 'Таблица Пользователи уже существует.';
END
GO

-- Создание пользователя для подключения (если нужно)
-- ВАЖНО: Замените 'painmap_user' и 'Qwerty123!' на свои учетные данные
-- или используйте Windows Authentication

-- Если используете SQL Server Authentication, раскомментируйте следующее:
/*
USE [master];
GO

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'painmap_user')
BEGIN
    CREATE LOGIN [painmap_user] WITH PASSWORD = 'Qwerty123!';
    PRINT 'Логин painmap_user создан успешно.';
END
GO

USE PainMapDB;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'painmap_user')
BEGIN
    CREATE USER [painmap_user] FOR LOGIN [painmap_user];
    ALTER ROLE db_owner ADD MEMBER [painmap_user];
    PRINT 'Пользователь painmap_user создан и добавлен в роль db_owner.';
END
GO
*/

PRINT 'Скрипт выполнен успешно!';
GO

