import { Button, cn, sprinkles } from "@starter/components";
import * as styles from "./styles.css";

export default function Index() {
  return (
    <>
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
            <h1 className={cn(styles.heroTitle)}>The good nice remix app</h1>
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
    </>
  );
}
