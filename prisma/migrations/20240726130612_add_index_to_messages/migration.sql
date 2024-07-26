-- CreateIndex
CREATE INDEX "text_messages_from_idx" ON "text_messages"("from");

-- CreateIndex
CREATE INDEX "text_messages_to_idx" ON "text_messages"("to");

-- CreateIndex
CREATE INDEX "text_messages_from_to_idx" ON "text_messages"("from", "to");
