-- Additional migration: user progress and user texts/submissions
USE `fluidez_activa`;

-- Table to track user progress (per user, per activity/module)
CREATE TABLE IF NOT EXISTS `user_progress` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `module` VARCHAR(255) NOT NULL,
  `progress` DECIMAL(5,2) DEFAULT 0.00,
  `details` JSON DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_progress_user` (`user_id`),
  CONSTRAINT `fk_progress_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table to store user-submitted texts (diaries, answers, transcripts, etc.)
CREATE TABLE IF NOT EXISTS `user_texts` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `body` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_text_user` (`user_id`),
  CONSTRAINT `fk_text_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions table for server-side session management
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `session_token` VARCHAR(128) NOT NULL,
  `user_id` INT NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_sessions_token` (`session_token`),
  KEY `idx_sessions_user` (`user_id`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
