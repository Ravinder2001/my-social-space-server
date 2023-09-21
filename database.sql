CREATE TABLE users(
    id VARCHAR(255) NOT NULL Primary key,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN NOT NULL DEFAULT true,
    job VARCHAR(30),
    location VARCHAR(30),
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
    status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (admin) REFERENCES users(id) ON DELETE CASCADE
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
    seen_at TIMESTAMP DEFAULT null,
    status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (room_id) REFERENCES message_room(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_online_status(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('online', 'offline','typing')),
    timestamp TIMESTAMP NOT NULL,
    room_id VARCHAR(255),
    FOREIGN KEY (room_id) REFERENCES message_room(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
