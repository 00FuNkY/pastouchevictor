-- CreateTable
CREATE TABLE `admin` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
UNIQUE INDEX `admin.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Properties` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191),
    `Lieux` VARCHAR(191) NOT NULL,
    `Picture1` VARCHAR(191),
    `Picture2` VARCHAR(191),
    `Picture3` VARCHAR(191),
    `Price` INT NOT NULL,
    `RoyalFamilyId` INT NOT NULL,
UNIQUE INDEX `Properties.Title_unique`(`Title`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoyalFamily` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `RoyalTitle` VARCHAR(191),
    `Picture` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Properties` ADD FOREIGN KEY (`RoyalFamilyId`) REFERENCES `RoyalFamily`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
