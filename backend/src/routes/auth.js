const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth').verifyToken;
const multer = require('multer');
const upload = multer();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refresh-tokens', userController.refreshTokens);
router.get('/getuser', authMiddleware, userController.getUser)
router.get('/searchnickname/:nickname', userController.searchNickname);
router.put('/updateuser', authMiddleware, userController.updateUser);
router.put('/updateprofilephoto', authMiddleware, userController.updateProfilePhoto)
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized to access this route.' });
});

module.exports = router;
