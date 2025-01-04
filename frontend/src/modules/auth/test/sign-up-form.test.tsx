import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignUpForm } from "../components/sign-up-form";
import { TestProvider } from "@/test/utils";

vi.mock("../api/signUpWithPassword", () => {
  return { signUpWithPassword: vi.fn() };
});

it("submits the form with valid data", async () => {
  render(
    <TestProvider>
      <SignUpForm />
    </TestProvider>
  );

  fireEvent.input(screen.getByLabelText(/name/i), {
    target: { value: "Roman" },
  });

  fireEvent.input(screen.getByLabelText(/email/i), {
    target: { value: "test@example.com" },
  });

  fireEvent.input(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
});

it("does invalid submit", async () => {
  render(
    <TestProvider>
      <SignUpForm />
    </TestProvider>
  );

  fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

  await waitFor(() => {
    const invalidName = screen.getByText(/username is required/i);
    const invalidEmail = screen.getByText(/wrong email format/i);
    const invalidPassword = screen.getByText(
      /Password should have at least 6 characters/i
    );
    expect(invalidName).toBeInTheDocument();
    expect(invalidEmail).toBeInTheDocument();
    expect(invalidPassword).toBeInTheDocument();
  });
});
