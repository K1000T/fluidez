-- Add signup fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS country VARCHAR(100),
ADD COLUMN IF NOT EXISTS birthdate DATE,
ADD COLUMN IF NOT EXISTS gender VARCHAR(50);
