const express = require("express");
const path = require("path")
const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url");

const app = express();

connectDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("connected to mongoDB");
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.static("public"));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home',{
    urls: allUrls,
  })
});

app.use("/url", urlRoute);
app.use("/", staticRoute)


app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamps: Date.now(),
            },
        },
    }
);
if (!entry) {
    // Handle the case where entry is not found
    return res.status(404).send({ message: "Entry not found" });
  }
  res.redirect(entry.redirectUrl);
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});