import { Card, CardContent, CardHeader } from "../../ui/card";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

function SignUpCard() {
  return (
    <Card>
      <CardHeader>Zarejestruj się</CardHeader>
      <CardContent>
        <SignUpForm />
        <div className="pt-4">
          Jeśli masz już konto możesz przejść do{" "}
          <Link href="/auth/signin" className="underline">
            logowania
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
