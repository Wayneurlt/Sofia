/**
 * Plays a short, keyboard-like typing sound using the Web Audio API (no audio file needed).
 * Mimics a soft mechanical key: low "thud" + subtle "click".
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioContext;
}

export function useTypingSound() {
  function playTypingSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. Low "thud" – key bottoming out (80–120 Hz, short decay)
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(95, now);
      thud.frequency.exponentialRampToValueAtTime(40, now + 0.012);
      thudGain.gain.setValueAtTime(0.22, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.start(now);
      thud.stop(now + 0.02);

      // 2. High "click" – mechanical tick (short filtered noise burst)
      const clickLength = Math.floor(ctx.sampleRate * 0.006); // 6 ms
      const clickBuffer = ctx.createBuffer(1, clickLength, ctx.sampleRate);
      const clickData = clickBuffer.getChannelData(0);
      for (let i = 0; i < clickLength; i++) {
        const t = i / clickLength;
        clickData[i] = (Math.random() * 2 - 1) * (1 - t) * (1 - t);
      }
      const clickSource = ctx.createBufferSource();
      clickSource.buffer = clickBuffer;
      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = 'bandpass';
      clickFilter.frequency.value = 2400;
      clickFilter.Q.value = 1.2;
      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.06, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.006);
      clickSource.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickSource.start(now);
      clickSource.stop(now + 0.006);
    } catch {
      // Ignore errors (e.g. context closed)
    }
  }

  return { playTypingSound };
}
