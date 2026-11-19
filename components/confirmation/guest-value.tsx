"use client";

import { useSyncExternalStore } from "react";

type Stored = {
  ref?: string;
  firstName?: string;
  email?: string;
  arrival?: string;
};

const STORAGE_KEY = "sanctuary:last-booking";

const subscribe = () => () => {};

function readStorage() {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseField(raw: string | null, field: keyof Stored) {
  if (!raw) return null;
  try {
    const value = (JSON.parse(raw) as Stored)[field];
    return typeof value === "string" && value.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}

export function GuestValue({
  field,
  fallback,
}: {
  field: keyof Stored;
  fallback: string;
}) {
  const raw = useSyncExternalStore(subscribe, readStorage, () => null);
  return <>{parseField(raw, field) ?? fallback}</>;
}
