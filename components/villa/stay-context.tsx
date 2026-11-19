"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_CHECK_IN,
  DEFAULT_CHECK_OUT,
  RESERVED,
  rangeHasReserved,
} from "@/lib/booking";
import { MIN_NIGHTS, nightsBetween } from "@/lib/pricing";

type StayState = {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  maxGuests: number;
  nights: number;
  notice: string | null;
  selectDate: (iso: string) => void;
  clear: () => void;
  setAdults: (n: number) => void;
};

const StayContext = createContext<StayState | null>(null);

export function StayProvider({
  maxGuests,
  children,
}: {
  maxGuests: number;
  children: React.ReactNode;
}) {
  const [checkIn, setCheckIn] = useState<string | null>(DEFAULT_CHECK_IN);
  const [checkOut, setCheckOut] = useState<string | null>(DEFAULT_CHECK_OUT);
  const [adults, setAdultsRaw] = useState(Math.min(2, maxGuests));
  const [notice, setNotice] = useState<string | null>(null);

  const selectDate = useCallback(
    (iso: string) => {
      if (RESERVED.has(iso)) return;
      setNotice(null);

      // Start a new range
      if (!checkIn || checkOut || iso <= checkIn) {
        setCheckIn(iso);
        setCheckOut(null);
        return;
      }

      if (nightsBetween(checkIn, iso) < MIN_NIGHTS) {
        setNotice(`Minimum reservation is ${MIN_NIGHTS} nights.`);
        return;
      }
      if (rangeHasReserved(checkIn, iso)) {
        setNotice(
          "That range includes reserved dates — please choose another departure.",
        );
        return;
      }
      setCheckOut(iso);
    },
    [checkIn, checkOut],
  );

  const clear = useCallback(() => {
    setCheckIn(null);
    setCheckOut(null);
    setNotice(null);
  }, []);

  const setAdults = useCallback(
    (n: number) => setAdultsRaw(Math.max(1, Math.min(n, maxGuests))),
    [maxGuests],
  );

  const value = useMemo<StayState>(
    () => ({
      checkIn,
      checkOut,
      adults,
      maxGuests,
      nights: checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0,
      notice,
      selectDate,
      clear,
      setAdults,
    }),
    [
      checkIn,
      checkOut,
      adults,
      maxGuests,
      notice,
      selectDate,
      clear,
      setAdults,
    ],
  );

  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay() {
  const ctx = useContext(StayContext);
  if (!ctx) throw new Error("useStay must be used inside <StayProvider>");
  return ctx;
}
