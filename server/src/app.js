const express = require('express');
const { PORT } = require("./configs")
const { databaseConnection } = require('./db/index');
const expressApp = require('./express-app');

async function StartServer() {
    const app = express();

    await expressApp(app);

    databaseConnection();

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();
