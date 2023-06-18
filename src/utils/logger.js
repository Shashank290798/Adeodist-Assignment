const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Log an operation to a file
const logOperation = (operation) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${operation}\n`;

  const logFilename = `log_${getCurrentTimestamp()}.log`;
  const logFilePath = path.join(logDir, logFilename);

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('An error occurred while logging the operation:', err);
    }
  });
};

// Create a new log file
const createLogFile = () => {
  const logFilename = `log_${getCurrentTimestamp()}.log`;
  const logFilePath = path.join(logDir, logFilename);

  fs.writeFile(logFilePath, '', (err) => {
    if (err) {
      console.error('An error occurred while creating the log file:', err);
    } else {
      console.log(`Created log file: ${logFilename}`);
    }
  });
};

// Delete log files older than 30 minutes
const deleteOldLogFiles = () => {
  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;

  fs.readdir(logDir, (err, files) => {
    if (err) {
      console.error('An error occurred while reading the log files:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(logDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('An error occurred while getting file stats:', err);
          return;
        }

        if (stats.birthtimeMs < thirtyMinutesAgo) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('An error occurred while deleting the log file:', err);
            } else {
              console.log(`Deleted log file: ${file}`);
            }
          });
        }
      });
    });
  });
};

// Utility function to get the current timestamp
const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/[-:.TZ]/g, '');
};

module.exports = {
  logOperation,
  createLogFile,
  deleteOldLogFiles,
};
