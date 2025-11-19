-- Migration: create database and tables for Fluidez Activa
-- Charset and collation for full unicode support
CREATE DATABASE IF NOT EXISTS `fluidez_activa`
  DEFAULT CHARACTER SET = utf8mb4
  DEFAULT COLLATE = utf8mb4_unicode_ci;

USE `fluidez_activa`;

-- Users table: store basic user info and password reset fields
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token` VARCHAR(255) DEFAULT NULL,
  `reset_expires` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Media files table: references users (optional), stores metadata and a storage path
CREATE TABLE IF NOT EXISTS `media_files` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL,
  `original_filename` VARCHAR(512) NOT NULL,
  `storage_path` VARCHAR(1024) NOT NULL,
  `mime_type` VARCHAR(255) DEFAULT NULL,
  `size` BIGINT DEFAULT NULL,
  `duration_seconds` DECIMAL(10,3) DEFAULT NULL,
  `transcript` LONGTEXT DEFAULT NULL,
  `metadata` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_media_user` (`user_id`),
  CONSTRAINT `fk_media_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
