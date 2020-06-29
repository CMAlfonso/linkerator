const express = require("express");
const tagsRouter = express.Router();

const {
    getAllTags,
    getLinksByTagName
} = require("../db");

tagsRouter.get("/:tagName/lnks", async (req, res, next) => {
    const {tagName} = req.param;

    try {
        const linksByTags = await getLinksByTagName(encodeURI(tagName));

        res.status(200).json(linksByTags)
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = tagsRouter;