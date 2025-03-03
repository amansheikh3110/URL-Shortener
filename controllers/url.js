const shortid = require("shortid")
const Url = require("../models/url")
async function handleGenerateNeShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json ({error: "URL is required"})
    const shortID = shortid();

    await Url.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });
    return res.render("home", {
        id: shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handleGenerateNeShortURL,
    handleGetAnalytics
}