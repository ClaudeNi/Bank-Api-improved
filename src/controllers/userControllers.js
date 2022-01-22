const userModel = require("../model/user");

//Get user by ID
const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.find({ id: id });
        if (!user) {
            return res
                .status(404)
                .send(`No User with the ID "${id}" was found.`);
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

//Gets all users from DB
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        if (!users) {
            return res.status(404).send("Couldn't fetch Users.");
        }
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

//Adds a new user to the DB
const addUser = async (req, res) => {
    const user = await new userModel(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

const withdraw = async (req, res) => {
    const { id, withdraw } = req.body;
    try {
        const updatedUser = await userModel.find({ id: id });
        if (updatedUser.cash - withdraw < 0) {
            return res
                .status(400)
                .send(`Can't withdraw ${withdraw}$ from ${updatedUser.cash}`);
        }
        const userID = updatedUser._id;
        const newCash = +updatedUser.cash - +withdraw;
        const user = await userModel.findByIdAndUpdate(
            userID,
            { cash: +newCash },
            { new: true }
        );
        if (!user) {
            return res.status(404).send(`No User with the ID "${id}"`);
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const deposit = async (req, res) => {
    const { id, deposit } = req.body;
    try {
        const updatedUser = await userModel.find({ id: id });
        const userID = updatedUser._id;
        const newCash = +updatedUser.cash + +deposit;
        const user = await userModel.findByIdAndUpdate(
            userID,
            { cash: +newCash },
            { new: true }
        );
        if (!user) {
            return res.status(404).send("No User with this ID.");
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const transfer = async (req, res) => {
    const { id1, id2, transfer } = req.body;
    try {
        const user1 = await userModel.find({ id: id1 });
        const user2 = await userModel.find({ id: id2 });
        if (!user1 || !user2) {
            return res.status(404).send("Couldn't find user.");
        }
        if (user1.cash - transfer < 0) {
            return res
                .status(400)
                .send(
                    `Cannot transfer ${transfer}$ from user with ID "${id1}"`
                );
        }
        const user1ID = user1._id;
        const user2ID = user2._id;
        const newCash1 = +user1.cash - +transfer;
        const newCash2 = +user2.cash + +transfer;
        const newUser1 = await userModel.findByIdAndUpdate(
            user1ID,
            { cash: +newCash1 },
            { new: true }
        );
        const newUser2 = await userModel.findByIdAndUpdate(
            user2ID,
            { cash: +newCash2 },
            { new: true }
        );
        if (!newUser1 || !newUser2) {
            return res.status(404).send("Couldn't find user.");
        }
        res.status(200).send(newUser1, newUser2);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = {
    getUser,
    addUser,
    getAllUsers,
    withdraw,
    deposit,
    transfer,
};
