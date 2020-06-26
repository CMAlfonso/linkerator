const {Client} = require("pg");

const client = new Client('postgres://localhost:5432/linkerator:dev');

async function getAllLinks() {
    try {
        const {rows: linkIds} = await client.query(`
        SELECT id, link, "clickCount", comment, "dateShared"
        FROM links;
        `);

        const links = await Promise.all(linkIds.map(
            link => getLinkById(link.id)
        ));

        return links;
    } catch (error) {
        console.error("Error getting all links!");
        throw error;
    }
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

async function updateLink(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const {rows: [url]} = await client.query(`
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));

        return url;
    } catch (error) {
        console.error("Error updating link!");
        throw error;
    }
}

async function createTag(tagList) {
    if (tagList.length === 0) { 
        return; 
      }
    
    const insertValues = tagList.map(
    (_, index) => `$${index + 1}`).join('), (');

    const selectValues = tagList.map(
    (_, index) => `$${index + 1}`).join(', ');

    try {
        await client.query(`
        INSERT INTO tags(name)
        VALUES (${insertValues})
        ON CONFLICT (name) DO NOTHING;
        `, tagList);

        const {rows} = await client.query(`
        SELECT * FROM tags
        WHERE name
        IN (${selectValues});
        `, tagList);

        return rows;
    } catch (error) {
        throw error
    }
}

async function createLinkTag() {
    try {
        await client.query(`
          INSERT INTO link_tags("linkId", "tagId")
          VALUES ($1, $2)
          ON CONFLICT ("linkId", "tagId") DO NOTHING;
        `, [linkId, tagId]);
      } catch (error) {
        throw error;
      }
}

async function addTagsToLink(linkId, tagList) {
    try {
        const createLinkTagPromises = tagList.map(
            tag => createLinkTag(linkId, tag.id)
          );
      
          await Promise.all(createLinkTagPromises);
      
          return await getLinkById(linkId);
    } catch (error) {
        throw error;
    }
}

async function getLinkById(linkId) {
    try {
        const { rows: [ urls ]  } = await client.query(`
          SELECT *
          FROM links
          WHERE id=$1;
        `, [linkId]);
  
        if (!url) {
          throw {
            name: "LinkNotFoundError",
            message: "Could not find a link with that linkId"
          };
        }
    
        const { rows: tags } = await client.query(`
          SELECT tags.*
          FROM tags
          JOIN link_tags ON tags.id=link_tags."tagId"
          WHERE link_tags."linkId"=$1;
        `, [linkId])
    
        url.tags = tags;
    
        return url;
      } catch (error) {
        throw error;
      }
}

async function getLinksByTagName(tagName) {
    try {
        const { rows: linkIds } = await client.query(`
          SELECT links.id
          FROM links
          JOIN link_tags ON links.id=link_tags."linkId"
          JOIN tags ON tags.id=link_tags."tagId"
          WHERE tags.name=$1;
        `, [tagName]);
    
        return await Promise.all(linkIds.map(
          link => getLinkById(link.id)
        ));
      } catch (error) {
        throw error;
      }
}

async function getAllTags() {
    try {
        const { rows} = await client.query(`
        SELECT *
        FROM tags;
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
}

module.exports = {
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
}