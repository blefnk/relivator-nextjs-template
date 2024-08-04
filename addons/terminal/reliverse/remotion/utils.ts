const { cos, exp, sin, sqrt } = Math;

export function getProgress(
  frame: number,
  totalFrames: number,
  totalStars: number,
  fps: number,
) {
  const table = getTable(totalFrames, totalStars, fps);

  if (frame >= table.length - 1) {
    return totalStars;
  }

  // @ts-expect-error - TS doesn't know that the table is sorted
  return table[frame][2];
}

function getTable(totalFrames: number, totalStars: number, fps: number) {
  const table = [];
  let x0 = 0;
  let v0 = 0;

  for (let frame = 0; frame < totalFrames; frame++) {
    const target = Math.ceil(
      easeInOutCubic(frame / (totalFrames - 1)) * totalStars,
    );

    const { v, x } = customSpring({
      c: 26, // Damping
      k: 170, // Stiffness
      m: 1, // Mass
      t: 1000 / fps,
      t0: 0,
      v0,
      X: target,
      x0,
    });

    x0 = x;
    v0 = v;
    table.push([frame, target, x]);
  }

  return table;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

// From  https://github.com/pomber/use-spring/blob/master/src/spring.ts
function customSpring({
  c,
  k,
  m,
  t,
  t0,
  v0,
  X,
  x0,
}: {
  c: number;
  k: number;
  m: number;
  t: number;
  t0: number;
  v0: number;
  X: number;
  x0: number;
}) {
  const dx = x0 - X;
  const dt = (t - t0) / 1000;
  const radicand = c ** 2 - 4 * k * m;

  if (radicand > 0) {
    const rp = (-c + sqrt(radicand)) / (2 * m);
    const rn = (-c - sqrt(radicand)) / (2 * m);
    const a = (dx * rp - v0) / (rp - rn);
    const b = (v0 - dx * rn) / (rp - rn);

    return {
      v: a * rn * exp(rn * dt) + b * rp * exp(rp * dt),
      x: X + a * exp(rn * dt) + b * exp(rp * dt),
    };
  }

  if (radicand < 0) {
    const r = -c / (2 * m);
    const s = sqrt(-radicand) / (2 * m);
    const a = dx;
    const b = (v0 - r * dx) / s;

    return {
      v:
        exp(r * dt) *
        ((b * s + a * r) * cos(s * dt) - (a * s - b * r) * sin(s * dt)),
      x: X + exp(r * dt) * (a * cos(s * dt) + b * sin(s * dt)),
    };
  }

  const r = -c / (2 * m);
  const a = dx;
  const b = v0 - r * dx;

  return {
    v: (b + a * r + b * r * dt) * exp(r * dt),
    x: X + (a + b * dt) * exp(r * dt),
  };
}
