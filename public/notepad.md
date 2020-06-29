CREATE TABLE link_tags (
    id SERIAL PRIMARY KEY,
    "linkId" INTEGER REFERENCES links(id),
    "tagId" INTEGER REFERENCES tags(id),
    UNIQUE ("linkId", "tagId")
);

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255) UNIQUE,
    "clickCount" INTEGER,
    comment TEXT,
    "dateShared" DATE NOT NULL
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

curl http://localhost:8080/api/links -X POST

curl http://localhost:8080 -X POST -H 'Content-Type: application/json' -d '{"url": "http://reddit.com", "comment": "reddit"}' 