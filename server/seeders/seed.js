const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany();
  await User.create({
    username: "chelseaburnham",
    password: "password",
    highScore: '12'
  });
  await User.create({
    username: "henrynguyen",
    password: "password",
    highScore: '15'
  });
  await User.create({
    username: "sufyaanvaidya",
    password: "password",
    highScore: '10'
  });
  await User.create({
    username: "guest",
    password: "password",
    highScore: '1'
  });
  console.log('users seeded');
  process.exit();
});