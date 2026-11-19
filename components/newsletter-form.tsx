"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="py-3 text-sm text-primary-200">
        Thank you — your invitation is on its way.
      </p>
    );
  }

  return (
    <form
      className="flex border-b border-primary-300/40 focus-within:border-primary-200"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 bg-transparent py-3 text-sm text-paper placeholder:text-primary-300/70 focus:outline-none"
      />
      <button
        type="submit"
        className="label-caps px-2 py-3 text-primary-100 transition-colors hover:text-paper"
      >
        Inscribe
      </button>
    </form>
  );
}
