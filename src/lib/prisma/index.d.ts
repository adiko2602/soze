import { Prisma } from "@prisma/client";
import {
  browseReportsInclude,
  browseStatisticsInclude,
  usersProfileInclude,
  usersReportsInclude,
} from "./types";

export type TUsersReportsInclude = Prisma.reportsGetPayload<{
  include: typeof usersReportsInclude;
}>;

export type TUsersProfileInclude = Prisma.usersGetPayload<{
  select: typeof usersProfileInclude;
}>;

export type TBrowseReportsInclude = Prisma.reportsGetPayload<{
  include: typeof browseReportsInclude;
}>;

export type TBrowseStatisticsInclude = Prisma.reportsGetPayload<{
  select: typeof browseStatisticsInclude;
}>;
