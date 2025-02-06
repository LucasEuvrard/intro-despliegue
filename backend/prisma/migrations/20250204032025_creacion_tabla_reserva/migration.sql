-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numero_contacto" INTEGER NOT NULL,
    "id_ciudad" INTEGER NOT NULL,
    "id_hotel" INTEGER NOT NULL,
    "cant_personas" INTEGER NOT NULL DEFAULT 1,
    "cant_habitaciones" INTEGER NOT NULL DEFAULT 1,
    "fecha_ingreso" TEXT NOT NULL DEFAULT 'No especificada',
    "fecha_salida" TEXT NOT NULL DEFAULT 'No especificada',

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
