"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ApiRequest } from "@/lib/api/ApiRequest";
import { TUsersProfileInclude } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

function UsersProfileCard() {
  const { data: session } = useSession();
  const { data: profile } = useQuery({
    queryFn: async () => {
      const data = ApiRequest.getData<TUsersProfileInclude>(
        await ApiRequest.get(`/api/users/${session?.user.id}/profile`)
      );
      console.log(data.body);
      return data.body;
    },
    queryKey: [`/api/users/${session?.user.id}/profile`],
  });
  return (
    <Card>
      <CardHeader>Twój profil</CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Email</div>
          <Input
            disabled={true}
            placeholder="Adres email"
            value={profile?.email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Imię</div>
          <Input
            disabled={true}
            placeholder="Imię"
            value={profile?.personals?.firstName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Nazwisko</div>
          <Input
            disabled={true}
            placeholder="Nazwisko"
            value={profile?.personals?.lastName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">PESEL</div>
          <Input
            disabled={true}
            placeholder="PESEL"
            value={profile?.personals?.pesel}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Typ konta</div>
          <Input
            disabled={true}
            placeholder="Typ konta"
            value={profile?.userTypes}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default UsersProfileCard;
