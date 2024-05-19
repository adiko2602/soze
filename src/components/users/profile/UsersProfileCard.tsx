"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserProfileQuery } from "@/lib/hooks/user/profile/useUserProfileQuery";
import React from "react";

function UsersProfileCard() {
  const { profile } = useUserProfileQuery();

  return (
    <Card>
      <CardHeader>Twój profil</CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Email</div>
          <Input
            disabled={true}
            placeholder="Adres email"
            value={profile.data?.body.email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Imię</div>
          <Input
            disabled={true}
            placeholder="Imię"
            value={profile.data?.body.personals?.firstName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Nazwisko</div>
          <Input
            disabled={true}
            placeholder="Nazwisko"
            value={profile.data?.body.personals?.lastName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">PESEL</div>
          <Input
            disabled={true}
            placeholder="PESEL"
            value={profile.data?.body.personals?.pesel}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-sm">Typ konta</div>
          <Input
            disabled={true}
            placeholder="Typ konta"
            value={profile.data?.body.userTypes}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default UsersProfileCard;
