CREATE TABLE IF NOT EXISTS key_words (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255),
    category VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(20),
    role VARCHAR(50) DEFAULT user,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    got_license BOOLEAN,
    password VARCHAR(255) NOT NULL,
    profile_desc TEXT,
    address VARCHAR(255),
    profile_picture_path VARCHAR(255),
    cv_path VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    contact VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    num_siret VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS advertisements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    views INT,
    img_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    companies_id INT,
    FOREIGN KEY (companies_id) REFERENCES companies (id)
);

CREATE TABLE IF NOT EXISTS advertisement_keywords (
    advertisement_id INT,
    keyword_id INT,
    PRIMARY KEY (advertisement_id, keyword_id),
    FOREIGN KEY (advertisement_id) REFERENCES advertisements (id),
    FOREIGN KEY (keyword_id) REFERENCES key_words (id)
);

CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    is_recontacted BOOLEAN,
    is_emailed BOOLEAN,
    advertisement_id INT,
    user_id INT,
    last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (advertisement_id) REFERENCES advertisements (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);