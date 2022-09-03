const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {

  await User.deleteMany();

  await User.insertMany([
    {
      username: "chelseaburnham",
      password: "password"
    },
    {
      username: "henrynguyen",
      password: "password"
    },
    {
      username: "sufyaanvaidya",
      password: "password"
    },
  ])

  console.log('users seeded');

  process.exit();
});
