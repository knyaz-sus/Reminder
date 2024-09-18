import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

it("++++", () => {
  render(<Button onClick={() => {}}>click</Button>);
  const button = screen.getByText("click");
  expect(button).toBeInTheDocument();
});
