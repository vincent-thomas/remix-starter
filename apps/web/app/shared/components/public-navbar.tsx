import { Link } from "@remix-run/react";
import { buttonStyle, cn, sprinkles } from "@starter/components";

interface PublicNavbarProps {
  isAuthed?: boolean;
}

export function PublicNavbar({ isAuthed = false }: PublicNavbarProps) {
  return (
    <header
      className={cn(
        sprinkles({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: "xlarge",
        }),
      )}
    >
      <h1
        style={{
          fontSize: "1.4rem",
        }}
        className={sprinkles({
          color: "textPrimary",
        })}
      >
        VT's Remix template
      </h1>
      <div
        className={cn(
          sprinkles({
            display: "flex",
            gap: "medium",

            alignItems: "center",
          }),
        )}
      >
        <Link
          to="/email"
          className={buttonStyle({
            size: "md",
            colors: "accent",
            variant: "ghost",
          })}
        >
          fdshjklfdsa
        </Link>
        <Link
          to={isAuthed ? "/app" : "/login"}
          className={buttonStyle({
            size: "lg",
            colors: "accent",
            variant: "filled",
          })}
        >
          {isAuthed ? "Go to dashboard" : "Login"}
        </Link>
      </div>
    </header>
  );
}
