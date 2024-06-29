USE Safaris;
GO
CREATE OR ALTER PROCEDURE getUserById
    @id VARCHAR(36)
AS
BEGIN
    SELECT * FROM Users WHERE id = @id AND isDeleted = 0;
END;

