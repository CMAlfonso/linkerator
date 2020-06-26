const express = require("express");
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    if (req.link) {
        console.log("Link is set:", req.user);
    }

    next();
})

const linksRouter = require("./links");
apiRouter.use("./links", linksRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

apiRouter.use((error, rep, res, next) => {
    res.send(error);
})

module.exports = apiRouter;