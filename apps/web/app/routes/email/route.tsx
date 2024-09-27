import { Link } from "@remix-run/react";
import { buttonStyle, sprinkles } from "@starter/components";

export default function Index() {
  return (
    <div className={sprinkles({ display: "flex" })}>
      <Link
        to="/"
        className={buttonStyle({
          size: "lg",
          colors: "accent",
          variant: "filled",
        })}
      >
        Login
      </Link>
    </div>
  );
}
