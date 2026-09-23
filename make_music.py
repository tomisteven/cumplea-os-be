# Genera una melodia romantica original (piano music-box) en formato WAV.
# Luego se codifica a MP3 con ffmpeg.
import numpy as np

SR = 44100
BPM = 72.0
BEAT = 60.0 / BPM           # duracion de una negra
DUR = BEAT * 32              # 8 compases x 4 negras
N = int(SR * DUR)

t = np.arange(N) / SR

def piano(f, dur, vel=0.55, bright=0.25):
    """Nota tipo piano/music-box: parciales con decay exponencial."""
    n = int(SR * dur)
    tt = np.arange(n) / SR
    e = np.exp(-tt * (3.2 + 2.2 * bright))
    a = np.exp(-tt * 1.1)
    w = e * a * tt  # attack suave
    w[: int(SR * 0.004)] = np.linspace(0, w[int(SR * 0.004)], int(SR * 0.004))
    tone = (np.sin(2 * np.pi * f * tt) +
            0.45 * np.sin(2 * np.pi * f * 2 * tt) +
            0.18 * np.sin(2 * np.pi * f * 3 * tt) +
            0.06 * np.sin(2 * np.pi * f * 4.01 * tt))
    # resonancia de cuerda levemente desafinada
    tone += 0.12 * np.sin(2 * np.pi * f * 1.003 * tt + 0.7)
    sig = tone * w
    sig /= np.max(np.abs(sig)) + 1e-9
    return sig * vel

def place(buf, start_s, sig):
    s = int(start_s * SR)
    e = min(s + len(sig), len(buf))
    if s < len(buf):
        buf[s:e] += sig[: e - s]
    return buf

NOTE = {"C": 261.63, "D": 293.66, "E": 329.63, "F": 349.23, "G": 392.00,
        "A": 440.00, "B": 493.88}
def f(note, octave):
    return NOTE[note] * (2 ** (octave - 4))

# Progresion romantica: C - G - Am - F (dos compases por acorde)
CHORDS = [
    (["C", "E", "G"], 0),      # C   (C4 E4 G4)
    (["G", "B", "D"], 0),      # G
    (["A", "C", "E"], 0),      # Am
    (["F", "A", "C"], 0),      # F
]

L = np.zeros(N)   # canal izquierdo
R = np.zeros(N)   # canal derecho

# voz de arpegio (music box)
for ci, (notes, oc) in enumerate(CHORDS):
    start = ci * BEAT * 8
    vol = 0.5
    pattern = [notes[0], notes[1], notes[2], notes[2], notes[1], notes[0],
               notes[1], notes[2], notes[2], notes[1], notes[0], notes[1]]
    pat2 = [notes[2], notes[2], notes[1], notes[1]]   # cierre del compas
    # 2 compases: 24 semicorcheas en total (3 por negra aprox) -> repartimos
    steps = 12
    for k in range(steps):
        nt = pattern[k % len(pattern)]
        fr = f(nt, oc + 1)
        # acento cada 12
        vv = vol * (1.0 if k % 4 == 0 else 0.78)
        sig = piano(fr, BEAT * 0.55, vv)
        L = place(L, start + k * (BEAT * 2 / steps), sig * 0.9)
        # eco derecha retardado
        R = place(R, start + k * (BEAT * 2 / steps) + 0.021, sig * 0.42)

# bajo suave por acorde (sostenido)
for ci, (notes, oc) in enumerate(CHORDS):
    start = ci * BEAT * 8
    for half in range(4):
        root = f(notes[0], oc)
        if half == 0:
            sig = piano(root / 2, BEAT * 2.6, 0.34, bright=0.12)
        else:
            sig = piano(root / 2, BEAT * 1.9, 0.22, bright=0.10)
        L = place(L, start + half * BEAT * 2, sig * 0.9)
        R = place(R, start + half * BEAT * 2 + 0.012, sig * 0.5)

# melodia simple arriba (romantica, ascendente-descendente) en los ultimos 2 acordes
MEL = [
    (0.0, "E", 5, 0.5), (0.4, "G", 5, 0.42), (0.8, "C", 5, 0.55),
    (1.2, "B", 4, 0.42), (1.6, "A", 4, 0.4), (2.2, "G", 4, 0.5),
]
for dt_, nn, oc, vv in MEL:
    base = 2 * BEAT * 8 + dt_ * BEAT
    sig = piano(f(nn, oc), BEAT * 1.1, vv * 0.95)
    L = place(L, base, sig)
    R = place(R, base + 0.016, sig * 0.45)
# ultimo acorde resolucion
sig = piano(f("C", 5), BEAT * 2.2, 0.5)
L = place(L, 3 * BEAT * 8 + BEAT * 1.8, sig)
R = place(R, 3 * BEAT * 8 + BEAT * 1.8 + 0.02, sig * 0.4)

# suave cierre para loop perfecto (fundido en los ultimos 1.5s hacia el inicio)
FADE = int(SR * 1.4)
for ch in (L, R):
    ramp = np.linspace(1, 0, FADE) ** 1.5
    ch[-FADE:] *= ramp
    # que el inicio + final sumen tranquilo (crossfade de 0.8s)
    cf = int(SR * 0.8)
    ch[:cf] *= np.linspace(0.35, 1, cf)

mix = np.stack([L, R], axis=1)
peak = np.max(np.abs(mix))
mix = mix / peak * 0.82
pcm = (mix * 32767).astype(np.int16)

import wave
with wave.open("music_raw.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wav ok", round(len(pcm) / SR, 1), "s", N)