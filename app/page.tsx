import Image from "next/image";
import type { CSSProperties } from "react";
import { Countdown } from "./components/Countdown";
import { SiteNav } from "./components/SiteNav";
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
          preload
          fetchPriority="high"
          alt="Watercolour of a bride and groom in a naval dress uniform beneath a white floral arch, on a round stage beside the lake at Nena’s Sanctuary."
        />
      </div>

      <a className="skip" href="#the-day">Skip to the details</a>

      <header className="hero" id="top">
        <SiteNav />

        <div className="hero__text">
          <p className="hero__kicker caps reveal" style={stagger(0)}>Save the date</p>
          <h1 className="hero__names reveal" style={stagger(1)}>
            <Image src="/assets/names.png" width={1600} height={720} sizes="(min-width: 54rem) 34rem, 80vw" preload alt="Javes & Janel" />
          </h1>
          <p className="hero__date reveal" style={stagger(2)}>
            <time dateTime="2027-04-26">04.26.2027</time>
          </p>
          <p className="hero__venue caps reveal" style={stagger(3)}>
            Lakehall at Nena’s Sanctuary<br />Cabuyao, Laguna
          </p>
        </div>
    {/* <p className="hero__banner caps">Formal invitation to follow</p> */}
        <a className="hero__cue caps reveal" style={stagger(5)} href="#the-day">
          Wedding details
          <span className="hero__cue-arrow" aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="band" id="the-day" aria-labelledby="day-title">
          <div className="frame frame--wide">
            <div className="paper paper--card day">
              <p className="eyebrow caps">Wedding Details</p>
              <h2 className="day__title" id="day-title">We are getting married!</h2>
              <Ornament />
              <p className="day__lead">
              By God’s grace and with our parents’ blessing, we are about to say our vows and become one, and we’d love you to witness and be part of the celebration. 
              The formal invitation, program, and RSVPs will follow. 
              For now, we ask that you save our wedding date for us.
              </p>

              <dl className="day__facts">
                <div className="fact">
                  <dt className="caps">Date</dt>
                  <dd>Monday<br />April 26, 2027</dd>
                </div>
                <div className="fact">
                  <dt className="caps">Venue</dt>
                  <dd>Lakehall at Nena’s Sanctuary<br />Sta. Rosa, Laguna</dd>
                </div>
                <div className="fact">
                  <dt className="caps">Wedding Countdown</dt>
                  <dd><Countdown initialDays={daysUntilWedding()} /></dd>
                </div>
              </dl>

              <div className="day__actions">
                <a className="btn btn--solid" href="/assets/javez-janel-wedding.ics" download>Add to calendar</a>
                <a className="btn btn--line" href={MAPS_URL} target="_blank" rel="noopener">Open in Maps</a>
              </div>
            </div>
          </div>
        </section>
    
        <section className="band" id="dress-code" aria-labelledby="dress-title">
          <div className="frame">
            <article className="paper paper--card">
              <p className="eyebrow caps">Dress code</p>
              <h2 className="dress__title" id="dress-title">Light Spring Cocktail</h2>
              <p className="dress__tone caps">
                Light <span aria-hidden="true">•</span> Romantic <span aria-hidden="true">•</span> Refined
              </p>
              <Ornament />
              <div className="dress__body">
                <p>We invite our guests to dress in light, airy spring hues and elegant cocktail attire. Think soft and warm pastels, delicate florals, and breathable fabrics such as chiffon, silk, satin, and linen blends.</p>
                <p>For ladies, midi to floor-length dresses are encouraged. For gentlemen, we recommend lightweight suits or tailored trousers with a dress shirt — ties are entirely optional.</p>
                <p>Kindly opt for a modest, polished attire. Please avoid wearing black or white. Florals are, however, most welcome!</p>
              </div>
            </article>

          </div>
        </section>
    
        <section className="band attire" id="attire" aria-labelledby="attire-title">
          <div className="frame">
            <div className="paper paper--card attire__head">
              <p className="eyebrow caps">What to wear</p>
              <h2 className="attire__title" id="attire-title">Color Guide</h2>
              <Ornament />
              <p className="attire__hint">We are excited to see you dress up for our wedding! Feel free to browse the color swatches and sample attire below.</p>
            </div>
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
          <p className="looks__hint caps" aria-hidden="true">Swipe to see all three</p>
        </section>
      </main>

      <footer className="band band--close" aria-labelledby="close-title">
        <div className="frame">
          <div className="paper paper--card close">
            <h2 className="close__title caps" id="close-title">Formal invitation to follow</h2>
            <blockquote className="close__verse">
              <p>“We love because He first loved us.”</p>
              <cite className="caps">1 John 4:19</cite>
            </blockquote>
            <p className="close__sign">With love,</p>
            <Image className="close__names" src="/assets/names.png" width={1600} height={720} sizes="22rem" alt="Javes & Janel" />
            <figure className="cord">
              <Image className="cord__art" src="/assets/three-fold-cord.webp" width={1129} height={430} sizes="(min-width: 40rem) 22rem, 78vw"
                alt="Watercolour of three braided cords in champagne, sage and powder blue looped into one, tied with a sprig of white roses." />
              {/*}
              <figcaption className="cord__caption">
                “A cord of three strands is not quickly broken.”
                <cite className="caps">Ecclesiastes 4:12</cite>
              </figcaption>
              */}
            </figure>
            <p className="close__meta caps">
              <time dateTime="2027-04-26">04.26.2027</time> <span aria-hidden="true">•</span> Cabuyao, Laguna
            </p>
          </div>
        
        </div>
      </footer>
    </>
  );
}

/* the seven spring swatches from the guest palette, set as a divider */
function Ornament() {
  return (
    <span className="ornament" aria-hidden="true">
      <i /><i /><i /><i /><i /><i /><i />
    </span>
  );
}
