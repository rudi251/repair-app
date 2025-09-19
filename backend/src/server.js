const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('DB connect error', err);
  process.exit(1);
});
