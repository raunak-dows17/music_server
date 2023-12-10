const express = require("express");
const router = express.Router();
const Music = require("../models/Music");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMusic,
  AddMusic,
  UpdateMusic,
  deleteMusic,
  GetOneMusic,
  RecentlyHeard,
  MostHeard,
  GenreList,
  ArtistList,
} = require("../controllers/musicController");
const adminMiddleware = require("../middleware/adminMiddleWare");

router.get("/", authMiddleware, getMusic);
router.get("/:id", authMiddleware, GetOneMusic);
router.post("/admin", authMiddleware, adminMiddleware, AddMusic);
router.patch("/admin/:id", authMiddleware, adminMiddleware, UpdateMusic);
router.delete("/admin/:id", authMiddleware, adminMiddleware, deleteMusic);
router.get("/recently-heard", authMiddleware, RecentlyHeard);
router.get("/playlist/most-heard", authMiddleware, MostHeard);
router.get("/playlist/genre/", authMiddleware, GenreList);
router.get("/playlist/artist/", authMiddleware, ArtistList);


module.exports = router;
