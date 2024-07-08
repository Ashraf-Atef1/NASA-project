const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./route/api');
const app = express();

app.use(morgan('combined'));
app.use(cors({
	origin: "*"
}));
app.use(express.json());
app.use(api);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get('/*', (req, res)=>{
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
