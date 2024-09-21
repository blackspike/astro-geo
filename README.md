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

## Check it's working

Once built, when you visit the app in your browser you should see `countryCode: GB` or whatever your country is.

## Customise per region

Let's show £ if you're in the UK, € if you're in the EU and default to $ in the rest of the world

```astro
---
const countryCode = Object.fromEntries(Astro.request.headers)?.["cf-ipcountry"]?.toLowerCase()

const euCodes = [ "at", "be", "bg", "hr", "cy", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hu", "ie", "it", "lv", "lt", "lu", "mt", "nl", "pl", "pt", "ro", "sk", "si", "es", "se",
];

// Default usd
let geolocatedSymbol = "$";
let geolocatedPrice = "19.99";

// If gb
if (countryCode === "gb") {
  geolocatedSymbol = "£";
  geolocatedPrice = "29.99";
}
// If in eu
else if (euCodes.includes(countryCode)) {
  geolocatedSymbol = "€";
  geolocatedPrice = "39.99";
}
---

<h2 style="font-size: 5vw; font-weight: 300;">
  Price: {geolocatedSymbol+geolocatedPrice}
</h2>
```

## Done!

Check