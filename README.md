# Northbound — crew trip board

Static Next.js site for your Russia trip. Everyone sees the same day board: where you are, flights, notes, and todos.

## Edit the trip

All content lives in one file:

```
src/data/trip.ts
```

Update cities, `whereWeAre`, notes, todos, or add more days. Redeploy when you’re done.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Hostinger (static)

```bash
npm run build
```

This creates an `out/` folder. Upload **everything inside `out/`** to your Hostinger public HTML folder (often `public_html`).

Hostinger: File Manager or FTP → replace site files with the contents of `out/`.
