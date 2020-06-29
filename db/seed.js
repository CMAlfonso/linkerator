const {
    client,
    getAllLinks,
    createLink,
    updateLink,
    createTag,
    createLinkTag,
    addTagsToLink,
    getLinkById,
    getLinksByTagName,
    getAllTags
} = require("./index");

async function dropTables() {
    try {
        await client.query(`
            DROP TABLE IF EXISTS links CASCADE;
            DROP TABLE IF EXISTS tags CASCADE;
            DROP TABLE IF EXISTS link_tags CASCADE;
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
            url VARCHAR(255) UNIQUE,
            "clickCount" INTEGER,
            comment TEXT NOT NULL,
            "dateShared" DATE
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

async function createInitialLinks() {
    try {
        const google = await createLink({
            url: "http://www.google.com/",
            comment: "Search engine!"
        })
    } catch (error) {
        console.log("Error creating initial links!");
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialLinks();
    } catch (error) {
        console.error("Error during rebuilding database!");
        throw error;
    }
}

async function testDB() {
    try {
        console.log("Calling getAllLinks");
        const links = await getAllLinks();
        console.log("Result: ", links);
    } catch (error) {
        console.error("Error testing DB");
        throw error;
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());

