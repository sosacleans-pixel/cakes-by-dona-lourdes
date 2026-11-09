# Cakes by Doña Lourdes

Static one-page website for Cakes by Doña Lourdes, a homemade, special-order Dominican cake brand. Delivery and shipping only. No storefront. One cake: a media libra bizcocho that arrives fully assembled in a lidded gold tin.

Custom domain: https://cakesbydonalourdes.salimheyaime.com

## DNS

The owner adds this record himself. This repository does not change live DNS.

On the DNS zone for `salimheyaime.com`:

| Type  | Host               | Value                      |
| ----- | ------------------ | -------------------------- |
| CNAME | cakesbydonalourdes | sosacleans-pixel.github.io |

## GitHub Pages

After merge to `main`, enable GitHub Pages for this repository (free): deploy from the `main` branch, folder `/` (root). The `CNAME` file sets the custom domain above. The site is meant to be indexed. There is no `noindex`.

## Preview locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080
