const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRATION,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION,
} = process.env;
const Comic = require("../models/comic");
const User = require("../models/users");
const Serie = require("../models/serie");
const Rate = require("../models/score");

async function postSerie(req, res) {
  const { title, description, artist, typeContent, keywords } = req.body.serie;
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const serie = new Serie({
      userId: user._id,
      nameSerie: title,
      description: description,
      artist: artist,
      typeContent: typeContent,
      keywords: keywords,
    });
    await serie.save();
    return res.status(200).json({ result: "success", serie_id: serie._id });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserSeries(req, res) {
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skipIndex = (page - 1) * limit;

    // Obtener las series del usuario
    const userSeriesQuery = Serie.find({ userId: userId })
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex);
    const userSeries = await userSeriesQuery.exec();

    // Obtener el total de registros
    const totalCountQuery = Serie.countDocuments({ userId: userId });
    const totalCount = await totalCountQuery.exec();
    const total = Math.ceil(totalCount / limit);

    return res.status(200).json({
      series: userSeries,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserSerie(req, res) {
  const { id } = req.params;
  try {
    const mainSerie = await Serie.findById(id); // Busca el cómic principal por su ID

    return res.status(200).json(mainSerie); // Retorna los cómics relacionados
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function putComic(req, res) {
  const { serie, _id, imagesPost } = req.body.comicLoaded;
  try {
    const serieFound = await Serie.findById(serie);
    if (!serieFound) {
      return res
        .status(404)
        .json({ result: "error", message: "Serie not found" });
    }

    serieFound.frontPage = serieFound.frontPage
      ? serieFound.frontPage
      : imagesPost[0];

    if (!serieFound.partsSerie.includes(_id)) {
      serieFound.partsSerie.push(_id);
    }

    await serieFound.save({ timestamps: false });
    return res
      .status(200)
      .json({ result: "success", message: "success updated" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function postComic(req, res) {
  const { title, imagesPost, comicPart, serie } = req.body.postComplete;
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const comic = new Comic({
      user: user._id,
      title: title,
      imagesPost: imagesPost,
      serie: comicPart ? comicPart : serie,
    });

    await comic.save();
    return res
      .status(200)
      .json({ result: "success", message: "Comic save", comic: comic });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserComics(req, res) {
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    const userComics = await Comic.find({ user: userId });
    return res.status(200).json(userComics);
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getUserComic(req, res) {
  const { id } = req.params;
  try {
    const mainComic = await Comic.findById(id); // Busca el cómic principal por su ID

    return res.status(200).json(mainComic); // Retorna los cómics relacionados
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getAzarComics(req, res) {
  try {
    const response = await Comic.aggregate([{ $sample: { size: 6 } }]);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function postRateComic(req, res) {
  try {
    const { rate, comicId } = req.body;
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    const comic = await Comic.findById(comicId);
    const rates = await Rate.find({ comicId: comic._id, userId: user.id });

    if (comic.user.equals(user._id)) {
      return res
        .status(409)
        .json({ result: "error", message: "You can't rate your own comic" });
    }

    if (rates.length > 0) {
      return res
        .status(409)
        .json({ result: "error", message: "Already qualified" });
    }

    const score = new Rate({
      userId: user.id,
      comicId,
      rate,
    });

    await score.save();
    return res
      .status(200)
      .json({ result: "success", message: "Rate save", score: score });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function assignScore(req, res) {
  try {
    const { comicId } = req.body;
    const comic = await Comic.findById(comicId);
    const rates = await Rate.find({ comicId: comic._id });
    const sum = rates.reduce(
      (accumulator, currentRate) => accumulator + currentRate.rate,
      0
    );
    let score = sum / rates.length;

    score = Number(score.toFixed(2));

    comic.score = score;

    await comic.save();

    return res
      .status(200)
      .json({ result: "success", message: "Qualification sent successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function assignScoreSerie(req, res) {
  try {
    const { serieId } = req.body;
    const serie = await Serie.findById(serieId);
    if (!serie) {
      // Manejar el caso cuando la serie no existe
      return res
        .status(404)
        .json({ result: "error", message: "Serie not found" });
    }
    const rates = await Comic.find({ serie: serie._id });
    const filteredRates = rates.filter((currentRate) => currentRate.score > 0);
    const sum = rates.reduce((accumulator, currentRate) => {
      if (currentRate.score > 0) {
        return accumulator + currentRate.score;
      }
      return accumulator;
    }, 0);
    const count = filteredRates.length;

    let score = sum / count;

    score = Number(score.toFixed(2));

    serie.score = score;

    await serie.save();

    return res
      .status(200)
      .json({ result: "success", message: "Qualification sent successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function countViews(req, res) {
  try {
    const { comicId } = req.body;
    const comic = await Comic.findById(comicId);

    comic.views += 1;

    await comic.save();

    return res
      .status(200)
      .json({ result: "success", message: "View sent successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function countViewsSerie(req, res) {
  try {
    const { serieId } = req.body;
    const serie = await Serie.findById(serieId);
    const comics = await Comic.find({ serie: serie._id });
    const views = comics.reduce((accumulator, comic) => {
      return accumulator + comic.views;
    }, 0);

    serie.views = views;

    await serie.save();

    return res
      .status(200)
      .json({ result: "success", message: "Views update successfully" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getAnimatedSeriesMostViews(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const skipIndex = (page - 1) * limit;

    const animatedSeries = await Serie.find({ typeContent: "Animated" })
      .limit(limit)
      .skip(skipIndex);

    const totalCountQuery = Serie.countDocuments({ typeContent: "Animated" });
    const totalCount = await totalCountQuery.exec();
    const total = Math.ceil(totalCount / limit);

    animatedSeries.sort((a, b) => b.views - a.views);

    return res.status(200).json({
      result: "success",
      series: animatedSeries,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getRealSeriesMostViews(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const skipIndex = (page - 1) * limit;

    const realSeries = await Serie.find({ typeContent: "Real" })
      .limit(limit)
      .skip(skipIndex);

    const totalCountQuery = Serie.countDocuments({ typeContent: "Real" });
    const totalCount = await totalCountQuery.exec();
    const total = Math.ceil(totalCount / limit);

    realSeries.sort((a, b) => b.views - a.views);

    return res.status(200).json({
      result: "success",
      series: realSeries,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getNewerSeries(req, res) {
  const { type } = req.params;
  const validTypes = ["Animated", "Real"];

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ result: "error", message: "Invalid series type" });
    }

    const series = await Serie.find({ typeContent: type })
      .sort({ uploadData: -1 })
      .limit(limit)
      .skip(skipIndex);

    const totalCount = await Serie.countDocuments({ typeContent: type });
    const total = Math.ceil(totalCount / limit);

    return res.status(200).json({
      result: "success",
      series,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error.message });
  }
}

async function getPopularSeries(req, res) {
  const { type } = req.params;
  const validTypes = ["Animated", "Real"];

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ result: "error", message: "Invalid series type" });
    }

    const series = await Serie.find({ typeContent: type })
      .limit(limit)
      .skip(skipIndex);

    const totalCount = await Serie.countDocuments({ typeContent: type });
    const total = Math.ceil(totalCount / limit);

    let seriesPopular = series.map((serie) => {
      const clonedSerie = serie.toObject(); // Convertir el documento Mongoose a un objeto JavaScript
      clonedSerie.popularity = (clonedSerie.views + clonedSerie.score) / 2;
      return clonedSerie;
    });

    seriesPopular.sort((a, b) => b.popularity - a.popularity);

    return res.status(200).json({
      result: "success",
      series: seriesPopular,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error.message });
  }
}

async function getFeaturedArtists(req, res) {
  const { type } = req.params;
  try {
    const series = await Serie.find({ typeContent: type });
    const artists = [];

    series.forEach((serie) => {
      const existingArtist = artists.find(
        (artist) => artist.name === serie.artist
      );
      if (!existingArtist) {
        artists.push({
          name: serie.artist,
          views: serie.views,
          score: serie.score,
        });
      } else {
        existingArtist.views += serie.views;
        existingArtist.score += serie.score;
      }
    });

    // Calcular el promedio (popularity) para cada artista
    artists.forEach((artist) => {
      artist.popularity = (artist.views + artist.score) / 2;
    });

    // Ordenar los artistas por popularidad (en orden descendente)
    artists.sort((a, b) => b.popularity - a.popularity);

    const top10Artists = artists.slice(0, 10);

    return res.status(200).json({ result: "success", top10Artists });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function getArtistSeries(req, res) {
  const { artist } = req.params;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const series = await Serie.find({ artist: artist })
      .limit(limit)
      .skip(skipIndex);

    const totalCount = await Serie.countDocuments({ artist: artist });
    const total = Math.ceil(totalCount / limit);

    return res
      .status(200)
      .json({ result: "success", series: series, totalCount: total });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function searchSerie(req, res) {
  const { nameSerie } = req.params;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const SeriesFound = await Serie.find({
      nameSerie: { $regex: nameSerie, $options: "i" },
    })
      .limit(limit)
      .skip(skipIndex);

    const totalCount = await Serie.countDocuments({
      nameSerie: { $regex: nameSerie, $options: "i" },
    });
    const total = Math.ceil(totalCount / limit);

    if (SeriesFound.length > 0) {
      return res
        .status(200)
        .json({ result: "success", series: SeriesFound, totalCount: total });
    } else {
      return res.status(200).json({ value: false, message: "Serie not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error searching serie" });
  }
}

async function getSeriesToInscribe(req, res) {
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skipIndex = (page - 1) * limit;

    const userSeriesQuery = Serie.find({
      userId: userId,
      $or: [{ inscribed: false }, { inscribed: { $exists: false } }],
    })
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex);
    const userSeries = await userSeriesQuery.exec();

    const totalCountQuery = Serie.countDocuments({
      userId: userId,
      $or: [{ inscribed: false }, { inscribed: { $exists: false } }],
    });
    const totalCount = await totalCountQuery.exec();
    const total = Math.ceil(totalCount / limit);

    return res.status(200).json({
      series: userSeries,
      totalCount: total,
    });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error });
  }
}

async function enteredSeries(req, res) {
  const { serie } = req.params;
  try {
    const serieFound = await Serie.findById(serie);
    if (!serieFound) {
      return res
        .status(404)
        .json({ result: "error", message: "Serie not found" });
    }

    for (const comic of serieFound.partsSerie) {
      const comicFound = await Comic.findById(comic);
      comicFound.inscribed = true;
      await comicFound.save();
    }

    serieFound.inscribed = true;
    await serieFound.save();

    return res
      .status(200)
      .json({ result: "success", message: "Inscribed success" });
  } catch (error) {
    return res.status(500).json({ result: "error", message: error.message });
  }
}

module.exports = {
  postComic,
  getUserComics,
  getUserComic,
  getAzarComics,
  postSerie,
  putComic,
  getUserSeries,
  getUserSerie,
  postRateComic,
  assignScore,
  assignScoreSerie,
  countViews,
  countViewsSerie,
  getAnimatedSeriesMostViews,
  getRealSeriesMostViews,
  getNewerSeries,
  getPopularSeries,
  getFeaturedArtists,
  getArtistSeries,
  searchSerie,
  getSeriesToInscribe,
  enteredSeries,
};
