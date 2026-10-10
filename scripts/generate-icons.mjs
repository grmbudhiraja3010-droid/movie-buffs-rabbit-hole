#!/usr/bin/env node
/**
 * Movie Buff's Rabbit Hole — Generates public/icons/icon-{16,32,48,128}.png
 * Cinematic film reel badge in warm gold/crimson noir.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';

const SIZES = [16, 32, 48, 128];
const SS = 4; // supersampling per axis

const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [(h >> 16) & 255, (h >> 8) & 255, h & 255];
const GOLD = hex(0xf59e0b); // Cinema Gold
const CRIMSON = hex(0xe11d48); // Velvet Crimson
const BG_DARK = hex(0x0f172a); // Noir Slate
const FILM_REEL = hex(0xffffff);

function insideRoundedRect(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = x < x0 + r ? x0 + r : x > x1 - r ? x1 - r : x;
  const cy = y < y0 + r ? y0 + r : y > y1 - r ? y1 - r : y;
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
}

function ringCoverage(x, y, cx, cy, r, width) {
  const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  return Math.abs(d - r) <= width / 2;
}

function insideCircle(x, y, cx, cy, r) {
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
}

function shade(x, y) {
  if (!insideRoundedRect(x, y, 1, 1, 31, 31, 8)) return [0, 0, 0, 0];
  const t = Math.min(1, Math.max(0, (x + y - 4) / 44));
  let c = [lerp(CRIMSON[0], GOLD[0], t), lerp(CRIMSON[1], GOLD[1], t), lerp(CRIMSON[2], GOLD[2], t)];

  const mix = (ink, a) => {
    c = [lerp(c[0], ink[0], a), lerp(c[1], ink[1], a), lerp(c[2], ink[2], a)];
  };

  // Outer film ring
  if (ringCoverage(x, y, 16, 16, 10, 2.5)) mix(BG_DARK, 0.9);
  // Center hub
  if (insideCircle(x, y, 16, 16, 3.5)) mix(BG_DARK, 0.95);
  // 4 Film reel holes
  const holes = [
    [16, 10],
    [16, 22],
    [10, 16],
    [22, 16],
  ];
  for (const [hx, hy] of holes) {
    if (insideCircle(x, y, hx, hy, 2.0)) mix(BG_DARK, 0.85);
  }

  // Top gloss highlight
  if (insideRoundedRect(x, y, 3, 3, 29, 12, 4)) mix([255, 255, 255], 0.22);

  return [c[0], c[1], c[2], 1];
}

function render(size) {
  const scale = 32 / size;
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const [cr, cg, cb, ca] = shade((x + (sx + 0.5) / SS) * scale, (y + (sy + 0.5) / SS) * scale);
          r += cr * ca; g += cg * ca; b += cb * ca; a += ca;
        }
      }
      const n = SS * SS;
      const i = (y * size + x) * 4;
      px[i] = a ? Math.round(r / a) : 0;
      px[i + 1] = a ? Math.round(g / a) : 0;
      px[i + 2] = a ? Math.round(b / a) : 0;
      px[i + 3] = Math.round((a / n) * 255);
    }
  }
  return px;
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, rgba) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const outDir = new URL('../public/icons/', import.meta.url);
await mkdir(outDir, { recursive: true });
for (const size of SIZES) {
  await writeFile(new URL(`icon-${size}.png`, outDir), encodePng(size, render(size)));
  console.log(`✓ icon-${size}.png`);
}
