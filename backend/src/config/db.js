const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));
