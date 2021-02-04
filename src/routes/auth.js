const jwt = require('jsonwebtoken');
const express = require('express');
const prisma = require('../prismaClient');

const { decodePassword, hashPassword } = require('../util');
const { jwtDecode } = require('../middlewares');

const router = express.Router();

router.get('/', jwtDecode, async (req, res, next) => {
  try {
    const results = await prisma.admin.findMany();

    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// create an admin, mettre le middleware

router.post('/inscription', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashPassword(password),
      },
    });
    delete admin.password;
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if this admin exists in database
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    // if not, throw a 401
    if (!admin) {
      res.status(401);
      throw new Error('User does not exists');
    }

    // if yes, continue by comparing both password
    const isValid = decodePassword(password, admin.password);

    // if the password is not valid, throw a 401
    if (!isValid) {
      res.status(401);
      throw new Error('Invalid password');
    }

    // if it is valid, then continue by signing a new token
    const token = jwt.sign(
      {
        email: admin.email,
        role: 'ADMIN',
      },
      process.env.SECRET,
      {
        expiresIn: '2d',
      }
    );

    delete admin.password;

    // and then respond with the jwt in json
    res.status(200).json({
      token,
      admin,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
