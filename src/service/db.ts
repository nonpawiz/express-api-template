import { PrismaClient } from "@prisma/client";
import useMoment from "./useMoment";

const prisma = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
  const result = await next(params);
  if (Array.isArray(result)) {
    return result.map(formatDates);
  } else if (result && typeof result === "object") {
    return formatDates(result);
  }
  return result;
});

function formatDates(data: any) {
  if (data.createdAt) data.createdAt = useMoment().formatUtc(data.createdAt);
  if (data.updatedAt) data.updatedAt = useMoment().formatUtc(data.updatedAt);
  return data;
}

export default prisma;
