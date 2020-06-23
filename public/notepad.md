CREATE TABLE link_tags (
    id SERIAL PRIMARY KEY,
    "linkId" INTEGER REFERENCES links(id),
    "tagId" INTEGER REFERENCES tags(id),
    UNIQUE ("linkId", "tagId")
);