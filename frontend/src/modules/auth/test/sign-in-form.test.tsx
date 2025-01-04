import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignInForm } from "../components/sign-in-form";
import { TestProvider } from "@/test/utils";

vi.mock("../api/signIn", () => {
  return { signIn: vi.fn() };
});

it("submits the form with valid data", async () => {
  render(
    <TestProvider>
      <SignInForm />
    </TestProvider>
  );

  fireEvent.input(screen.getByLabelText(/email/i), {
    target: { value: "test@example.com" },
  });

  fireEvent.input(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(
    screen.getByRole("button", { name: /sign in with password/i })
  );
});

it("does invalid submit", async () => {
  render(
    <TestProvider>
      <SignInForm />
    </TestProvider>
  );

  fireEvent.submit(
    screen.getByRole("button", { name: /sign in with password/i })
  );

  await waitFor(() => {
    const invalidEmail = screen.getByText(/wrong email format/i);
    const invalidPassword = screen.getByText(
      /Password should have at least 6 characters/i
    );
    expect(invalidEmail).toBeInTheDocument();
    expect(invalidPassword).toBeInTheDocument();
  });
});
