const axios = require('axios');
const bcrypt = require('bcrypt');
const prisma = require('./prismaClient');

/**
 *
 * @param {string} password plain text password to hash using bcrypt
 * @returns {string} Hashed password
 */
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

/**
 *
 * @param {string} plainPassword plain password to compare
 * @param {string} hashedPassword hashed password to compare (from your db)
 */
function decodePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

// get gps coordinates from api gouv
const gpsByAdress = async (streetNumber, streetName, zipeCodeId) => {
  const url = 'https://api-adresse.data.gouv.fr/search/?q=';

  // get zipCode and city from table
  const cp = await prisma.zipCode.findUnique({
    where: {
      inseeId: parseInt(zipeCodeId, 10),
    },
  });

  // construc adress
  const adress = streetNumber.concat(
    ' ',
    streetName,
    ' ',
    cp.zipCode,
    ' ',
    cp.city
  );

  // promise who returns coordinates
  return new Promise((resolve, reject) => {
    axios
      .get(url.concat(adress))
      .then((result) => resolve(result))
      .catch((e) => reject(e));
  });
};

module.exports = {
  hashPassword,
  decodePassword,
  gpsByAdress,
};
