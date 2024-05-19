import { Card, CardContent, CardHeader } from "../../ui/card";
import Link from "next/link";
import SignInForm from "./SignInForm";

function SignInCard() {
  return (
    <Card>
      <CardHeader>Zaloguj się</CardHeader>
      <CardContent>
        <SignInForm />
        <div className="pt-4">
          Jeśli nie masz konta możesz przejść do{" "}
          <Link className="underline" href="/auth/signup">
            rejestracji
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignInCard;
