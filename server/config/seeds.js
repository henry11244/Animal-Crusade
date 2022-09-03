const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {

  await User.deleteMany();

  await User.create({
    username: "chelseaburnham",
    password: "passwords"
  })
  await User.create({
    username: "henrynguyen",
    password: "passwords"
  })
  await User.create({
    username: "sufyaanvaidya",
    password: "passwords"
  })


  console.log('users seeded');

  process.exit();
});
