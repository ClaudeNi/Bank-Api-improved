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

//Deletes a user
const deleteUser = async (req, res) => {
    const id = req.body.id;
    try {
        const user = await userModel.find({ id: id });
        console.log(user._id);
        const deletedUser = await userModel.findByIdAndDelete(user._id);
        if (!user || !deletedUser) {
            return res
                .status(404)
                .send(`Couldn't find a user with the ID "${id}"`);
        }
        res.send("user has been deleted " + deletedUser);
    } catch (e) {
        res.status(500).send(e);
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
        const newCash = updatedUser.cash - withdraw;
        const user = await userModel.updateOne(
            { id: id },
            { cash: newCash },
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
        const newCash = updatedUser.cash + deposit;
        const user = await userModel.updateOne(
            { id: id },
            { cash: newCash },
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
        const newCash1 = user1.cash - transfer;
        const newCash2 = user2.cash + transfer;
        const newUser1 = await userModel.updateOne(
            { id: id1 },
            { cash: newCash1 },
            { new: true }
        );
        const newUser2 = await userModel.updateOne(
            { id: id2 },
            { cash: newCash2 },
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
    deleteUser,
    getAllUsers,
    withdraw,
    deposit,
    transfer,
};
