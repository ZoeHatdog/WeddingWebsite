import Image from "next/image";
import type { CSSProperties } from "react";
import { Countdown } from "./components/Countdown";
import { MAPS_URL, daysUntilWedding } from "./lib/wedding";

export const revalidate = 86400;

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Home() {
  return (
    <>
      <div className="backdrop">
        <Image
          className="backdrop__art"
          src="/assets/hero-art.webp"
          fill
          sizes="100vw"
          priority
          alt="Watercolour of a bride and groom in a naval dress uniform beneath a white floral arch, on a round stage beside the lake at Nena’s Sanctuary."
        />
      </div>

      <a className="skip" href="#the-day">Skip to the details</a>

      <header className="hero" id="top">
        <nav className="nav" aria-label="Sections">
          <a className="nav__mark" href="#top" aria-label="Javez and Janel, back to top">
            J <span aria-hidden="true">&amp;</span> J
          </a>
          <ul className="nav__links">
            <li><a href="#the-day">The day</a></li>
            <li><a href="#dress-code">Dress code</a></li>
            <li><a href="#attire">Attire</a></li>
          </ul>
        </nav>

        <div className="hero__text">
          <p className="hero__kicker caps reveal" style={stagger(0)}>Save the date</p>
          <h1 className="hero__names reveal" style={stagger(1)}>
            <Image src="/assets/names.png" width={1600} height={720} sizes="(min-width: 54rem) 34rem, 80vw" priority alt="Javez & Janel" />
          </h1>
          <p className="hero__date reveal" style={stagger(2)}>
            <time dateTime="2027-04-26">04.26.2027</time>
          </p>
          <p className="hero__venue caps reveal" style={stagger(3)}>
            Lakehall at Nena’s Sanctuary<br />Cabuyao, Laguna
          </p>
        </div>
    {/* <p className="hero__banner caps">Formal invitation to follow</p> */}
      </header>

      <main>
        <section className="day glass" id="the-day" aria-labelledby="day-title">
          <div className="day__intro">
            <h2 className="day__title" id="day-title">Keep the 26th of April for us</h2>
            <p className="day__lead">
              We’re getting married beside the lake at Nena’s Sanctuary, and we would love you there.
              The formal invitation, with ceremony times and the RSVP, will follow.
            </p>
          </div>

          <dl className="day__facts">
            <div className="fact">
              <dt className="caps">When</dt>
              <dd>Monday, April 26, 2027</dd>
            </div>
            <div className="fact">
              <dt className="caps">Where</dt>
              <dd>Lakehall at Nena’s Sanctuary<br />Cabuyao, Laguna</dd>
            </div>
            <div className="fact">
              <dt className="caps">Until then</dt>
              <dd><Countdown initialDays={daysUntilWedding()} /></dd>
            </div>
          </dl>

          <div className="day__actions">
            <a className="btn btn--solid" href="/assets/javez-janel-wedding.ics" download>Add to calendar</a>
            <a className="btn btn--line" href={MAPS_URL} target="_blank" rel="noopener">Open in Maps</a>
          </div>
        </section>

        <section className="sky-band" id="dress-code" aria-labelledby="dress-title">
          <div className="frame">
            <article className="paper paper--card">
              <h2 className="dress__title" id="dress-title">Light Spring Cocktail</h2>
              <p className="dress__tone caps">
                Light <span aria-hidden="true">•</span> Romantic <span aria-hidden="true">•</span> Refined
              </p>
              <div className="dress__body">
                <p>We invite our guests to dress in light, airy spring hues and elegant cocktail attire. Think soft and warm pastels, delicate florals, and breathable fabrics such as chiffon, silk, satin, and linen blends.</p>
                <p>For ladies, midi to floor-length dresses are encouraged. For gentlemen, we recommend lightweight suits or tailored trousers with a dress shirt — ties are entirely optional.</p>
                <p>Kindly opt for a modest, polished attire. Please avoid wearing black or white. Florals are, however, most welcome!</p>
              </div>
            </article>

          </div>
        </section>

        <section className="attire" id="attire" aria-labelledby="attire-title">
          <div className="attire__head glass">
            <h2 className="attire__title" id="attire-title">What to wear, by role</h2>
            <p className="attire__hint">Each part of the celebration has its own palette. Find yours below.</p>
          </div>

          <ol className="looks" role="list">
            <li className="look paper paper--torn">
              <h3 className="look__title caps">Principal sponsors, officiant</h3>
              <Image className="look__art" src="/assets/attire-principal.webp" width={900} height={947} sizes="(min-width: 64rem) 24rem, 84vw"
                alt="A nude chiffon gown with lace sleeves and a tan suit with an open-collar white shirt." />
              <p className="look__caption">Shades of nude</p>
            </li>

            <li className="look paper paper--torn">
              <h3 className="look__title caps">Secondary sponsors</h3>
              <Image className="look__art" src="/assets/attire-secondary.webp" width={900} height={854} sizes="(min-width: 64rem) 26rem, 84vw"
                alt="A tiered butter-yellow gown beside swatches of yellow, powder blue, sage and moss green, and a dusty-blue suit beside swatches of slate and dusk blue." />
              <div className="look__pair">
                <p className="look__caption">Maid of Honor,<br />Secondary Sponsors,<br />Flower Girls</p>
                <p className="look__caption">Groomsmen,<br />Bible Bearer,<br />Coins Bearer</p>
              </div>
            </li>

            <li className="look paper paper--torn">
              <h3 className="look__title caps">Guests</h3>
              <Image className="look__art look__art--narrow" src="/assets/attire-guests.webp" width={760} height={923} sizes="(min-width: 64rem) 21rem, 72vw"
                alt="A lilac floral midi dress and a camel blazer over grey trousers." />
              <p className="look__caption">Light Spring Colors</p>
              <Image className="look__swatches" src="/assets/swatches-guests.webp" width={900} height={103} sizes="(min-width: 64rem) 24rem, 84vw"
                alt="Palette: blush pink, apricot, butter yellow, lavender, powder blue, sage green and nude." />
            </li>
          </ol>
        </section>
      </main>

      <footer className="sky-band sky-band--close" aria-labelledby="close-title">
        <div className="frame">
          <div className="paper paper--card close">
            <h2 className="close__title caps" id="close-title">Formal invitation to follow</h2>
            <p className="close__note">Until then, please keep the date free.</p>
            <p className="close__sign">With love,</p>
            <Image className="close__names" src="/assets/names.png" width={1600} height={720} sizes="22rem" alt="Javez & Janel" />
            <p className="close__meta caps">
              <time dateTime="2027-04-26">04.26.2027</time> <span aria-hidden="true">•</span> Cabuyao, Laguna
            </p>
          </div>
        
        </div>
      </footer>
    </>
  );
}

function FloralFoot() {
  return (
    <Image className="frame__foot" src="/assets/flowers-strip.webp" width={1600} height={268} sizes="(min-width: 42rem) 51rem, 125vw" alt="" />
  );
}
