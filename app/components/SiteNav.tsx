"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#the-day", label: "Wedding Details" },
  { href: "#dress-code", label: "Dress code" },
  { href: "#attire", label: "Color Guide" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <nav className="nav" aria-label="Sections" ref={navRef} data-open={open || undefined}>
      <a className="nav__mark" href="#top" aria-label="Javes and Janel, back to top">
        Javes <span aria-hidden="true">&amp;</span> Janel
      </a>
      <button
        className="nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
        <span className="nav__toggle-icon" aria-hidden="true" />
      </button>
      <ul className="nav__links" id="nav-links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
