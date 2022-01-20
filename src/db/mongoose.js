const mongoose = require("mongoose");
const keys = require("../../config/keys");

mongoose.connect(
    `mongodb+srv://BankUsers:${keys.CONNECT_PASS}@freecluster.nk9f1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
