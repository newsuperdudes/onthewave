/* HotelCards — 5 polaroid carousel slides, one per hotel.
   Mounted into #hotel-cards-mount. Uses Tweaks for active card + photo cycling. */
const { useState, useEffect, useRef } = React;

const HOTEL_CARDS = [
  {
    id: 'lagonissi',
    num: '06A',
    name: 'Grand Resort Lagonissi',
    region: 'Athenian Riviera · Attica',
    hub: 'ATH',
    transfer: '20 min',
    stars: 5,
    rooms: 276,
    board: 'À-la-carte',
    beach: 'Private 72-acre peninsula · regatta on-site',
    statusKey: 'confirmed',
    statusLabel: '✓ Confirmed · primary',
    note: 'Leading Hotels of the World. Full buyout 276 rooms — Oct 6–9 only. Closest to ATH.',
    bg: 'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/lagonissi/01-aerial-peninsula.png',
    bgScrim: 'rgba(245,239,228,0.38)',
    pinX: 62, pinY: 48,   // % within mini map silhouette
    frame: 'landscape',
    photos: [
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/lagonissi/01-aerial-peninsula.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/lagonissi/02-suite-seaview.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/lagonissi/03-terrace-sunset.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/lagonissi/04-grand-hall.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/lagonissi/05-ballroom.png',
    ],
    captions: ['PENINSULA · AERIAL', 'SUITE · SEAVIEW', 'TERRACE · SUNSET', 'GRAND HALL · ENTRANCE', 'BALLROOM · INTERIOR'],
    amenities: ['Padel', '2× floodlit tennis', 'Basketball', 'Beach volley', 'Mini-golf', 'Mini-soccer', 'Open-air cinema', 'Flyboard · diving · water-ski'],
    amenitiesSrc: 'lagonissiresort.gr · easyJet',
  },
  {
    id: 'evereden',
    num: '06B',
    name: 'Vincci EverEden',
    region: 'Anavyssos · Athenian Riviera',
    hub: 'ATH',
    transfer: '50 km',
    stars: 4,
    rooms: 'TBC',
    board: 'All-Inclusive',
    beach: 'Beach + pools · Mavro Lithari',
    statusKey: null,
    statusLabel: '',
    note: 'Beach property on Riviera. Capacity & AI package to confirm.',
    bg: 'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/evereden/01-pool-sea.png',
    bgScrim: 'rgba(245,239,228,0.40)',
    pinX: 60, pinY: 53,
    frame: 'landscape',
    photos: [
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/evereden/01-pool-sea.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/evereden/02-facade-arches.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/evereden/03-terrace-lounge.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/evereden/04-suite-seaview.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/evereden/05-conference.png',
    ],
    captions: ['POOL · SEAVIEW', 'FACADE · STONE ARCHES', 'TERRACE LOUNGE · BEACH', 'SUITE · SEAVIEW', 'CONFERENCE ROOM'],
    amenities: ['Tennis', 'Volleyball', 'Mini-golf', '5-a-side football', 'Aqua park (sea)', 'PADI diving centre', 'Water-ski · wakeboard school', '2 outdoor + 1 indoor pool'],
    amenitiesSrc: 'tripadvisor · loveholidays',
  },
  {
    id: 'zeus',
    num: '06C',
    name: 'Zeus Eleva Ajul + Kassandra Lagoon',
    region: 'Halkidiki · Kassandra',
    hub: 'SKG',
    transfer: '90 min',
    stars: 5,
    rooms: '256 (166+90)',
    board: 'Full AI',
    beach: 'Beach + pools · 58 private-pool rooms',
    statusKey: 'option',
    statusLabel: '◇ Combo option',
    note: 'Two adjacent properties (~7–9 km apart). 5 restaurants, 6 bars. Risk: shuttle logistics.',
    bg: 'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/zeus/01-aerial-pools.jpg',
    bgScrim: 'rgba(245,239,228,0.40)',
    pinX: 47, pinY: 22,
    frame: 'landscape',
    photos: [
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/zeus/01-aerial-pools.jpg',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/zeus/02-firepits-sea.jpg',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/zeus/03-balcony-seaview.jpg',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/zeus/04-suite-lounge.jpg',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/zeus/05-bedroom-arch.jpg',
    ],
    captions: ['AERIAL · POOLS · SEA', 'FIREPITS · SEAVIEW', 'BALCONY · SEAVIEW', 'SUITE · LOUNGE', 'BEDROOM · ARCH'],
    amenities: ['1× tennis', '1× padel', '1× football', '1× basketball', 'Beach volley + volley', '7 outdoor + 1 indoor pool', 'Adventure Park · hiking · archery', 'Seaside yoga deck'],
    amenitiesSrc: 'zeusintl.com (official)',
  },
  {
    id: 'laguna',
    num: '06D',
    name: "Mitsis Selection Laguna",
    region: 'Crete · Anissaras · Hersonissos',
    hub: 'HER',
    transfer: '30 min',
    stars: 5,
    rooms: 351,
    board: 'Ultra AI · 24h',
    beach: 'Beachfront · Anissaras · pools',
    statusKey: 'option',
    statusLabel: "★ Vlad's favourite",
    note: 'Ultra AI, 8 restaurants. 351 rooms — comfortably above the ~195 we need.',
    bg: 'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/laguna/01-pool-palace.png',
    bgScrim: 'rgba(245,239,228,0.40)',
    pinX: 65, pinY: 86,
    frame: 'landscape',
    photos: [
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/laguna/01-pool-palace.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/laguna/03-suite-poolview.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/laguna/05-lounge-sunset.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/laguna/04-terrace-jacuzzi.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/laguna/02-spa-pool.png',
    ],
    captions: ['POOL · PALACE FACADE', 'SUITE · POOLVIEW', 'TERRACE LOUNGE · SUNSET', 'TERRACE · JACUZZI', 'INDOOR SPA POOL'],
    amenities: ['Tennis court', 'Basketball', 'Beach volleyball', 'Water polo', 'Aqua-aerobics · aqua gym', 'Fitness centre + spa', 'Watersports on Anissaras beach', 'Indoor heated pool'],
    amenitiesSrc: 'mitsishotels.com · to verify',
  },
  {
    id: 'rinela',
    num: '06E',
    name: 'Mitsis Selection Rinela',
    region: 'Crete · Kokkini Hani',
    hub: 'HER',
    transfer: '20 min',
    stars: 5,
    rooms: 430,
    board: 'Ultra AI',
    beach: 'Direct beachfront · pools',
    statusKey: 'option',
    statusLabel: '★ Reopens May 2026',
    note: 'Refurbished. 5 restaurants, 8 bars. 400-pax indoor theatre + 100-pax breakout.',
    bg: 'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/rinela/01-aerial-beach.png',
    bgScrim: 'rgba(245,239,228,0.40)',
    pinX: 67, pinY: 85,
    frame: 'landscape',
    photos: [
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/rinela/01-aerial-beach.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/rinela/02-pool-reflection.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/rinela/03-suite-seaview.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/rinela/04-cabana-pool.png',
      'https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/hotel-photos/rinela/05-palms-pool.png',
    ],
    captions: ['AERIAL · BEACHFRONT SUITES', 'INFINITY POOL · REFLECTION', 'SUITE · SEAVIEW', 'PRIVATE CABANA · POOL', 'PALM AVENUE · POOL'],
    amenities: ['Tennis court', 'Football pitch', 'Basketball', 'Beach volley', 'Water polo', 'Watersports on beach', '400-pax indoor theatre', 'Mini-club + playgrounds'],
    amenitiesSrc: 'mitsishotels.com · to verify',
  },
];

/* small icon-free pin map of greece — abstract silhouette + active dot */
function MiniMap({ x, y }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <pattern id="dotsHC" patternUnits="userSpaceOnUse" width="1.4" height="1.4">
          <circle cx="0.7" cy="0.7" r="0.18" fill="rgba(10,10,8,0.42)"/>
        </pattern>
      </defs>
      {/* Greece mainland (rough) */}
      <path d="M40 12 L50 8 L62 10 L72 14 L78 20 L74 26 L68 28 L64 34 L60 40 L56 46 L54 52 L58 58 L52 62 L46 60 L42 54 L38 50 L34 44 L32 36 L28 30 L30 22 L34 16 Z"
            fill="url(#dotsHC)" stroke="rgba(10,10,8,0.50)" strokeWidth="0.35"/>
      {/* Crete */}
      <path d="M52 82 L62 80 L72 81 L80 84 L82 88 L78 90 L70 91 L60 90 L52 88 Z"
            fill="url(#dotsHC)" stroke="rgba(10,10,8,0.50)" strokeWidth="0.35"/>
      {/* hub labels */}
      <g style={{ fontFamily: 'JetBrains Mono, monospace', fill: 'rgba(10,10,8,0.55)' }}>
        <text x="60" y="44" fontSize="3.4" letterSpacing="0.3">ATH</text>
        <text x="65" y="79" fontSize="3.4" letterSpacing="0.3">HER</text>
        <text x="40" y="20" fontSize="3.4" letterSpacing="0.3">SKG</text>
      </g>
      {/* active pin */}
      <g>
        <circle cx={x} cy={y} r="6" fill="none" stroke="#1a1612" strokeWidth="0.4" opacity="0.5">
          <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.05;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx={x} cy={y} r="2.6" fill="var(--lime)" stroke="#1a1612" strokeWidth="0.5"/>
      </g>
    </svg>
  );
}

function Stars({ n }) {
  return (
    <span style={{ letterSpacing: '3px', color: '#1a1612', fontSize: 18 }}>
      {'★'.repeat(n)}<span style={{ opacity: 0.22 }}>{'★'.repeat(5-n)}</span>
    </span>
  );
}

/* Landscape vintage-frame carousel — for hotels with mostly 16:9 photos.
   Frame is 1536x1024 (3:2). Inner window: 15.3% L, 15.5% T, 15.4% R, 25.7% B.
   Inner aspect ≈ 16:9. */
function LandscapeFrameCarousel({ photos, captions, tilt = -2.0 }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interval_, setInterval_] = useState(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hc-cycle-ms')) || 3200);
  const [showCap, setShowCap] = useState((getComputedStyle(document.documentElement).getPropertyValue('--hc-show-cap').trim() || '1') !== '0');
  const [tiltScale, setTiltScale] = useState(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hc-tilt-scale')) || 1.0);

  useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {};
      if (typeof d.cycleMs === 'number') setInterval_(d.cycleMs);
      if (typeof d.showCaptions === 'boolean') setShowCap(d.showCaptions);
      if (typeof d.tiltScale === 'number') setTiltScale(d.tiltScale);
    };
    window.addEventListener('hc-tweak', handler);
    return () => window.removeEventListener('hc-tweak', handler);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI(p => (p + 1) % photos.length), interval_);
    return () => clearInterval(t);
  }, [photos.length, paused, interval_]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: 680,
        aspectRatio: '1536 / 1024',
        transform: `rotate(${tilt * tiltScale}deg)`,
        filter: 'drop-shadow(0 28px 48px rgba(20,16,8,0.32)) drop-shadow(0 8px 14px rgba(20,16,8,0.18))',
        userSelect: 'none',
      }}
    >
      {/* photo region — fills the inner window of the vintage frame */}
      <div style={{
        position: 'absolute',
        left: '15.3%', right: '15.4%', top: '15.5%', bottom: '25.7%',
        overflow: 'hidden',
        background: '#0a0a08',
      }}>
        {photos.map((src, idx) => (
          <img key={idx} src={src} alt={captions[idx] || ''}
               style={{
                 position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', display: 'block',
                 opacity: idx === i ? 1 : 0,
                 transform: idx === i ? 'scale(1)' : 'scale(1.04)',
                 transition: 'opacity 700ms ease, transform 4500ms ease-out',
               }}/>
        ))}
        {/* film grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,240,210,0.05), rgba(20,12,4,0.10))',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}/>
        {/* caption inside photo */}
        {showCap && (
          <div style={{
            position: 'absolute', left: 14, bottom: 14,
            background: 'rgba(10,10,8,0.78)',
            color: 'var(--plaster-0)',
            padding: '5px 10px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>
            {captions[i]}
          </div>
        )}
        {/* counter top-right */}
        <div style={{
          position: 'absolute', right: 12, top: 12,
          background: 'rgba(245,239,228,0.85)',
          color: '#1a1612',
          padding: '3px 8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, letterSpacing: '0.18em',
        }}>
          {String(i+1).padStart(2,'0')}/{String(photos.length).padStart(2,'0')}
        </div>
      </div>

      {/* vintage frame on top (PNG with transparency in window area) */}
      <img src="https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/assets/frame-vintage-cream.png" alt=""
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}/>

      {/* dots in the bottom strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: '8%',
        display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center',
      }}>
        {photos.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
                  style={{
                    width: idx === i ? 22 : 8, height: 8,
                    borderRadius: 100, border: '1px solid rgba(10,10,8,0.55)',
                    background: idx === i ? '#1a1612' : 'rgba(10,10,8,0.08)',
                    padding: 0, cursor: 'pointer',
                    transition: 'all 280ms ease',
                  }}
                  aria-label={`photo ${idx+1}`}/>
        ))}
      </div>

      {/* prev/next invisible hit zones */}
      <button onClick={() => setI(p => (p - 1 + photos.length) % photos.length)}
              style={{ position: 'absolute', left: '15.3%', top: '15.5%', width: '34.6%', height: '58.8%', background: 'transparent', border: 0, cursor: 'w-resize' }}
              aria-label="previous"/>
      <button onClick={() => setI(p => (p + 1) % photos.length)}
              style={{ position: 'absolute', right: '15.4%', top: '15.5%', width: '34.6%', height: '58.8%', background: 'transparent', border: 0, cursor: 'e-resize' }}
              aria-label="next"/>
    </div>
  );
}

/* Polaroid with internal photo carousel + dots + caption.
   Auto-cycles photos every interval ms. */
function PolaroidCarousel({ photos, captions, tilt = -2.4 }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interval_, setInterval_] = useState(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hc-cycle-ms')) || 3200);
  const [showCap, setShowCap] = useState((getComputedStyle(document.documentElement).getPropertyValue('--hc-show-cap').trim() || '1') !== '0');
  const [tiltScale, setTiltScale] = useState(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hc-tilt-scale')) || 1.0);

  useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {};
      if (typeof d.cycleMs === 'number') setInterval_(d.cycleMs);
      if (typeof d.showCaptions === 'boolean') setShowCap(d.showCaptions);
      if (typeof d.tiltScale === 'number') setTiltScale(d.tiltScale);
    };
    window.addEventListener('hc-tweak', handler);
    return () => window.removeEventListener('hc-tweak', handler);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI(p => (p + 1) % photos.length), interval_);
    return () => clearInterval(t);
  }, [photos.length, paused, interval_]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: 560,
        aspectRatio: '702 / 844',
        transform: `rotate(${tilt * tiltScale}deg)`,
        filter: 'drop-shadow(0 28px 48px rgba(20,16,8,0.32)) drop-shadow(0 8px 14px rgba(20,16,8,0.18))',
        userSelect: 'none',
      }}
    >
      {/* photo region — fills the inner window of the polaroid frame */}
      <div style={{
        position: 'absolute',
        left: '6.6%', right: '6.4%', top: '5.0%', bottom: '21.5%',
        overflow: 'hidden',
        background: '#0a0a08',
      }}>
        {photos.map((src, idx) => (
          <img key={idx} src={src} alt={captions[idx] || ''}
               style={{
                 position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', display: 'block',
                 opacity: idx === i ? 1 : 0,
                 transform: idx === i ? 'scale(1)' : 'scale(1.04)',
                 transition: 'opacity 700ms ease, transform 4500ms ease-out',
               }}/>
        ))}
        {/* film grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,240,210,0.08), rgba(20,12,4,0.18))',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}/>
        {/* caption inside photo */}
        {showCap && (
          <div style={{
            position: 'absolute', left: 14, bottom: 14,
            background: 'rgba(10,10,8,0.78)',
            color: 'var(--plaster-0)',
            padding: '5px 10px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>
            {captions[i]}
          </div>
        )}
        {/* counter top-right */}
        <div style={{
          position: 'absolute', right: 12, top: 12,
          background: 'rgba(245,239,228,0.85)',
          color: '#1a1612',
          padding: '3px 8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, letterSpacing: '0.18em',
        }}>
          {String(i+1).padStart(2,'0')}/{String(photos.length).padStart(2,'0')}
        </div>
      </div>

      {/* polaroid frame on top (PNG with transparency in the window area) */}
      <img src="https://ihlyzizdnecykfqslxge.supabase.co/storage/v1/object/public/presentation-assets/onthewave/stickers/polaroid-real-frame.png" alt=""
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}/>

      {/* dots in the bottom strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: '11%',
        display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center',
      }}>
        {photos.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
                  style={{
                    width: idx === i ? 22 : 8, height: 8,
                    borderRadius: 100, border: '1px solid rgba(10,10,8,0.55)',
                    background: idx === i ? '#1a1612' : 'rgba(10,10,8,0.08)',
                    padding: 0, cursor: 'pointer',
                    transition: 'all 280ms ease',
                  }}
                  aria-label={`photo ${idx+1}`}/>
        ))}
      </div>

      {/* prev/next invisible hit zones */}
      <button onClick={() => setI(p => (p - 1 + photos.length) % photos.length)}
              style={{ position: 'absolute', left: '6.6%', top: '5%', width: '40%', height: '74%', background: 'transparent', border: 0, cursor: 'w-resize' }}
              aria-label="previous"/>
      <button onClick={() => setI(p => (p + 1) % photos.length)}
              style={{ position: 'absolute', right: '6.4%', top: '5%', width: '40%', height: '74%', background: 'transparent', border: 0, cursor: 'e-resize' }}
              aria-label="next"/>
    </div>
  );
}

const STATUS_BG = {
  confirmed: '#f2ff54',
  rfp:       '#ffd86b',
  option:    '#b5e6ff',
};

function HotelSlide({ h, idx }) {
  const [showMap, setShowMap] = useState((getComputedStyle(document.documentElement).getPropertyValue('--hc-show-map').trim() || 'block') !== 'none');
  const [scrimBoost, setScrimBoost] = useState(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hc-scrim-boost')) || 0);
  const [accent, setAccent] = useState((getComputedStyle(document.documentElement).getPropertyValue('--hc-accent').trim() || '#f2ff54'));

  useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {};
      if (typeof d.showMiniMap === 'boolean') setShowMap(d.showMiniMap);
      if (typeof d.scrimBoost === 'number') setScrimBoost(d.scrimBoost);
      if (typeof d.limeAccent === 'boolean') setAccent(d.limeAccent ? '#f2ff54' : '#ffd86b');
    };
    window.addEventListener('hc-tweak', handler);
    return () => window.removeEventListener('hc-tweak', handler);
  }, []);

  // build a scrim string with boost applied
  const baseAlpha = parseFloat((h.bgScrim.match(/[\d.]+(?=\))/) || ['0.3'])[0]);
  const a1 = Math.max(0, Math.min(0.92, baseAlpha + scrimBoost));
  const a2 = Math.max(0, Math.min(0.95, 0.55 + scrimBoost));
  const a3 = Math.max(0, Math.min(0.98, 0.78 + scrimBoost));

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
      {/* full-bleed bg + scrim */}
      <img src={h.bg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.92)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(245,239,228,${a1}), rgba(245,239,228,${a2}) 60%, rgba(245,239,228,${a3}))` }}/>
      {/* paper grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(10,10,8,0.04) 1px, transparent 1px)', backgroundSize: '3px 3px', mixBlendMode: 'multiply', pointerEvents: 'none' }}/>

      <div className="slide-content" style={{ position: 'relative', padding: '64px 96px', height: '100%', boxSizing: 'border-box' }}>

        {/* chrome top */}
        <div className="chrome-top">
          <span><span className="dot"></span>{h.num} · HOTEL · {h.id.toUpperCase()}</span>
          <span>{idx+1}/{HOTEL_CARDS.length} · ONE PER SLIDE</span>
        </div>

        {/* main grid: polaroid LEFT, info RIGHT */}
        <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '660px 1fr', gap: 80, alignItems: 'start' }}>

          {/* LEFT — frame carousel + map sticker beneath */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {h.frame === 'landscape' ? (
              <LandscapeFrameCarousel
                photos={h.photos}
                captions={h.captions}
                tilt={[-2.0, 1.8, -1.2, -2.0, 1.4][idx]}/>
            ) : (
              <PolaroidCarousel
                photos={h.photos}
                captions={h.captions}
                tilt={[-2.4, 1.8, -1.2, -2.0, 1.4][idx]}/>
            )}

            {/* mini map below polaroid, slightly overlapping */}
            {showMap && (
            <div style={{
              position: 'relative',
              width: 220, height: 220,
              marginTop: h.frame === 'landscape' ? -40 : -24,
              marginLeft: h.frame === 'landscape' ? 440 : 280,
              transform: 'rotate(3deg)',
              background: 'var(--plaster-0)',
              border: '1px solid rgba(10,10,8,0.18)',
              padding: 14,
              filter: 'drop-shadow(0 14px 26px rgba(20,16,8,0.22))',
            }}>
              <MiniMap x={h.pinX} y={h.pinY}/>
              <div style={{
                position: 'absolute', left: 14, bottom: 6,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#1a1612',
              }}>HUB · {h.hub}</div>
            </div>
            )}
          </div>

          {/* RIGHT — info */}
          <div style={{ position: 'relative', paddingTop: 12 }}>

            {/* status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: STATUS_BG[h.statusKey] || 'var(--plaster-0)',
              color: '#1a1612',
              padding: '6px 14px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
              border: '1px solid rgba(10,10,8,0.25)',
            }}>{h.statusLabel}</div>

            {/* numarker + name */}
            <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 14, letterSpacing: '0.32em',
                color: 'rgba(10,10,8,0.55)',
                textTransform: 'uppercase',
              }}>{h.num}</span>
              <Stars n={h.stars}/>
            </div>

            <h2 style={{
              margin: '12px 0 0',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 86, lineHeight: 1.1, letterSpacing: '-0.025em',
              color: '#1a1612',
            }}>
              <span style={{
                background: 'var(--plaster-0)',
                padding: '0 14px',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                boxShadow: '0 6px 22px rgba(0,0,0,0.06)',
              }}>{h.name}</span>
            </h2>

            <div style={{
              marginTop: 18,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(10,10,8,0.62)',
            }}>{h.region}</div>

            {/* spec strip */}
            <div style={{
              marginTop: 38,
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 36px',
              maxWidth: 720,
            }}>
              <Spec k="Hub · transfer" v={`${h.hub} · ${h.transfer}`}/>
              <Spec k="Rooms" v={String(h.rooms)}/>
              <Spec k="Board" v={h.board}/>
              <Spec k="Beach" v={h.beach} wide/>
            </div>

            <div style={{
              marginTop: 32, paddingTop: 20,
              borderTop: '1px solid rgba(10,10,8,0.18)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 19, lineHeight: 1.5,
              color: 'rgba(10,10,8,0.78)',
              maxWidth: 680,
            }}>{h.note}</div>

            {/* on-site amenities strip — sports / leisure facilities */}
            {h.amenities && h.amenities.length > 0 && (
              <div style={{ marginTop: 22, maxWidth: 720 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'rgba(10,10,8,0.5)',
                  marginBottom: 10,
                }}>
                  <span style={{ flex: '0 0 auto' }}>{'On-site · sports & leisure'}</span>
                  <span style={{ flex: 1, height: 1, background: 'rgba(10,10,8,0.18)' }}></span>
                  {h.amenitiesSrc && (
                    <span style={{ flex: '0 0 auto', color: 'rgba(10,10,8,0.38)' }}>{'src · '}{h.amenitiesSrc}</span>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 6px' }}>
                  {h.amenities.map((a, i) => (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '4px 10px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 11, letterSpacing: '0.08em',
                      color: '#1a1612',
                      background: 'rgba(255,255,255,0.55)',
                      border: '1px solid rgba(10,10,8,0.22)',
                    }}>{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* tape strip — index */}
            <div style={{
              position: 'absolute', right: -20, top: -18,
              transform: 'rotate(8deg)',
              background: accent,
              color: '#1a1612',
              padding: '10px 18px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: 14, letterSpacing: '0.22em', textTransform: 'uppercase',
              boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
            }}>{idx+1} / {HOTEL_CARDS.length}</div>
          </div>
        </div>

        <div className="chrome-bottom">
          <span>HOVER POLAROID TO PAUSE · CLICK PHOTO L/R TO STEP</span>
          <span>{h.num}</span>
        </div>
      </div>
    </div>
  );
}

function Spec({ k, v, wide }) {
  return (
    <div style={{
      gridColumn: wide ? '1 / -1' : 'auto',
      borderBottom: '1px solid rgba(10,10,8,0.28)',
      paddingBottom: 10,
      background: 'linear-gradient(180deg, rgba(245,239,228,0.78), rgba(245,239,228,0.62))',
      padding: '8px 12px 10px',
      borderLeft: '2px solid rgba(10,10,8,0.45)',
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(10,10,8,0.78)', marginBottom: 4, fontWeight: 600,
      }}>{k}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#0a0a08', fontFamily: "'Inter', sans-serif", lineHeight: 1.25 }}>{v}</div>
    </div>
  );
}

/* mount each card into its own slide container */
HOTEL_CARDS.forEach((h, idx) => {
  const el = document.getElementById(`hotel-card-mount-${h.id}`);
  if (el) {
    ReactDOM.createRoot(el).render(<HotelSlide h={h} idx={idx}/>);
  }
});
