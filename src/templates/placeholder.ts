/**
 * Generated cover art for recipes that do not yet have photography.
 *
 * A recipe with `image: null` gets a deterministic SVG written to
 * assets/img/, derived from its slug so the same recipe always produces the
 * same artwork and two recipes never collide. This exists because shipping a
 * duplicated stock photo, or a hotlink that might 404, is worse than honest
 * illustration. Replacing one is a single field change in the recipe data.
 */

/** Stable 32-bit hash of a string, so art is reproducible across builds. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* Warm palettes drawn from the site's accent range, one picked per recipe. */
const PALETTES: { from: string; to: string; ink: string }[] = [
  { from: '#f3b562', to: '#c9541f', ink: '#7a2f0e' },
  { from: '#f7d08a', to: '#d97b29', ink: '#84420f' },
  { from: '#eab464', to: '#b8471f', ink: '#6d2a10' },
  { from: '#f0c987', to: '#c26a2b', ink: '#7c3c12' },
  { from: '#f6c99f', to: '#bf5b28', ink: '#733212' },
  { from: '#e9b44c', to: '#c0562a', ink: '#77300f' }
];

/* Simple line motifs, chosen by category so a collection reads as a set. */
const MOTIFS: Record<string, string[]> = {
  breakfast: [
    // Fried egg and a steaming cup.
    '<ellipse cx="0" cy="10" rx="86" ry="58" fill="rgba(255,255,255,.92)"/>',
    '<circle cx="6" cy="4" r="30" fill="currentColor" opacity=".85"/>',
    '<path d="M120 -34h58a20 20 0 0 1 0 40h-8" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="7" stroke-linecap="round"/>',
    '<rect x="60" y="-34" width="64" height="70" rx="10" fill="rgba(255,255,255,.9)"/>',
    '<path d="M74 -60c0-10 10-10 10-20M92 -60c0-10 10-10 10-20" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="6" stroke-linecap="round"/>'
  ],
  'quick-dinners': [
    '<path d="M-96 24a96 44 0 0 0 192 0z" fill="rgba(255,255,255,.92)"/>',
    '<path d="M-96 24h192" stroke="currentColor" stroke-width="6" opacity=".5"/>',
    '<path d="M-40 -30c14-18 66-18 80 0" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="7" stroke-linecap="round"/>'
  ],
  'healthy-food': [
    '<circle cx="0" cy="6" r="78" fill="rgba(255,255,255,.92)"/>',
    '<circle cx="0" cy="6" r="52" fill="none" stroke="currentColor" stroke-width="6" opacity=".45"/>',
    '<path d="M-26 6c0-30 22-52 52-52 0 30-22 52-52 52z" fill="currentColor" opacity=".8"/>'
  ],
  desserts: [
    '<path d="M-70 -20h140l-22 84a16 16 0 0 1-16 12h-48a16 16 0 0 1-16-12z" fill="rgba(255,255,255,.92)"/>',
    '<path d="M-70 -20c14-34 126-34 140 0z" fill="currentColor" opacity=".8"/>',
    '<circle cx="0" cy="-46" r="12" fill="rgba(255,255,255,.95)"/>'
  ]
};

/**
 * Builds the SVG cover for one recipe.
 * @param {{slug:string, category:string, title:string}} recipe
 * @returns {string} SVG markup, 1200x800
 */
function placeholderSvg(recipe: { slug: string; category: string; title: string }): string {
  const seed = hash(recipe.slug);
  // Non-null: the modulo keeps the index in range, and every category has a
  // motif with a documented fallback.
  const palette = PALETTES[seed % PALETTES.length]!;
  const motif = MOTIFS[recipe.category] ?? MOTIFS['quick-dinners']!;

  // Scatter a few soft blobs, positioned deterministically from the seed.
  const blobs = [0, 1, 2, 3]
    .map((i: number) => {
      const s = hash(recipe.slug + i);
      const cx = 80 + (s % 1040);
      const cy = 60 + ((s >> 8) % 680);
      const r = 60 + ((s >> 16) % 130);
      const o = 0.05 + ((s >> 24) % 7) / 100;
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" opacity="${o.toFixed(2)}"/>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="${escapeAttr(
    recipe.title
  )}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.from}"/>
      <stop offset="1" stop-color="${palette.to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  ${blobs}
  <g transform="translate(600 400) scale(2.1)" color="${palette.ink}">
    ${motif.join('\n    ')}
  </g>
</svg>
`;
}

function escapeAttr(value: string): string {
  return String(value).replace(/[&<>"']/g, (c: string) => {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>)[c]!;
  });
}

export { placeholderSvg, hash };
