"use client";

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareSave() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet */
    }
  }

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={share}
        className="label-caps inline-flex items-center gap-1.5 tracking-widest text-ink-soft transition-colors hover:text-ink"
      >
        <Share2 size={18} strokeWidth={1.5} />
        <span>{copied ? "Link Copied" : "Share Portfolio"}</span>
      </button>
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => setSaved((v) => !v)}
        className="label-caps group inline-flex items-center gap-1.5 tracking-widest text-ink-soft transition-colors hover:text-ink"
      >
        <Heart
          size={18}
          strokeWidth={1.5}
          className={`transition-colors ${saved ? "text-danger" : "group-hover:text-danger"}`}
          fill={saved ? "currentColor" : "none"}
        />
        <span>{saved ? "Saved" : "Save Sanctuary"}</span>
      </button>
    </div>
  );
}
