CREATE TABLE IF NOT EXISTS tbl_users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  profile_picture TEXT,
  bio TEXT,
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('M', 'F', 'O')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_files_trash(
  tash_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  file TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store post details
CREATE TABLE IF NOT EXISTS tbl_posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
    caption TEXT NOT NULL,
    visibility VARCHAR(20) NOT NULL CHECK (visibility IN ('PUBLIC', 'PRIVATE', 'FRIENDS')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store post images
CREATE TABLE IF NOT EXISTS tbl_post_images (
    image_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store post likes
CREATE TABLE IF NOT EXISTS tbl_post_likes (
    like_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (post_id, user_id) -- Ensures a user can like a post only once
);

-- Table to store comments
CREATE TABLE IF NOT EXISTS tbl_comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster queries
CREATE INDEX idx_post_images_post_id ON tbl_post_images(post_id);
CREATE INDEX idx_post_likes_post_id ON tbl_post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON tbl_post_likes(user_id);
CREATE INDEX idx_comments_post_id ON tbl_comments(post_id);
CREATE INDEX idx_comments_user_id ON tbl_comments(user_id);