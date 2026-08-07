# Sreekkuttan & Athira Wedding Invitation

A responsive wedding invitation built with Next.js and ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Deploy to Vercel

1. Extract this ZIP file.
2. Upload the extracted project to a GitHub repository.
3. In Vercel, select **Add New → Project** and import that repository.
4. Keep the detected framework as **Next.js** and select **Deploy**.
5. After deployment, add `NEXT_PUBLIC_SITE_URL` in Vercel project settings with your final Vercel or custom-domain URL, then redeploy. This keeps social-sharing preview links correct.

## Main files

- `app/page.tsx` — invitation content and interactions
- `app/globals.css` — complete design and responsive styling
- `app/layout.tsx` — title, description, and social-sharing metadata
- `public/wedding-cover.jpeg` — opening invitation cover
- `public/invitation-card.jpeg` — detailed invitation card

The opening screen now contains only the **Open Invitation** button beneath the couple's names.
