-- CreateTable
CREATE TABLE `Vino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coleccion` VARCHAR(191) NOT NULL,
    `anio` INTEGER NOT NULL,
    `variedad` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
