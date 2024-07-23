-- CreateTable
CREATE TABLE "nodes" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "longName" TEXT,
    "shortName" TEXT,
    "hardwareModel" INTEGER,
    "isLicensed" BOOLEAN,
    "role" INTEGER,
    "altitude" INTEGER,
    "latitude" INTEGER,
    "longitude" INTEGER,
    "positionUpdatedAt" TIMESTAMP(3),
    "airUtilTx" DECIMAL(65,30),
    "batteryLevel" INTEGER,
    "channelUtilization" DECIMAL(65,30),
    "voltage" DECIMAL(65,30),
    "neighbourBroadcastIntervalSecs" INTEGER,
    "neighboursUpdatedAt" TIMESTAMP(3),
    "mqttConnectionState" TEXT,
    "mqttConnectionStateUpdatedAt" TIMESTAMP(3),
    "firmwareVersion" TEXT,
    "hasDefaultChannel" BOOLEAN,
    "modemPreset" INTEGER,
    "numOnlineLocalNodes" INTEGER,
    "positionPrecision" INTEGER,
    "region" INTEGER,
    "uptimeSeconds" BIGINT,
    "barometricPressure" DECIMAL(65,30),
    "relativeHumidity" DECIMAL(65,30),
    "temperature" DECIMAL(65,30),
    "neighbours" JSONB[],
    "inbox" JSONB[],
    "outbox" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "map_eports" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "shortName" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "role" INTEGER,
    "hardwareModel" INTEGER NOT NULL,
    "firmwareVersion" TEXT NOT NULL,
    "region" INTEGER,
    "modemPreset" INTEGER,
    "hasDefaultChannel" BOOLEAN,
    "latitude" INTEGER,
    "longitude" INTEGER,
    "altitude" INTEGER,
    "positionPrecision" INTEGER,
    "numOnlineLocalNodes" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "map_eports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neighbour_infos" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "nodeBroadcastIntervalSecs" INTEGER NOT NULL,
    "neighbours" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "neighbour_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_metrics" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "batteryLevel" INTEGER,
    "voltage" DECIMAL(65,30),
    "channelUtilization" DECIMAL(65,30),
    "airUtilTx" DECIMAL(65,30),
    "uptimeSeconds" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "environment_metrics" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "temperature" DECIMAL(65,30),
    "relativeHumidity" DECIMAL(65,30),
    "barometricPressure" DECIMAL(65,30),
    "gasResistance" DECIMAL(65,30),
    "voltage" DECIMAL(65,30),
    "current" DECIMAL(65,30),
    "iaq" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "environment_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_metrics" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "ch1Voltage" DECIMAL(65,30),
    "ch1Current" DECIMAL(65,30),
    "ch2Voltage" DECIMAL(65,30),
    "ch2Current" DECIMAL(65,30),
    "ch3Voltage" DECIMAL(65,30),
    "ch3Current" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "power_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" BIGSERIAL NOT NULL,
    "nodeId" BIGINT NOT NULL,
    "to" BIGINT NOT NULL,
    "from" BIGINT NOT NULL,
    "channel" INTEGER,
    "packetId" BIGINT,
    "channelId" TEXT,
    "gatewayId" BIGINT,
    "latitude" INTEGER,
    "longitude" INTEGER,
    "altitude" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_envelopes" (
    "id" BIGSERIAL NOT NULL,
    "mqttTopic" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "gatewayId" BIGINT,
    "to" BIGINT,
    "from" BIGINT,
    "protobuf" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_envelopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_messages" (
    "id" BIGSERIAL NOT NULL,
    "channel" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "gatewayId" BIGINT,
    "packetId" BIGINT NOT NULL,
    "to" BIGINT NOT NULL,
    "from" BIGINT NOT NULL,
    "text" TEXT NOT NULL,
    "wantResponse" BOOLEAN,
    "hopLimit" INTEGER,
    "rxSnr" DECIMAL(65,30),
    "rxRssi" INTEGER,
    "rxTime" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "text_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traceroutes" (
    "id" BIGSERIAL NOT NULL,
    "from" BIGINT NOT NULL,
    "to" BIGINT NOT NULL,
    "route" JSONB[],
    "wantResponse" BOOLEAN NOT NULL,
    "channel" INTEGER,
    "channelId" TEXT,
    "gatewayId" BIGINT,
    "packetId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "traceroutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waypoints" (
    "id" BIGSERIAL NOT NULL,
    "from" BIGINT NOT NULL,
    "to" BIGINT NOT NULL,
    "waypointId" BIGINT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "expire" BIGINT,
    "lockedTo" BIGINT,
    "name" TEXT,
    "description" TEXT,
    "icon" INTEGER,
    "channel" INTEGER NOT NULL,
    "packetId" BIGINT NOT NULL,
    "channelId" TEXT NOT NULL,
    "gatewayId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waypoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nodes_nodeId_key" ON "nodes"("nodeId");

-- CreateIndex
CREATE INDEX "nodes_createdAt_idx" ON "nodes"("createdAt");

-- CreateIndex
CREATE INDEX "nodes_updatedAt_idx" ON "nodes"("updatedAt");

-- CreateIndex
CREATE INDEX "nodes_nodeId_idx" ON "nodes"("nodeId");

-- CreateIndex
CREATE INDEX "map_eports_createdAt_idx" ON "map_eports"("createdAt");

-- CreateIndex
CREATE INDEX "map_eports_updatedAt_idx" ON "map_eports"("updatedAt");

-- CreateIndex
CREATE INDEX "map_eports_nodeId_idx" ON "map_eports"("nodeId");

-- CreateIndex
CREATE INDEX "neighbour_infos_createdAt_idx" ON "neighbour_infos"("createdAt");

-- CreateIndex
CREATE INDEX "neighbour_infos_updatedAt_idx" ON "neighbour_infos"("updatedAt");

-- CreateIndex
CREATE INDEX "neighbour_infos_nodeId_idx" ON "neighbour_infos"("nodeId");

-- CreateIndex
CREATE INDEX "device_metrics_createdAt_idx" ON "device_metrics"("createdAt");

-- CreateIndex
CREATE INDEX "device_metrics_updatedAt_idx" ON "device_metrics"("updatedAt");

-- CreateIndex
CREATE INDEX "device_metrics_nodeId_idx" ON "device_metrics"("nodeId");

-- CreateIndex
CREATE INDEX "environment_metrics_createdAt_idx" ON "environment_metrics"("createdAt");

-- CreateIndex
CREATE INDEX "environment_metrics_updatedAt_idx" ON "environment_metrics"("updatedAt");

-- CreateIndex
CREATE INDEX "environment_metrics_nodeId_idx" ON "environment_metrics"("nodeId");

-- CreateIndex
CREATE INDEX "power_metrics_createdAt_idx" ON "power_metrics"("createdAt");

-- CreateIndex
CREATE INDEX "power_metrics_updatedAt_idx" ON "power_metrics"("updatedAt");

-- CreateIndex
CREATE INDEX "power_metrics_nodeId_idx" ON "power_metrics"("nodeId");

-- CreateIndex
CREATE INDEX "positions_createdAt_idx" ON "positions"("createdAt");

-- CreateIndex
CREATE INDEX "positions_updatedAt_idx" ON "positions"("updatedAt");

-- CreateIndex
CREATE INDEX "positions_nodeId_idx" ON "positions"("nodeId");

-- CreateIndex
CREATE INDEX "service_envelopes_createdAt_idx" ON "service_envelopes"("createdAt");

-- CreateIndex
CREATE INDEX "service_envelopes_updatedAt_idx" ON "service_envelopes"("updatedAt");

-- CreateIndex
CREATE INDEX "text_messages_createdAt_idx" ON "text_messages"("createdAt");

-- CreateIndex
CREATE INDEX "text_messages_updatedAt_idx" ON "text_messages"("updatedAt");

-- CreateIndex
CREATE INDEX "traceroutes_createdAt_idx" ON "traceroutes"("createdAt");

-- CreateIndex
CREATE INDEX "traceroutes_updatedAt_idx" ON "traceroutes"("updatedAt");

-- CreateIndex
CREATE INDEX "waypoints_createdAt_idx" ON "waypoints"("createdAt");

-- CreateIndex
CREATE INDEX "waypoints_updatedAt_idx" ON "waypoints"("updatedAt");
