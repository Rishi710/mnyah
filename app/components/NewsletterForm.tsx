"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

// Front-end only for now: validates and confirms, but doesn't store the address anywhere.
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className="rounded-full bg-white px-6 py-4 text-[14px] text-leaf shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        Thank you — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError("Please enter a valid email address.");
          return;
        }
        setError("");
        setDone(true);
      }}
    >
      <div className="flex rounded-full bg-white p-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-leaf/40">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 text-[14px] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-leaf"
        >
          Subscribe <ArrowIcon className="h-3.5 w-3.5" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 px-4 text-[12px] text-[#b42318]">
          {error}
        </p>
      )}
    </form>
  );
}
