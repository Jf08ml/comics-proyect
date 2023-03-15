const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION, API_KEY_IMGBB } = process.env;
const User = require('../models/users');
const axios = require('axios');

async function signup(req, res) {
  try {
    const { nickname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingNick = await User.findOne({ nickname });
    if (existingNick) {
      return res.status(400).json({ message: 'Nickname already exists' });
    }

    const user = new User({ nickname, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });

    res.status(201).json({ token, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Non-existent user' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function refreshTokens(req, res) {
  try {
    const { refreshToken } = req.body;

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: err.name });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
      const newRefreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });

      res.json({ token, refreshToken: newRefreshToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function searchNickname(req, res) {
  const { nickname } = req.params;
  try {
    const existingNick = await User.findOne({ nickname: { $regex: new RegExp('^' + nickname.toLowerCase() + '$', 'i') } });
    if (existingNick) {
      return res.status(200).json({ value: true, message: 'Nickname already exists' });
    }
    return res.status(200).json({ value: false, message: 'Nickname available' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error searching nickname' });
  }
}

async function getUser(req, res) {
  try {
    const token = req.headers['authorization'];// El separador en el método split debe ser un espacio
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    const user = await User.findById(userId);
    res.status(200).json({user})
  }catch (error) {
    res.status(500).json({message: 'Error al obtener el usuario'})
  }
}

async function updateUser(req, res) {
  const { name, lastName, country, city, nickname, email } = req.body;
  try {
    const token = req.headers['authorization'];// El separador en el método split debe ser un espacio
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized updateUser' });
    }


    user.name = name;
    user.lastName = lastName;
    user.country = country;
    user.city = city;
    user.nickname = nickname;
    user.email = email;

    await user.save();
    res.status(200).json({ message: 'User information updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function updateProfilePhoto(req, res) {
  const { userPhotoUrl } = req.body;
  console.log(userPhotoUrl)
  try {
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized updateUser' });
    }

    user.userUrlPhoto = userPhotoUrl;

    await user.save();
    res.status(200).json({ message: 'Photo update success' });
  } catch (err) {
    res.status(500).json({ message: 'servidor error' });
  }
}


module.exports = {
  signup,
  login,
  refreshTokens,
  searchNickname,
  updateUser,
  updateProfilePhoto,
  getUser
};
