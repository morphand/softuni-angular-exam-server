const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "The username has to be more than 3 characters long."],
    maxLength: [22, "The username cannot be more than 22 characters long."],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (e) {
        e = e.trim().toLowerCase();
        const regex = new RegExp(
          /^(?<address>[A-Za-z0-9_]{2,})@(?<subdomainOne>[A-Za-z0-9]{2,}\.)?(?<subdomainTwo>[A-Za-z0-9]{2,}\.)?(?<hostname>[A-Za-z0-9]{2,})\.(?<domain>[A-Za-z0-9]{2,})$/
        );
        return e.length >= 6 && e.length <= 256 && regex.test(e);
      },
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  imageURL: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
