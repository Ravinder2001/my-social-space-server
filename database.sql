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
  post_visibility VARCHAR(50) DEFAULT 'PUBLIC' CHECK (post_visibility IN ('PUBLIC', 'PRIVATE', 'FRIENDS')),
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

CREATE TABLE IF NOT EXISTS tbl_files_trash(
  tash_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  file TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_friends (
  friendship_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user1_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  user2_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user1_id, user2_id),
  CHECK (user1_id <> user2_id) -- Prevent self-friendship
);

CREATE TABLE IF NOT EXISTS tbl_friend_requests (
  request_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  receiver_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (sender_id, receiver_id),
  CHECK (sender_id <> receiver_id) -- Prevent sending requests to oneself
);

CREATE TABLE IF NOT EXISTS tbl_blocked_users (
  block_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  blocked_user_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, blocked_user_id),
  CHECK (user_id <> blocked_user_id) -- Prevent self-blocking
);



