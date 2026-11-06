import Image from "next/image";
import type { CSSProperties } from "react";
import { AttireTabs } from "./components/AttireTabs";
import { Countdown } from "./components/Countdown";
import { MonthCalendar } from "./components/MonthCalendar";
import { SectionIndex } from "./components/SectionIndex";
import { MAPS_URL, daysUntilWedding } from "./lib/wedding";

export const revalidate = 86400;

const SECTIONS = [
  { id: "welcome", label: "Welcome" },
  { id: "the-day", label: "The day" },
  { id: "dress-code", label: "Dress code" },
  { id: "attire", label: "Attire" },
];

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Home() {
  return (
    <>
      <a className="skip" href="#the-day">Skip to the details</a>

      <div className="layout">
        <aside className="stage" aria-label="Lakehall at Nena’s Sanctuary">
          <div className="arch">
            <Image
              className="arch__art"
              src="/assets/hero-art.webp"
              fill
              sizes="(min-width: 64rem) 36vw, 84vw"
              preload
              fetchPriority="high"
              alt="Watercolour of a bride and groom in a naval dress uniform beneath a white floral arch, on a round stage beside the lake at Nena’s Sanctuary."
            />
          </div>
          <p className="stage__caption">Lakehall at Nena’s Sanctuary</p>
        </aside>

        <SectionIndex items={SECTIONS} />

        <main className="programme">
          <section className="welcome" id="welcome" aria-labelledby="welcome-title">
            <p className="welcome__kicker caps rise" style={step(0)}>Save the date</p>
            <h1 className="welcome__names rise" id="welcome-title" style={step(1)}>
              <Image src="/assets/names.png" width={1600} height={720} sizes="(min-width: 64rem) 30rem, 82vw" preload alt="Javez & Janel" />
            </h1>
            <Sprig className="rise" style={step(2)} />
            <p className="welcome__date rise" style={step(3)}>
              <time dateTime="2027-04-26">04.26.2027</time>
            </p>
            <p className="welcome__venue caps rise" style={step(4)}>
              Lakehall at Nena’s Sanctuary<br />Cabuyao, Laguna
            </p>
            <p className="welcome__follow rise" style={step(5)}>Formal invitation to follow</p>
          </section>

          <section className="leaf day" id="the-day" aria-labelledby="day-title">
            <h2 className="leaf__title" id="day-title">The day</h2>
            <p className="leaf__lead">
              We’re getting married beside the lake at Nena’s Sanctuary, and we would love you there.
            </p>

            <div className="day__grid">
              <MonthCalendar />
              <dl className="facts">
                <div className="fact">
                  <dt className="caps">Date</dt>
                  <dd>Monday, April 26, 2027</dd>
                </div>
                <div className="fact">
                  <dt className="caps">Venue</dt>
                  <dd>Lakehall at Nena’s Sanctuary<br />Cabuyao, Laguna</dd>
                </div>
                <div className="fact">
                  <dt className="caps">Countdown</dt>
                  <dd><Countdown initialDays={daysUntilWedding()} /></dd>
                </div>
              </dl>
            </div>

            <div className="actions">
              <a className="btn btn--solid" href="/assets/javez-janel-wedding.ics" download>Add to calendar</a>
              <a className="btn btn--line" href={MAPS_URL} target="_blank" rel="noopener">
                Open in Maps<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </section>

          <section className="leaf dress" id="dress-code" aria-labelledby="dress-title">
            <h2 className="dress__title" id="dress-title">Light Spring Cocktail</h2>
            <p className="dress__tone caps">
              Light <span aria-hidden="true">•</span> Romantic <span aria-hidden="true">•</span> Refined
            </p>
            <div className="dress__body">
              <p>We invite our guests to dress in light, airy spring hues and elegant cocktail attire. Think soft and warm pastels, delicate florals, and breathable fabrics such as chiffon, silk, satin, and linen blends.</p>
              <p>For ladies, midi to floor-length dresses are encouraged. For gentlemen, we recommend lightweight suits or tailored trousers with a dress shirt — ties are entirely optional.</p>
              <p>Kindly opt for a modest, polished attire. Please avoid wearing black or white. Florals are, however, most welcome!</p>
            </div>
            <ul className="dress__notes" aria-label="At a glance">
              <li><span className="dress__mark dress__mark--yes" aria-hidden="true" />Soft pastels, florals, chiffon, silk, satin, linen</li>
              <li><span className="dress__mark dress__mark--no" aria-hidden="true" />Black or white</li>
            </ul>
          </section>

          <section className="leaf attire" id="attire" aria-labelledby="attire-title">
            <h2 className="leaf__title" id="attire-title">Attire by role</h2>
            <p className="leaf__lead">Choose your part in the day to see its palette.</p>
            <AttireTabs />
          </section>

          <footer className="closing">
            <Sprig />
            <h2 className="closing__title caps">Formal invitation to follow</h2>
            <p className="closing__note">
              Ceremony times and the RSVP will arrive with your invitation. Until then, please keep the date free.
            </p>
            <p className="closing__sign">With love,</p>
            <Image className="closing__names" src="/assets/names.png" width={1600} height={720} sizes="18rem" alt="Javez & Janel" />
            <p className="closing__meta">
              <span className="caps"><time dateTime="2027-04-26">04.26.2027</time> · Cabuyao, Laguna</span>
              <a href="#welcome">Back to top</a>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

function Sprig({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`sprig ${className}`} style={style} viewBox="0 0 160 24" aria-hidden="true" focusable="false">
      <path className="sprig__line" d="M4 12h56M100 12h56" />
      <path className="sprig__stem" d="M64 12c10 0 22 0 32 0" />
      <path className="sprig__leaf" d="M80 12c-3-6-1-9 0-10 1 1 3 4 0 10Z" />
      <path className="sprig__leaf" d="M72 12c-5-3-6-6-6-8 2 0 5 2 6 8Z" />
      <path className="sprig__leaf" d="M88 12c5-3 6-6 6-8-2 0-5 2-6 8Z" />
      <path className="sprig__leaf" d="M72 12c-5 3-6 6-6 8 2 0 5-2 6-8Z" />
      <path className="sprig__leaf" d="M88 12c5 3 6 6 6 8-2 0-5-2-6-8Z" />
      <circle className="sprig__bud" cx="80" cy="12" r="1.6" />
    </svg>
  );
}
