CREATE TABLE IF NOT EXISTS tbl_users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,                      -- Unique identifier for each user
  username VARCHAR(30) UNIQUE NOT NULL,           -- Unique username (30 characters max)
  email VARCHAR(255) UNIQUE NOT NULL,             -- User email (must be unique)
  password VARCHAR(255) NOT NULL,            -- Hashed password for security
  full_name VARCHAR(100) NOT NULL,                         -- User's full name
  profile_picture TEXT,                       -- URL for the profile picture
  bio TEXT,                                       -- Short user bio or description
  date_of_birth DATE,                             -- User's date of birth
  gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')), -- Optional gender field
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
