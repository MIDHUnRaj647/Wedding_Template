# Midhun & Aswathi — Wedding Website

A responsive single-page Hindu/Brahmin traditional wedding website with:

- Parchment / sepia aesthetic
- Handwritten typography
- Uploaded courtyard illustration as hero background
- Uploaded M&A logo
- Responsive mobile navigation
- Live countdown
- Muhurtham / reception details
- Family section
- Bride & groom section
- Location section
- Photo/memory gallery placeholders
- Scroll reveal animations
- Subtle hero animation
- Reduced-motion accessibility support

## Run locally

Open `index.html` in a browser.

For best results, use a small local server:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Replace content

### Photos

Replace the placeholder blocks in `index.html` with:

```html
<img src="assets/midhun.jpg" alt="Midhun" />
```

and similarly for Aswathi / gallery images.

### Wedding date

Edit the following line in `script.js`:

```js
const weddingDate = new Date("2026-11-08T09:24:00+05:30").getTime();
```

### Names / family details / venue

All text is directly editable in `index.html`.

### Google Maps

Replace:

```html
https://maps.app.goo.gl/XfURjULs8HH8Jcoc7
```

with the actual Google Maps share URL for the venue.

## Design direction

The visual system is intentionally built around:

- `#f4e4c4` parchment
- `#71341f` brown
- `#8c2f1c` traditional red
- `#a67839` muted gold
- Caveat for handwritten headings
- Cormorant Garamond for elegant body text

The next refinement should be replacing the CSS placeholder sketches with custom transparent PNG/SVG line-art of:

- Kerala nilavilakku
- mango leaves / thoranam
- jasmine / temple flowers
- Kerala nalukettu
- brass uruli
- conch
- homa kundam
- coconut palms
- hand-drawn map
