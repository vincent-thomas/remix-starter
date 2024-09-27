import type { MetaFunction } from "@remix-run/node";
import { Button, buttonStyle, cn, sprinkles } from "@starter/components";
import * as styles from "./styles.css";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "VT's Remix Starter Template" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Navbar() {
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
    </header>
  );
}

export default function Index() {
  return (
    <main className={cn(styles.indexRoot)}>
      <Navbar />
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
            <p className={cn(styles.heroDescription)}>REMIX STACK</p>
            <h1 className={cn(styles.heroTitle)}>
              The good nice remix template
            </h1>
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
            <Button size="lg" variant="filled" colors="branding" type="submit">
              fdshajkfldsa
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "14px",
        }}
        className={cn(
          sprinkles({
            background: "element",
            padding: "xlarge",

            borderColor: "element",

            display: "flex",
            flexDirection: "column",
          }),
        )}
      >
        <h2
          style={{
            fontSize: "2.2rem",
          }}
          className={cn(
            sprinkles({
              color: "textSecondary",
            }),
          )}
        >
          This is the nice thing
        </h2>
        <p className="">fdsahjkfldsahjkflasd</p>
      </div>
    </main>
  );
}
