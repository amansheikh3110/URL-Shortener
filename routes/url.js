const express = require("express");
const { handleGenerateNeShortURL, handleGetAnalytics } = require("../controllers/url");
const app = express();

const router = express.Router();

router.post('/', handleGenerateNeShortURL);

router.get("/analytics/:shortId", handleGetAnalytics)

module.exports= router;