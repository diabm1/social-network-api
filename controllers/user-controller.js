const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this unique id" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this unique id" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }

        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then((userData) => {
        if (!userData) {
          return res.json({ message: "User and thoughts deleted" });
        }
        res.json({ message: "User successfully deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.json({ message: "No user found with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { reactions: { friends: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.json({ message: "No user found with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
