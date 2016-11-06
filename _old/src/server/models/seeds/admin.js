const User = require('../user');


const seedAdmin = function () {
  User.find({}, (err, documents) => {
    if (documents.length === 0) {
      const password = 'admin',
        user = new User({
          email: 'ad@min.com',
          admin: true,
          password
        });
      user.generateHash(password, (err, hash) => {
        user.password = hash;
        user.save();
        console.log('Dummy admin added!');
      });
    }
  });
};

module.exports = seedAdmin;
