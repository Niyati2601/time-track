const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db/Connection");
const router = require("./routes/Route");
require('dotenv').config();
const cookieParser = require("cookie-parser");

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable cookies or HTTP Auth if needed
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api",router)

connection().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
