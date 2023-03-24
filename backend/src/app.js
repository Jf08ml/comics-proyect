require('./config/db.js');
const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors');
const authroutes = require('./routes/auth');
const payoutRoutes = require('./routes/payout')

// Configuración de middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rutas
app.use('/api', authroutes, payoutRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
// const HOST = '192.168.101.13'
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // console.log(`Network listening at http://${HOST}:${PORT}/`);
});
