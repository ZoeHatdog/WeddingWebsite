"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

type Look = {
  id: string;
  tab: string;
  title: string;
  image: { src: string; width: number; height: number; alt: string };
  notes: string[][];
  swatches?: { src: string; width: number; height: number; alt: string; label: string };
};

const LOOKS: Look[] = [
  {
    id: "principal",
    tab: "Principal",
    title: "Principal sponsors, officiant",
    image: {
      src: "/assets/attire-principal.webp",
      width: 900,
      height: 947,
      alt: "A nude chiffon gown with lace sleeves and a tan suit with an open-collar white shirt.",
    },
    notes: [["Shades of nude"]],
  },
  {
    id: "secondary",
    tab: "Secondary",
    title: "Secondary sponsors",
    image: {
      src: "/assets/attire-secondary.webp",
      width: 900,
      height: 854,
      alt: "A tiered butter-yellow gown beside swatches of yellow, powder blue, sage and moss green, and a dusty-blue suit beside swatches of slate and dusk blue.",
    },
    notes: [
      ["Maid of Honor", "Secondary Sponsors", "Flower Girls"],
      ["Groomsmen", "Bible Bearer", "Coins Bearer"],
    ],
  },
  {
    id: "guests",
    tab: "Guests",
    title: "Guests",
    image: {
      src: "/assets/attire-guests.webp",
      width: 760,
      height: 923,
      alt: "A lilac floral midi dress and a camel blazer over grey trousers.",
    },
    notes: [],
    swatches: {
      src: "/assets/swatches-guests.webp",
      width: 900,
      height: 103,
      alt: "Palette: blush pink, apricot, butter yellow, lavender, powder blue, sage green and nude.",
      label: "Light Spring Colors",
    },
  },
];

export function AttireTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + LOOKS.length) % LOOKS.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") focusTab(active + 1);
    else if (event.key === "ArrowLeft") focusTab(active - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(LOOKS.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className="looks">
      <div className="looks__tabs" role="tablist" aria-label="Attire by role" onKeyDown={onKeyDown}>
        {LOOKS.map((look, i) => (
          <button
            key={look.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`tab-${look.id}`}
            className="looks__tab"
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`panel-${look.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {look.tab}
          </button>
        ))}
      </div>

      {LOOKS.map((look, i) => (
        <div
          key={look.id}
          id={`panel-${look.id}`}
          className="look"
          role="tabpanel"
          aria-labelledby={`tab-${look.id}`}
          hidden={active !== i}
        >
          <h3 className="look__title caps">{look.title}</h3>
          <Image
            className="look__art"
            src={look.image.src}
            width={look.image.width}
            height={look.image.height}
            sizes="(min-width: 64rem) 30rem, 90vw"
            alt={look.image.alt}
          />
          {look.notes.length > 0 && (
            <div className={look.notes.length > 1 ? "look__notes look__notes--pair" : "look__notes"}>
              {look.notes.map((lines) => (
                <p key={lines[0]} className="look__note">
                  {lines.map((line, n) => (
                    <span key={line}>
                      {line}
                      {n < lines.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          )}
          {look.swatches && (
            <figure className="look__palette">
              <figcaption className="look__note">{look.swatches.label}</figcaption>
              <Image
                src={look.swatches.src}
                width={look.swatches.width}
                height={look.swatches.height}
                sizes="(min-width: 64rem) 28rem, 86vw"
                alt={look.swatches.alt}
              />
            </figure>
          )}
        </div>
      ))}
    </div>
  );
}
