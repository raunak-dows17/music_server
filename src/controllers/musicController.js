const Music = require('../models/Music');
const musicUrl = process.env.MUSIC_URL;

const getMusic = async (req, res) => {
    try {
        const musicList = await Music.find();
        res.status(200).json(musicList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const AddMusic = async (req, res) => {
  try {
    const { title, artist, album, genre, url } = req.body;

    const newMusic = new Music({ title, artist, album, genre, url: musicUrl+url });
    await newMusic.save();

    res
      .status(201)
      .json({ message: "Music added successfully", music: newMusic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetOneMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, album, genre, url } = req.body;

    const oneMusic = await Music.findById(
      id
    );

    res
      .status(200)
      .json(oneMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, album, genre, url } = req.body;

    const updatedMusic = await Music.findByIdAndUpdate(
      id,
      { title, artist, album, genre, url: musicUrl+url },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Music updated successfully", music: updatedMusic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;

    await Music.findByIdAndDelete(id);

    res.status(200).json({ message: "Music deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const RecentlyHeard = async (req, res) => {
  try {
    const user = req.user;

    const recentlyHeardPlaylists = await Music.find({ user: user._id })
      .sort({ updatedAt: -1 })
      .limit(30);

    const recentlyHeardGenres = await Music.aggregate([
      { $match: { user: user._id } },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 30 },
    ]);

    const recentlyHeardAlbums = await Music.aggregate([
      { $match: { user: user._id } },
      { $group: { _id: "$album", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 30 },
    ]);

    res.status(200).json({
      playlists: recentlyHeardPlaylists,
      genres: recentlyHeardGenres,
      albums: recentlyHeardAlbums,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const MostHeard = async (req, res) => {
  try {
    const user = req.user;

    const mostHeardPlaylist = await Music.find({ user: user._id })
      .sort({ playCount: -1 })
      .limit(30);

    res.status(200).json(mostHeardPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GenreList = async (req, res) => {
  try {
    const user = req.user;
    let { genre } = req.query;

    genre = decodeURIComponent(genre);


    const songsInPlaylist = await Music.find({ genre });

    
    res.status(200).json(songsInPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const ArtistList = async (req, res) => {
  try {
    const user = req.user;
    let { artist } = req.query;
    
    artist = decodeURIComponent(artist);
    

    const songsInPlaylist = await Music.find({ artist });
    


    res.status(200).json(songsInPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getMusic, GetOneMusic, AddMusic, UpdateMusic, deleteMusic, RecentlyHeard, MostHeard, GenreList, ArtistList };
