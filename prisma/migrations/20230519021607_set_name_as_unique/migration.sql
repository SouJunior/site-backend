/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Collaborator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_name_key" ON "Collaborator"("name");
