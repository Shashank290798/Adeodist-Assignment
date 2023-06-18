const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

// Get logs (only accessible by super-admin)
const getLogs = (req, res) => {
    try {
        fs.readdir(logDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while reading the logs' });
            }

            const currentTimestamp = Date.now();
            const logs = files.filter((file) => {
                const filePath = path.join(logDir, file);
                const fileStats = fs.statSync(filePath);
                const fileCreateTime = fileStats.birthtimeMs;
                const elapsedMinutes = Math.floor((currentTimestamp - fileCreateTime) / (1000 * 60));
                return elapsedMinutes <= 5;
            });

            const logContents = logs.map((logFile) => {
                const logFilePath = path.join(logDir, logFile);
                const content = fs.readFileSync(logFilePath, 'utf-8');
                return { file: logFile, content };
            });

            res.status(200).json({ logs: logContents });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the logs' });
    }
};

module.exports = {
    getLogs,
};
