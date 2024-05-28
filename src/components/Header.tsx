"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as sozeLogo from "../../public/sozeLogo.svg";

function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const signOutButton = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-row justify-between items-center p-4 py-8 border-b">
      <Link href="/">
        <div className="flex flex-row justify-center items-center">
          <div className="w-[75px] h-[64px] relative">
            <Image alt="SOZE Logo" src={sozeLogo} priority={true} />
          </div>
          <div className="ml-2">SOZE</div>
        </div>
      </Link>
      <div>
        {!session && (
          <div className="flex flex-row items-center gap-2">
            <div>
              <Link href="/auth/signin">
                <Button>Zaloguj się</Button>
              </Link>
            </div>
          </div>
        )}
        {session && (
          <div className="flex flex-row items-center gap-2">
            <div>
              {session.user.personals.firstName}{" "}
              {session.user.personals.lastName}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon">
                    <HamburgerMenuIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {session.user.userTypes === "ADMIN" && (
                    <>
                      <DropdownMenuLabel>Administrator</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/admin");
                        }}
                        className="hover:cursor-pointer"
                      >
                        Panel administratora
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  {(session.user.userTypes === "WORKER" ||
                    session.user.userTypes === "ADMIN") && (
                    <>
                      <DropdownMenuLabel>Obsługa raportów</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/reports/create");
                        }}
                        className="hover:cursor-pointer"
                      >
                        Utwórz raport
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/reports/browse");
                        }}
                        className="hover:cursor-pointer"
                      >
                        Przeglądaj utworzone raporty
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Statystyki</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/statistics");
                    }}
                    className="hover:cursor-pointer"
                  >
                    Przeglądaj statystyki
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/users/profile");
                    }}
                    className="hover:cursor-pointer"
                  >
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/users/reports");
                    }}
                    className="hover:cursor-pointer"
                  >
                    Raporty
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={signOutButton}
                  >
                    Wyloguj
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
