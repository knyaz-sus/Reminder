import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignUpForm } from "./SignUpForm";
import { signUpWithPassword } from "../services/signUpWithPassword";

vi.mock("../services/signUpWithPassword", () => {
  return { signUpWithPassword: vi.fn().mockResolvedValue({ succes: true }) };
});

describe("sign in form", () => {
  it("submits the form with valid data", async () => {
    render(<SignUpForm />);

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

    await waitFor(() =>
      expect(signUpWithPassword).toHaveBeenCalledWith(
        "Roman",
        "test@example.com",
        "password123"
      )
    );
  });

  it("does invalid submit", async () => {
    render(<SignUpForm />);

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
});
