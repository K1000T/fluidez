-- Grant minimal privileges to the 'app' user for local development
-- Edit the password literal below if you prefer a different password.

CREATE DATABASE IF NOT EXISTS `fluidez_activa` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create / update app user (localhost only). Change 'apppw' if you want another password.
CREATE USER IF NOT EXISTS 'app'@'localhost' IDENTIFIED BY 'apppw';
ALTER USER 'app'@'localhost' IDENTIFIED BY 'apppw';

-- Grant only the privileges the application needs
GRANT SELECT, INSERT, UPDATE, DELETE ON `fluidez_activa`.* TO 'app'@'localhost';

FLUSH PRIVILEGES;

-- You can change 'localhost' to '%' if you need remote access from other hosts:
-- CREATE USER IF NOT EXISTS 'app'@'%' IDENTIFIED BY 'apppw';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON `fluidez_activa`.* TO 'app'@'%';
