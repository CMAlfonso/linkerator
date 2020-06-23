const {Client} = require("pg");

const client = new Client('postgres://localhost:3000/linkeration:dev');

async function getAllLinks() {
    const {rows} = await client.query(`
        SELECT id, link, "clickCount", comment, "dateShared"
        FROM links;
    `);

    return rows;
}

async function createLink({
    link,
    clickCount,
    comment,
    dateShared
}) {
    try {
        const {rows: [url]} = await client.query(`
        INSERT INTO links(link, "clickCount", comment, "dateShared")
        VALUES($1, $2, $3, $4)
        ON CONFLICT (link) DO NOTHING
        RETURNING *;
        `, [link, clickCount, comment, dateShared]);

        return url;
    } catch (error) {
        console.error("Error creating link!");
        throw error;
    }
}

module.exports = {
    client
}