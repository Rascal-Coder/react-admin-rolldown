const HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

// Existing functions
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = HEX_COLOR_REGEX.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const value = 1 * 16_777_216 + r * 65_536 + g * 256 + b;
  return `#${value.toString(16).slice(1).toUpperCase()}`;
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;
  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case normalizedR:
        h =
          (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
        break;
      case normalizedG:
        h = (normalizedB - normalizedR) / d + 2;
        break;
      case normalizedB:
        h = (normalizedR - normalizedG) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  const normalizedH = h / 360;
  const normalizedS = s / 100;
  const normalizedL = l / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    let normalizedT = t;
    if (normalizedT < 0) {
      normalizedT += 1;
    }
    if (normalizedT > 1) {
      normalizedT -= 1;
    }
    if (normalizedT < 1 / 6) {
      return p + (q - p) * 6 * normalizedT;
    }
    if (normalizedT < 1 / 2) {
      return q;
    }
    if (normalizedT < 2 / 3) {
      return p + (q - p) * (2 / 3 - normalizedT) * 6;
    }
    return p;
  };

  let r: number;
  let g: number;
  let b: number;

  if (normalizedS === 0) {
    r = normalizedL;
    g = normalizedL;
    b = normalizedL; // achromatic
  } else {
    const q =
      normalizedL < 0.5
        ? normalizedL * (1 + normalizedS)
        : normalizedL + normalizedS - normalizedL * normalizedS;
    const p = 2 * normalizedL - q;
    r = hue2rgb(p, q, normalizedH + 1 / 3);
    g = hue2rgb(p, q, normalizedH);
    b = hue2rgb(p, q, normalizedH - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// New alpha functions
export function hexToRgba(hex: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  let cleanHex = hex.replace("#", "");

  if (cleanHex.length === 6) {
    cleanHex += "FF"; // Add full opacity if no alpha
  }

  if (cleanHex.length === 8) {
    return {
      r: Number.parseInt(cleanHex.slice(0, 2), 16),
      g: Number.parseInt(cleanHex.slice(2, 4), 16),
      b: Number.parseInt(cleanHex.slice(4, 6), 16),
      a: Number.parseInt(cleanHex.slice(6, 8), 16) / 255,
    };
  }

  return { r: 0, g: 0, b: 0, a: 1 };
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const alpha = Math.round(a * 255);
  const value = 1 * 16_777_216 + r * 65_536 + g * 256 + b;
  return (
    "#" +
    value.toString(16).slice(1).toUpperCase() +
    alpha.toString(16).padStart(2, "0").toUpperCase()
  );
}

export function rgbaToHsla(
  r: number,
  g: number,
  b: number,
  a: number
): { h: number; s: number; l: number; a: number } {
  const hsl = rgbToHsl(r, g, b);
  return { ...hsl, a };
}

export function hslaToRgba(
  h: number,
  s: number,
  l: number,
  a: number
): { r: number; g: number; b: number; a: number } {
  const rgb = hslToRgb(h, s, l);
  return { ...rgb, a };
}
