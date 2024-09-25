# Astro Geolocation

Here's how to use [Astro server islands](https://astro.build/blog/future-of-astro-server-islands/) and [Cloudflare geo headers](https://developers.cloudflare.com/network/ip-geolocation/) to display a different price by region.

![webpage showing "Cloudflare Geolocation Price: £29.99"](public/gb.png)

Demo: https://astro-geo.pages.dev

## Create a new Astro project

`npm create astro@latest astro-geo`

For this simple case, set 'Empty project'/'No Typescript'/'Install dependencies'/'Initialize a new git repository' options

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
const countryCode = Astro.request.headers.get("cf-ipcountry")
---

<h1>countryCode: {countryCode}</h1>
```

<aside>
Note: [it's been pointed out](https://www.reddit.com/r/astrojs/comments/1flz2zy/i_had_an_interesting_use_case_for_astro_server/) that other services offer similar headers, that we've not tested but worth noting:

- [Vercel](https://vercel.com/changelog/ip-geolocation-for-serverless-functions): `Astro.request.headers.get('X-Vercel-IP-Country')`
- [AWS](https://aws.amazon.com/about-aws/whats-new/2020/07/cloudfront-geolocation-headers/): `Astro.request.headers.get('cloudfront-viewer-country')`
- Netlify: `Astro.request.headers.get('x-country')` (see the Netlify branch for a demo)
- If there's one for Azure Static Web Apps, [let us know](https://www.blackspike.com/contact)!
</aside>

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
const countryCode = Astro.request.headers.get("cf-ipcountry")

const euCodes = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];

// Default USD
let geolocatedSymbol = "$";
let geolocatedPrice = 19.99;

// If GB
if (countryCode === "GB") {
  geolocatedSymbol = "£";
  geolocatedPrice = 29.99;
}
// If in EU
else if (euCodes.includes(countryCode)) {
  geolocatedSymbol = "€";
  geolocatedPrice = 39.99;
}
---

<h2>
  Price: {geolocatedSymbol + geolocatedPrice}
</h2>
```

## Done!

Push your code up and check the build in your browser. If you have a vpn, try switching between US/UK/EU servers and reloading.

### View live demo: [astro-geo.pages.dev](https://astro-geo.pages.dev)

If you need an [Astro](https://www.blackspike.com/services/astro-vue-websites) website, do [get in touch](https://www.blackspike.com/contact)!


![webpage showing "Cloudflare Geolocation Price: €39.99"](public/eu.png)
![webpage showing "Cloudflare Geolocation Price: £29.99"](public/gb.png)
![webpage showing "Cloudflare Geolocation Price: €39.99"](public/us.png)