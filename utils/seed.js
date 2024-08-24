const connection = require("../config/connection.js");
const User = require("../models/User.js");
const usersData = require("./data.js");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected ✅");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  await User.collection.insertMany(usersData);

  console.table(usersData);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
