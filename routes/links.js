const express = require("express");
const linksRouter = express.Router();

const {
    getAllLinks,
    createLink,
    updateLink,
    getLinkById
} = require("../db")

linksRouter.get("/", async (req, res) => {
    const links = await getAllLinks();

    res.send({
        links
    });
});

linksRouter.post("/", async (req, res, next) => {
    const {url, comment} = req.body
    // const tagArr = tags.trim().split(/\s+/)
    const linkData = {};

    // if (tagArr.length > 0) {
    //     postData.tags = tagArr;
    // }

    try {
        linkData.url = url;
        linkData.comment = comment;
        // linkData.dateShared = dateShared;
        
        const link = await createLink(linkData)

        if (link) {
            res.send({link});
        } else {
            next({
                name: "unableToCreateLink",
                message: "Unable to create link"
            })
        }
    } catch ({name, message}) {
        next({name, message});
    }
});

linksRouter.patch("/:id", async (req, res, next) => {
    const {linkId} = req.params;

});

module.exports = linksRouter;