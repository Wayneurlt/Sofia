/**
 * Keyboard-like typing sounds using the Web Audio API.
 * - Each keypress varies slightly (pitch/gain/filter) so it doesn't sound identical.
 * - Different characters (newline/punctuation) use a softer/tuned variant.
 *
 * No audio files needed.
 */

let audioContext: AudioContext | null = null;
let lastSoundMs = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioContext;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function useTypingSound() {
  function playTypingSound(key?: string) {
    const nowMs = Date.now();
    // Rate-limit so fast typing doesn't become a noisy blur
    if (nowMs - lastSoundMs < 18) return;
    lastSoundMs = nowMs;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});

      const now = ctx.currentTime;
      const isNewline = key === '\n' || key === '\r';
      const isPunctuation = key === ',' || key === '.' || key === '!' || key === '?' || key === '…' || key === ';' || key === ':';

      // Softer on newline, slightly louder on punctuation
      const thudGainBase = isNewline ? rand(0.08, 0.14) : isPunctuation ? rand(0.18, 0.26) : rand(0.14, 0.22);
      const clickGainBase = isNewline ? rand(0.015, 0.03) : isPunctuation ? rand(0.04, 0.075) : rand(0.03, 0.06);

      // Thud
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = 'sine';
      const startFreq = isPunctuation ? rand(90, 120) : rand(80, 112);
      const endFreq = rand(34, 58);
      const thudDecay = isPunctuation ? rand(0.016, 0.024) : rand(0.012, 0.02);
      thud.frequency.setValueAtTime(startFreq, now);
      thud.frequency.exponentialRampToValueAtTime(endFreq, now + thudDecay);
      thudGain.gain.setValueAtTime(thudGainBase, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + thudDecay * 1.2);
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.start(now);
      thud.stop(now + 0.03);

      // Click (bandpassed short noise burst)
      const clickLength = Math.max(1, Math.floor(ctx.sampleRate * rand(0.004, 0.007))); // ~4–7ms
      const clickBuffer = ctx.createBuffer(1, clickLength, ctx.sampleRate);
      const clickData = clickBuffer.getChannelData(0);
      for (let i = 0; i < clickLength; i++) {
        const t = i / clickLength;
        // Biased decay so it sounds like a transient tick
        clickData[i] = (Math.random() * 2 - 1) * (1 - t) * (1 - t);
      }

      const clickSource = ctx.createBufferSource();
      clickSource.buffer = clickBuffer;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = 'bandpass';
      clickFilter.frequency.value = isPunctuation ? rand(2200, 3200) : rand(1800, 2800);
      clickFilter.Q.value = rand(0.9, 2.0);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(clickGainBase, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + rand(0.004, 0.008));

      clickSource.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickSource.start(now);
      clickSource.stop(now + 0.02);
    } catch {
      // Ignore errors (e.g. context closed)
    }
  }

  return { playTypingSound };
}
