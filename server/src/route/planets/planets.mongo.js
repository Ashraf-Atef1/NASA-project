const mongoos = require("mongoos");

const planetSchema = mongoos.Schema({
    name: {
        type: String,
        required: true,
    }
})