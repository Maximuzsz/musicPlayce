-- CreateTable
CREATE TABLE "public"."Play" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "songId" INTEGER NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Play_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Play_userId_idx" ON "public"."Play"("userId");

-- CreateIndex
CREATE INDEX "Play_songId_idx" ON "public"."Play"("songId");

-- CreateIndex
CREATE INDEX "Play_playedAt_songId_idx" ON "public"."Play"("playedAt", "songId");

-- AddForeignKey
ALTER TABLE "public"."Play" ADD CONSTRAINT "Play_songId_fkey" FOREIGN KEY ("songId") REFERENCES "public"."Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
