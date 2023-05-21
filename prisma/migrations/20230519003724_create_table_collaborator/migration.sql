-- CreateTable
CREATE TABLE "Collaborator" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "joinAt" TIMESTAMP(3) NOT NULL,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);
