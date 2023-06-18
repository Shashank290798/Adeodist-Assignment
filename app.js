const express = require("express");
const cors = require("cors");
const helmet = require("helmet")
const cron = require("node-cron");
const sequelize = require("./src/utils/database");
const User = require("./src/models/userModel")
const Feed = require("./src/models/feedModel")
const userRoutes = require('./src/routes/userRoutes')
const feedRoutes = require('./src/routes/feedRoutes')
const logRoutes = require('./src/routes/logRoutes')
const logger = require("./src/utils/logger");


const app = express();
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true }))


app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  const operation = `${req.method} ${req.path}`;
  logger.logOperation(operation);
  next();
});

//  Middleware to create a new log file every 5 minutes
cron.schedule("*/5 * * * *", logger.createLogFile);

// Middleware to delete files older than 30 minutes
cron.schedule("*/30 * * * *", logger.deleteOldLogFiles);
// Routes
app.use('/users', userRoutes);
app.use('/feeds', feedRoutes);
app.use('/logs', logRoutes);

User.hasMany(Feed, { foreignKey: 'userId' });
Feed.belongsTo(User, { foreignKey: 'userId' });

sequelize
.sync()
  .then((result) => {
    app.listen(3000);
    console.log("Server started on Port 3000");
  })
  .catch((err) => {
    console.log(err);
});
