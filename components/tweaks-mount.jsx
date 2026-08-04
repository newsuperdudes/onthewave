/* TweaksMount — small panel for hotel slides.
   Lets user toggle: caption visibility, photo cycle speed, polaroid tilt amount,
   show/hide mini-map, scrim strength. Persists via __edit_mode_set_keys. */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showCaptions": true,
  "showMiniMap": true,
  "cycleMs": 3200,
  "tiltScale": 1.0,
  "scrimBoost": 0.0,
  "limeAccent": true
}/*EDITMODE-END*/;

function HotelTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks via CSS variables on :root, so any of our hotel slides can read them.
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--hc-show-cap', t.showCaptions ? '1' : '0');
    r.style.setProperty('--hc-show-map', t.showMiniMap ? 'block' : 'none');
    r.style.setProperty('--hc-cycle-ms', String(t.cycleMs));
    r.style.setProperty('--hc-tilt-scale', String(t.tiltScale));
    r.style.setProperty('--hc-scrim-boost', String(t.scrimBoost));
    r.style.setProperty('--hc-accent', t.limeAccent ? '#f2ff54' : '#ffd86b');
    // Notify HotelCards to re-read cycle interval
    window.dispatchEvent(new CustomEvent('hc-tweak', { detail: t }));
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Hotel cards · 06A–06F" />
      <TweakToggle label="Photo captions" value={t.showCaptions}
                   onChange={(v) => setTweak('showCaptions', v)} />
      <TweakToggle label="Mini-map sticker" value={t.showMiniMap}
                   onChange={(v) => setTweak('showMiniMap', v)} />
      <TweakToggle label="Lime accent (off = amber)" value={t.limeAccent}
                   onChange={(v) => setTweak('limeAccent', v)} />
      <TweakSlider label="Cycle speed" value={t.cycleMs} min={1500} max={7000} step={100} unit="ms"
                   onChange={(v) => setTweak('cycleMs', v)} />
      <TweakSlider label="Polaroid tilt" value={t.tiltScale} min={0} max={2.5} step={0.1} unit="×"
                   onChange={(v) => setTweak('tiltScale', v)} />
      <TweakSlider label="Background fade" value={t.scrimBoost} min={-0.3} max={0.4} step={0.05}
                   onChange={(v) => setTweak('scrimBoost', v)} />
    </TweaksPanel>
  );
}

const tweaksMount = document.createElement('div');
document.body.appendChild(tweaksMount);
ReactDOM.createRoot(tweaksMount).render(<HotelTweaks/>);
