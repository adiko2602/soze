import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import CardHeaderBack from "../ui/card-header-back";

function AdminCard() {
  return (
    <Card>
      <CardHeader>
        <CardHeaderBack>Panel administratora</CardHeaderBack>
      </CardHeader>
      <CardContent className="flex flex-row justify-evenly gap-4">
        <Card className="w-full">
          <CardHeader>Użytkownicy</CardHeader>
          <CardContent>
            <Link href="/admin/users">
              <Button>Pokaż</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>Raporty</CardHeader>
          <CardContent>
            <Link href="/admin/reports">
              <Button>Pokaż</Button>
            </Link>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default AdminCard;
