import { buttonStyle, cn, sprinkles } from "@starter/components";
import { PublicNavbar } from "app/shared/components/public-navbar";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

export default function NotFound() {
  return (
    <main
      style={{
        width: "100%",
        maxWidth: "1000px",
        alignSelf: "center",
        gap: "6rem",
      }}
      className={cn(sprinkles({ display: "flex", flexDirection: "column" }))}
    >
      <PublicNavbar />

      <div className={cn(styles.heroContainer)}>
        <div
          className={cn(
            sprinkles({
              display: "flex",
              flexDirection: "column",
              gap: "medium",
            }),
          )}
        >
          <div>
            <p className={cn(styles.heroDescription)}>404 Not Found</p>
            <h1 className={cn(styles.heroTitle)}>This page doesn't exist :(</h1>
          </div>
          <p
            className={cn(
              styles.heroDescription,
              sprinkles({
                color: "textPrimary",
                fontWeight: "bold",
                paddingTop: "xlarge",
              }),
            )}
          >
            The is the very nice remix template from the github
          </p>
          <div
            className={cn(
              sprinkles({
                display: "flex",
                gap: "large",
              }),
            )}
          >
            <Link
              to="/"
              className={buttonStyle({
                size: "lg",
                variant: "filled",
                colors: "branding",
              })}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
