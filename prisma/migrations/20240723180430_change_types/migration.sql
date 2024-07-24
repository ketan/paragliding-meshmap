/*
  Warnings:

  - You are about to alter the column `voltage` on the `device_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `channelUtilization` on the `device_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `airUtilTx` on the `device_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `temperature` on the `environment_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `relativeHumidity` on the `environment_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `barometricPressure` on the `environment_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `gasResistance` on the `environment_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `voltage` on the `environment_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `current` on the `environment_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `airUtilTx` on the `nodes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `channelUtilization` on the `nodes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `voltage` on the `nodes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `barometricPressure` on the `nodes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `relativeHumidity` on the `nodes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `temperature` on the `nodes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ch1Voltage` on the `power_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ch1Current` on the `power_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ch2Voltage` on the `power_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ch2Current` on the `power_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ch3Voltage` on the `power_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ch3Current` on the `power_metrics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rxSnr` on the `text_messages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "device_metrics" ALTER COLUMN "voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "channelUtilization" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "airUtilTx" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "environment_metrics" ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "relativeHumidity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "barometricPressure" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gasResistance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "current" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "nodes" ALTER COLUMN "airUtilTx" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "channelUtilization" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "barometricPressure" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "relativeHumidity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "power_metrics" ALTER COLUMN "ch1Voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ch1Current" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ch2Voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ch2Current" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ch3Voltage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ch3Current" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "text_messages" ALTER COLUMN "rxSnr" SET DATA TYPE DOUBLE PRECISION;
