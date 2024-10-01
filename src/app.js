const express = require('express');
const { checkDatabaseConnection } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

const startServer = async () => {
  try {
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } else {
      console.error('Server startup aborted due to database connection failure');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
};

startServer();