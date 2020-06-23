const {client} = require("./index");

async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS links;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS link_tags;
        `);
    } catch (error) {
        console.error("Error dropping tables!");
        throw error;
    }
}

async function createTables() {
    try {
        await client.query(`
        CREATE TABLE links (
            id SERIAL PRIMARY KEY,
            link VARCHAR(255) UNIQUE,
            "clickCount" INTEGER,
            comment TEXT,
            "dateShared" DATE NOT NULL
        );
        `)

        await client.query(`
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );
        `)

        await client.query(`
        CREATE TABLE link_tags (
            id SERIAL PRIMARY KEY,
            "linkId" INTEGER REFERENCES links(id),
            "tagId" INTEGER REFERENCES tags(id),
            UNIQUE ("linkId", "tagId")
        );
        `)
    } catch (error) {
        console.error("Error creating tables!");
        throw error;
    }
};

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
    } catch (error) {
        console.error("Error during rebuilding database!");
        throw error;
    }
}

// rebuildDB().then(() => client.end()).catch(console.error("Error finalizing!"));