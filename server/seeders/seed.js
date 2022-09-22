const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany();
  await User.create({
    username: "chelseaburnham",
    password: "password"
  });
  await User.create({
    username: "henrynguyen",
    password: "password"
  });
  await User.create({
    username: "sufyaanvaidya",
    password: "password"
  });
  await User.create({
    username: "guest",
    password: "password"
  });
  console.log('users seeded');
  process.exit();
});