const express = require("express");
const linksRouter = express.Router();

const {
    getAllLinks,
    createLink,
    updateLink,
    getLinkById
} = require("../../db")

linksRouter.get("/", async (req, res) => {
    const links = await getAllLinks();

    res.send({
        links
    });
});

linksRouter.post("/", async (req, res, next) => {
const linkData = {};

    try {

    } catch ({name, message}) {
        next({name, message});
    }
});

linksRouter.patch("/:id", async (req, res, next) => {
    const {linkId} = req.params;
    
});