import { Prisma } from "@prisma/client";
import {
  adminReportsSelect,
  adminUserSelect,
  adminUsersSelect,
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

export type TAdminUsersSelect = Prisma.usersGetPayload<{
  include: typeof adminUsersSelect;
}>;

export type TAdminReportsSelect = Prisma.reportsGetPayload<{
  include: typeof adminReportsSelect;
}>;

export type TAdminUserSelect = Prisma.usersGetPayload<{
  select: typeof adminUserSelect;
}>;
