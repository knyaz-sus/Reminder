import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type CustomElement = { type: "paragraph"; children: CustomText[] };

export type Format = "bold" | "italic" | "underline";
