require('./config/db.js');
const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const payoutRoutes = require('./routes/payout')
const comicRoutes = require('./routes/comic')

// Configuración de middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rutas
app.use('/api', authRoutes, payoutRoutes, comicRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
const HOST = '192.168.101.13'
app.listen(PORT, HOST, () => {
  // console.log(`Server listening on port ${PORT}`);
  console.log(`Network listening at http://${HOST}:${PORT}/`);
});

