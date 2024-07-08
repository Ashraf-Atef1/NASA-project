const mongoose = require("mongoose")
const MONGO_URL = "mongodb+srv://born368:AQZTNkaPDYX0AIhC@cluster0.fwdgilp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function mongooseConnect() {
    mongoose.connect(MONGO_URL);
}
module.exports = mongooseConnect;