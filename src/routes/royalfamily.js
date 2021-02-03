const express = require('express');

const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await prisma.royalFamily.findMany();
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// mettre le middleware sur cette route
router.post('/', async (req, res, next) => {
  const { Name, RoyalTitle, Picture } = req.body;
  try {
    const results = await prisma.royalFamily.create({
      data: {
        Name,
        RoyalTitle,
        Picture,
      },
    });
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// put not needed

// mettre le middleware
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.royalFamily.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
