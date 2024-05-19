import { Prisma } from "@prisma/client";

export const usersReportsInclude = Prisma.validator<Prisma.reportsInclude>()({
  addresses: {
    include: {
      terc: true,
      simc: true,
    },
  },
  diseases: true,
  personals: true,
  reporter: {
    select: {
      personals: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  },
});

export const usersProfileInclude = Prisma.validator<Prisma.usersSelect>()({
  email: true,
  createdAt: true,
  id: true,
  userTypes: true,
  personals: true,
});

export const browseReportsInclude = Prisma.validator<Prisma.reportsInclude>()({
  addresses: {
    include: {
      terc: true,
      simc: true,
    },
  },
  diseases: true,
  personals: true,
});

export const browseStatisticsInclude = Prisma.validator<Prisma.reportsSelect>()(
  {
    diseases: true,
  }
);

export const adminUsersSelect = Prisma.validator<Prisma.usersSelect>()({
  password: false,
  createdAt: true,
  email: true,
  id: true,
  userTypes: true,
  personals: true,
});

export const adminReportsSelect = Prisma.validator<Prisma.reportsSelect>()({
  id: true,
  createdAt: true,
  addresses: {
    include: {
      simc: true,
      terc: true,
    },
  },
  diseases: true,
  personals: true,
  reporter: {
    select: {
      id: true,
      email: true,
      userTypes: true,
      personals: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  },
});

export const adminUserSelect = Prisma.validator<Prisma.usersSelect>()({
  id: true,
  email: true,
  userTypes: true,
  password: false,
  createdAt: true,
  personals: true,
});
