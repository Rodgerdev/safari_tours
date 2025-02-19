USE Safaris;

CREATE TABLE Users (
    id VARCHAR(36) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    isAdmin INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    isEmailSent INT DEFAULT 0,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

