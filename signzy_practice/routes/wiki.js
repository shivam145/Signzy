const express = require("express");
const router = express.Router();
const wikiController = require("../controllers/wikiController");

router.get("/wiki/:wikiId/:pageId", wikiController.getWikiPage);

router.post("/wiki/:wikiId/:pageId", wikiController.getWikiPage);

router.get("/", wikiController.getSearchPage);

router.post("/search", wikiController.postSearchPage);

module.exports = router;
