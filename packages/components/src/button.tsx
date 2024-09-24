import type { RecipeVariants } from "@vanilla-extract/recipes";
import { buttonStyle } from "./button.css";
import type { FC, ReactNode } from "react";
import { cn } from "./utils";

type ButtonStyleProps = RecipeVariants<typeof buttonStyle>;

type ButtonProps = ButtonStyleProps & {
  type: HTMLButtonElement["type"];

  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const buttonStyleProps = {
    variant: props?.variant,
    colors: props?.colors,
    size: props?.size,
  };

  return (
    <button type={props.type} className={cn(buttonStyle(buttonStyleProps))}>
      {children}
    </button>
  );
};
