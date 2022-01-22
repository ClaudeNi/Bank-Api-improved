const mongoose = require("mongoose");
const keys = require("../../config/keys");

mongoose.connect(
    `mongodb+srv://${keys.CONNECT_NAME}:${keys.CONNECT_PASS}@freecluster.nk9f1.mongodb.net/BankAPI?retryWrites=true&w=majority`
);
