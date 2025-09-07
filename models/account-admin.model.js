const mongoose = require("mongoose");

const AccountAdmin = mongoose.model(
  "AccountAdmin",
  {
    fullName: String,
    email: String,
    password: String,
    status: String, // initial: khởi tạo, active: hoạt động, inactive: Tạm dừng
  },
  "accounts-admin"
);

module.exports = AccountAdmin;
