CREATE TABLE users(
    id VARCHAR(255) NOT NULL Primary key,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN NOT NULL DEFAULT true,
    job VARCHAR(30),
    location VARCHAR(30)
);

CREATE TABLE friends(
      id SERIAL Primary key,
      user1_id VARCHAR(255) NOT NULL,
      user2_id VARCHAR(255) NOT NULL,
      status BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user1_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(user2_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts(
    id VARCHAR(255) NOT NULL Primary key,
    user_id VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    upload_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upload_till TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE post_images(
    id SERIAL Primary key,
    post_id VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id SERIAL Primary key,
    post_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE likes(
    id SERIAL Primary key,
    post_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE profile_pictures(
    id SERIAL primary key,
    user_id VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE friend_requests (
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(255) NOT NULL,
    receiver_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE post_privacy (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL UNIQUE,
    comment_allowed BOOLEAN DEFAULT true,
    like_allowed BOOLEAN DEFAULT true,
    share_allowed BOOLEAN DEFAULT true,
    visibility VARCHAR(10) DEFAULT 'public' CHECK (visibility IN ('public', 'friends', 'private')),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE message_room(
    id VARCHAR(255) PRIMARY KEY,
    type INTEGER NOT NULL,
    name VARCHAR(50),
    image_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE room_members(
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    role VARCHAR(10),
    isMessageAllowed BOOLEAN,
    status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (room_id) REFERENCES message_room(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    sender_id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    content_type VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    seen_at TIMESTAMP,
    status BOOLEAN DEFAULT TRUE,
    isEdited BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (room_id) REFERENCES message_room(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_online_status(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT true,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_socket (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    socket_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_socket_user_id_unique UNIQUE (user_id)
);

CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    deleted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES message_room(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_room_user_constraint UNIQUE (room_id, user_id)
);
CREATE TABLE message_seen (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    seen_at VARCHAR(100),
    message_id INTEGER,
    FOREIGN KEY (room_id) REFERENCES message_room(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
);
CREATE TABLE story (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    song VARCHAR(255) NOT NULL,
    start_time INTEGER,
    end_time INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expire_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    message TEXT,
    image_url VARCHAR(1000) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
