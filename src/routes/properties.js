const express = require('express');

const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await prisma.properties.findMany();
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// mettre le middleware sur cette route
router.post('/', async (req, res, next) => {
  const {
    Title,
    Description,
    Lieux,
    Picture1,
    Picture2,
    Picture3,
    Price,
    RoyalFamilyId,
  } = req.body;
  try {
    const results = await prisma.properties.create({
      data: {
        Title,
        Description,
        Lieux,
        Picture1,
        Picture2,
        Picture3,
        Price: parseInt(Price, 10),
        RoyalFamilyId: parseInt(RoyalFamilyId, 10),
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
    await prisma.properties.delete({
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
