-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "foto_hotel" TEXT NOT NULL,
    "id_ciudad" INTEGER NOT NULL,
    "cant_estrellas" INTEGER NOT NULL,
    "cant_habitaciones" INTEGER NOT NULL,
    "precio_noche" INTEGER NOT NULL,
    "calle" TEXT NOT NULL,
    "num_calle" INTEGER NOT NULL DEFAULT 0,
    "telefono" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
