# Astro Geolocation

## Add the Cloudflare adapter

`npx astro add cloudflare`

## Enable server islands

This will be default in Astro 5.0, but for now add the following to `astro.config.mjs`

```js
export default defineConfig({
  experimental: {
    serverIslands: true,
  },
});
```

## Add a GeoLocation component

In the frontmatter, grab the Cloudflare `cf-ipcountry` header

```astro
---
const countryCode = Object.fromEntries(Astro.request.headers)?.["cf-ipcountry"]
---

<h1>countryCode: {countryCode}</h1>
```

## Add the component to index.astro as a server island

Just add the `server:defer` attribute: `<GeoLocation server:defer />`

## Create a new Cloudflare pages app

Publish your project to GitHub/Lab and crate a pages app from it via your Cloudflare dashboard


