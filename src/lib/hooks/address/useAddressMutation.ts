import { useMutation } from "@tanstack/react-query";
import { simc, terc } from "@prisma/client";
import { ApiRequest } from "@/lib/api/ApiRequest";

export function useAddressMutation() {
  const pow = useMutation({
    mutationFn: async ({ woj }: { woj: number }) => {
      const data = ApiRequest.getData<terc[]>(
        await ApiRequest.post("/api/addresses/pow", {
          woj: woj,
        })
      );
      console.log(data.body);
      return data.body;
    },
  });

  const gmi = useMutation({
    mutationFn: async ({ woj, pow }: { woj: number; pow: number }) => {
      const data = ApiRequest.getData<terc[]>(
        await ApiRequest.post("/api/addresses/gmi", {
          woj: woj,
          pow: pow,
        })
      );
      console.log(data.body);
      return data.body;
    },
  });

  const sym = useMutation({
    mutationFn: async ({
      woj,
      pow,
      gmi,
    }: {
      woj: number;
      pow: number;
      gmi: number;
    }) => {
      const data = ApiRequest.getData<simc[]>(
        await ApiRequest.post("/api/addresses/sym", {
          woj: woj,
          pow: pow,
          gmi: gmi,
        })
      );
      console.log(data.body);
      return data.body;
    },
  });

  return { pow, gmi, sym };
}
