const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db/Connection");
const router = require("./routes/Route");
require('dotenv').config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_DOMAIN_URL,
        credentials: true
    }
));
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api",router)

connection().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
