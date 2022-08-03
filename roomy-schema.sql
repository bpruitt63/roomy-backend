CREATE TABLE users (
    email TEXT PRIMARY KEY,
    pwd TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    super_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    org_name TEXT NOT NULL
);

CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    area_name TEXT NOT NULL,
    org_id INTEGER REFERENCES organizations ON DELETE CASCADE
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_name TEXT NOT NULL,
    area_id INTEGER REFERENCES areas ON DELETE CASCADE
);

CREATE TABLE organization_users (
    email TEXT REFERENCES users ON UPDATE CASCADE,
    org_id INTEGER REFERENCES organizations ON DELETE CASCADE,
    PRIMARY KEY (email, org_id)
);

CREATE TABLE area_users (
    email TEXT REFERENCES users ON UPDATE CASCADE,
    area_id INTEGER REFERENCES organizations ON DELETE CASCADE,
    PRIMARY KEY (email, area_id)
);

CREATE TABLE room_users (
    email TEXT REFERENCES users ON UPDATE CASCADE,
    room_id INTEGER REFERENCES organizations ON DELETE CASCADE,
    PRIMARY KEY (email, room_id)
);