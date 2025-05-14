CREATE TABLE IF NOT EXISTS tbl_users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  profile_picture TEXT,
  cover_picture TEXT,
  bio TEXT,
  city VARCHAR(100),
  website VARCHAR(255),
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
  post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  caption TEXT NOT NULL,
  visibility VARCHAR(20) NOT NULL CHECK (visibility IN ('PUBLIC', 'PRIVATE', 'FRIENDS')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store post images
CREATE TABLE IF NOT EXISTS tbl_post_images (
  image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store post likes
CREATE TABLE IF NOT EXISTS tbl_post_likes (
  like_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (post_id, user_id) -- Ensures a user can like a post only once
);

-- Table to store comments
CREATE TABLE IF NOT EXISTS tbl_comments (
  comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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

-- Table for friend requests
CREATE TABLE IF NOT EXISTS tbl_friend_requests (
  request_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  UNIQUE (sender_id, receiver_id),
  CONSTRAINT no_self_request CHECK (sender_id != receiver_id)
);

-- Table for friendships (established mutual relationships)
CREATE TABLE IF NOT EXISTS tbl_friendships (
  friendship_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id_1 INT NOT NULL,
  user_id_2 INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id_1) REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id_2) REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  UNIQUE (user_id_1, user_id_2),
  CONSTRAINT no_self_friendship CHECK (user_id_1 != user_id_2),
  CONSTRAINT ordered_users CHECK (user_id_1 < user_id_2)
);

-- Index for faster queries on friend requests
CREATE INDEX idx_friend_requests_sender_receiver ON tbl_friend_requests(sender_id, receiver_id);
CREATE INDEX idx_friend_requests_status ON tbl_friend_requests(status);

-- Index for faster queries on friendships
CREATE INDEX idx_friendships_users ON tbl_friendships(user_id_1, user_id_2);


CREATE TABLE IF NOT EXISTS tbl_message_channels (
  channel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  is_group BOOLEAN DEFAULT FALSE,
  name VARCHAR(255), -- Only for group chats
  group_logo TEXT DEFAULT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (created_by) REFERENCES tbl_users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tbl_channel_participants (
  channel_id INT NOT NULL,
  user_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (channel_id, user_id),
  FOREIGN KEY (channel_id) REFERENCES tbl_message_channels(channel_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tbl_messages (
  message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  channel_id INT NOT NULL,
  sender_id INT NOT NULL,
  message TEXT NOT NULL,
  content_type VARCHAR(20) NOT NULL DEFAULT 'TEXT' CHECK (content_type IN ('TEXT', 'PHOTO')),
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,

  FOREIGN KEY (channel_id) REFERENCES tbl_message_channels(channel_id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES tbl_users(user_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS tbl_channel_seen_status (
  channel_id INT NOT NULL,
  user_id INT NOT NULL,
  seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (channel_id, user_id),
  FOREIGN KEY (channel_id) REFERENCES tbl_message_channels(channel_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_channel_id_sent_at ON tbl_messages(channel_id, sent_at);
CREATE INDEX idx_seen_status_channel_seen ON tbl_channel_seen_status(channel_id, seen_at);


CREATE TABLE IF NOT EXISTS tbl_saved_posts (  
  saved_post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES tbl_posts(post_id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, post_id) -- prevents a user from saving the same post multiple times
);

-- To quickly find all posts saved by a user
CREATE INDEX idx_saved_posts_user_id ON tbl_saved_posts(user_id);
-- To quickly find all users who saved a particular post
CREATE INDEX idx_saved_posts_post_id ON tbl_saved_posts(post_id);

CREATE TABLE IF NOT EXISTS tbl_notifications (
  notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (
    type IN (
      'LIKE', 
      'COMMENT', 
      'FRIEND_REQUEST', 
      'FRIEND_ACCEPTED', 
      'SYSTEM'
    )
  ),
  post_id INT,
  another_user_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (post_id) REFERENCES tbl_posts(post_id) ON DELETE CASCADE
);

-- For fast retrieval of notifications per user
CREATE INDEX idx_notifications_receiver_id ON tbl_notifications(user_id);
-- For checking unread notifications quickly
CREATE INDEX idx_notifications_is_read ON tbl_notifications(user_id, is_read);

CREATE TABLE IF NOT EXISTS tbl_stories (
  story_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  caption TEXT,
  media_url TEXT NOT NULL,
  media_type VARCHAR(10) CHECK (media_type IN ('IMAGE', 'VIDEO')) DEFAULT 'IMAGE',
  song_name TEXT,
  song_start_time DECIMAL, -- in seconds
  song_end_time DECIMAL,   -- in seconds
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 HOURS')
);

CREATE INDEX idx_stories_user_id ON tbl_stories(user_id);
CREATE INDEX idx_stories_expiry ON tbl_stories(expires_at);

CREATE TABLE IF NOT EXISTS tbl_user_status (
  user_id INT PRIMARY KEY REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
