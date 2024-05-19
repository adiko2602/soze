import { ErrorApiResponse, SuccessApiResponse } from "@/lib/api/ApiResponse";
import { authOptions } from "@/lib/nextauth/authOptions";
import prisma from "@/lib/prisma/prismaClient";
import { browseStatisticsInclude } from "@/lib/prisma/types";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

async function getByWoj(woj: number, disease: number | undefined) {
  try {
    let reports = await prisma.reports.findMany({
      where: {
        AND: {
          addresses: {
            terc: {
              woj: woj,
            },
          },
          diseasesId: disease,
        },
      },
      include: browseStatisticsInclude,
    });
    if (!reports) return null;
    return reports;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getByPow(pow: number, disease: number | undefined) {
  try {
    let reports = await prisma.reports.findMany({
      where: {
        AND: {
          addresses: {
            terc: {
              pow: pow,
            },
          },
          diseasesId: disease,
        },
      },
      include: browseStatisticsInclude,
    });
    if (!reports) return null;
    return reports;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getByGmi(gmi: number, disease: number | undefined) {
  try {
    let reports = await prisma.reports.findMany({
      where: {
        AND: {
          addresses: {
            terc: {
              gmi: gmi,
            },
          },
          diseasesId: disease,
        },
      },
      include: browseStatisticsInclude,
    });
    if (!reports) return null;
    return reports;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getBySym(sym: number, disease: number | undefined) {
  try {
    let reports = await prisma.reports.findMany({
      where: {
        AND: {
          addresses: {
            simc: {
              sym: sym,
            },
          },
          diseasesId: disease,
        },
      },
      include: browseStatisticsInclude,
    });
    if (!reports) return null;
    return reports;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.userTypes)
    return ErrorApiResponse.send("Musisz się zalogować");

  const body: {
    woj: number | undefined;
    pow: number | undefined;
    gmi: number | undefined;
    sym: number | undefined;
    disease: number | undefined;
  } = await req.json();

  if (body.sym) {
    const reports = await getBySym(body.sym, body.disease);
    if (!reports) return ErrorApiResponse.send("Nie znaleziono raportów");
    return SuccessApiResponse.send("Znaleziono raporty", 200, reports);
  } else if (body.gmi) {
    const reports = await getByGmi(body.gmi, body.disease);
    if (!reports) return ErrorApiResponse.send("Nie znaleziono raportów");
    return SuccessApiResponse.send("Znaleziono raporty", 200, reports);
  } else if (body.pow) {
    const reports = await getByPow(body.pow, body.disease);
    if (!reports) return ErrorApiResponse.send("Nie znaleziono raportów");
    return SuccessApiResponse.send("Znaleziono raporty", 200, reports);
  } else if (body.woj) {
    const reports = await getByWoj(body.woj, body.disease);
    if (!reports) return ErrorApiResponse.send("Nie znaleziono raportów");
    return SuccessApiResponse.send("Znaleziono raporty", 200, reports);
  } else {
    return ErrorApiResponse.send("Nie znaleziono raportów");
  }
}
