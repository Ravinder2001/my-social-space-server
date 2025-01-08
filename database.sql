CREATE TABLE IF NOT EXISTS tbl_users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,                      -- Unique identifier for each user
  username VARCHAR(30) UNIQUE NOT NULL,           -- Unique username (30 characters max)
  email VARCHAR(255) UNIQUE NOT NULL,             -- User email (must be unique)
  password VARCHAR(255) NOT NULL,            -- Hashed password for security
  full_name VARCHAR(100) NOT NULL,                         -- User's full name
  profile_picture TEXT,                       -- URL for the profile picture
  bio TEXT,                                       -- Short user bio or description
  date_of_birth DATE,                             -- User's date of birth
  gender VARCHAR(10) CHECK (gender IN ('M', 'F', 'O')), -- Optional gender field
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_posts (
  post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  caption TEXT NOT NULL,
  post_visibility VARCHAR(50) DEFAULT 'public' CHECK (post_visibility IN ('public', 'private', 'friends')),
  allow_comments BOOLEAN DEFAULT TRUE,
  allow_likes BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_post_images (
  image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INT NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_scheduled_posts (
  schedule_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INT NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  scheduledDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_post_tags (
  tag_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INT NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  tag_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_post_comments (
  comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INT NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  comment_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_post_likes (
  like_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INT NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


