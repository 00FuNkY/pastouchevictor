const prisma = require('../src/prismaClient');

const { hashPassword } = require('../src/util');

async function main() {
  const admin = [
    { email: 'toto@dev.com', password: hashPassword('toto') },
    { email: 'malo@dev.com', password: hashPassword('malo') },
    { email: 'uiui@dev.com', password: hashPassword('uiui') },
  ];

  const adminTab = admin.map((e) =>
    prisma.admin.create({
      data: {
        email: e.email,
        password: e.password,
      },
    })
  );

  const Properties = [
    {
      Title: 'Chateau de Momas',
      Description: 'Petit chateau de pierre',
      Lieux: '8 allée des airelles 64140 Lons',
      Picture1:
        'https://cdn.pixabay.com/photo/2014/05/02/23/52/castle-336498_960_720.jpg',
      Picture2:
        'https://cdn.pixabay.com/photo/2016/03/09/15/23/castle-1246628_960_720.jpg',
      Picture3:
        'https://cdn.pixabay.com/photo/2014/09/30/11/55/castle-467116_960_720.jpg',
      Price: 3478349,
    },
    {
      Title: 'Chateau de rfrgh',
      Description: 'Petit chateau de pierre',
      Lieux: '8 allée des airelles 64140 Lons',
      Picture1:
        'https://cdn.pixabay.com/photo/2014/05/02/23/52/castle-336498_960_720.jpg',
      Picture2:
        'https://cdn.pixabay.com/photo/2016/03/09/15/23/castle-1246628_960_720.jpg',
      Picture3:
        'https://cdn.pixabay.com/photo/2014/09/30/11/55/castle-467116_960_720.jpg',
      Price: 7757,
    },
    {
      Title: 'Chateau de Chambord',
      Description: 'Petit chateau de laqbas',
      Lieux: '20 rue des lys 40000 mont de marsan',
      Picture1:
        'https://cdn.pixabay.com/photo/2014/11/15/23/29/fairytale-532850_960_720.jpg',
      Picture2:
        'https://cdn.pixabay.com/photo/2016/03/09/15/23/castle-1246628_960_720.jpg',
      Picture3:
        'https://cdn.pixabay.com/photo/2014/09/30/11/55/castle-467116_960_720.jpg',
      Price: 56567,
    },
    {
      Title: 'Chateau de thibauklt',
      Description: 'Petit chateau de pierre',
      Lieux: '1950 route du houga 40800 aire sur adour',
      Picture1:
        'https://cdn.pixabay.com/photo/2013/10/28/23/32/sterling-castle-202103_960_720.jpg',
      Picture2:
        'https://cdn.pixabay.com/photo/2016/03/09/15/23/castle-1246628_960_720.jpg',
      Picture3:
        'https://cdn.pixabay.com/photo/2014/09/30/11/55/castle-467116_960_720.jpg',
      Price: 424675,
    },
  ];

  const PropertiesTab = Properties.map((e) =>
    prisma.Properties.create({
      data: {
        Title: e.Title,
        Description: e.Description,
        Lieux: e.Lieux,
        Picture1: e.Picture1,
        Picture2: e.Picture2,
        Picture3: e.Picture3,
        Price: e.Price,
      },
    })
  );

  const RoyalFamily = [
    {
      Name: 'Rover',
      RoyalTitle: 'King of em all  ',
      Picture: 'https://i.imgur.com/e1MbkOF.jpg',
    },
    {
      Name: 'Malo',
      RoyalTitle: 'King of em all  ',
      Picture: 'https://i.imgur.com/e1MbkOF.jpg',
    },
    {
      Name: 'Toto',
      RoyalTitle: 'King of em all  ',
      Picture: 'https://i.imgur.com/qSLrsdZ.png',
    },
  ];

  const RoyalFamilyTab = RoyalFamily.map((e) =>
    prisma.RoyalFamily.create({
      data: {
        Name: e.Name,
        RoyayTitle: e.RoyalTitle,
        Picture: e.Picture,
      },
    })
  );

  // base inserts fails
  const fail = (e) => {
    throw new Error(e.message);
  };

  const promise = async () => {
    const createCommands = new Promise((resolve, reject) => {
      Promise.all(adminTab.concat(RoyalFamilyTab, PropertiesTab))
        .then((results) => resolve(results))
        .catch((e) => reject(e));
    });
    createCommands.then(success, fail);
  };

  promise();
}
// eslint-disable-next-line no-console
main().catch((e) => console.error(e));
