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
