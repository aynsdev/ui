import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'
const logo = readFileSync(new URL('../docs/assets/logo-dark-mode.svg', import.meta.url), 'utf8')
const paths = logo.match(/<path[\s\S]*?<\/svg>/)[0].replace('</svg>', '')
const out = new URL('../docs/public/', import.meta.url)
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 621 621"><rect width="621" height="621" rx="132" fill="#0a0a0a"/>${paths}</svg>`
const lightLogo = readFileSync(new URL('../docs/assets/logo-light-mode.svg', import.meta.url), 'utf8')
const favicon = lightLogo.replace('<path', `<style>
  @media (prefers-color-scheme: dark) {
    path:first-of-type { fill: #3F3F46; }
    path:last-of-type { fill: #FAFAFA; }
  }
</style><path`)
writeFileSync(new URL('icon.svg', out), favicon)
await sharp(Buffer.from(lightLogo)).resize(32,32).png().toFile(new URL('favicon-32.png',out).pathname)
for (const [file, size] of [['apple-touch-icon.png',180],['icon-192.png',192],['icon-512.png',512]]) {
  await sharp(Buffer.from(icon)).resize(size,size).png().toFile(new URL(file,out).pathname)
}
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0a0a0a"/>
<g transform="translate(70 60) scale(.24)">${paths}</g>
<text x="80" y="300" fill="#fafafa" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700" letter-spacing="-4">aynsdev/ui</text>
<text x="84" y="370" fill="#a1a1a1" font-family="Helvetica, Arial, sans-serif" font-size="32">Calm, precise, approachable.</text>
<text x="84" y="535" fill="#a1a1a1" font-family="Helvetica, Arial, sans-serif" font-size="24">Components for considered products.</text>
<text x="1116" y="535" text-anchor="end" fill="#fafafa" font-family="Helvetica, Arial, sans-serif" font-size="24">ui.ayns.dev</text>
</svg>`
await sharp(Buffer.from(og)).png().toFile(new URL('og-image.png',out).pathname)
writeFileSync(new URL('site.webmanifest',out), JSON.stringify({name:'aynsdev/ui',short_name:'aynsdev/ui',start_url:'/',display:'standalone',background_color:'#0a0a0a',theme_color:'#0a0a0a',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}]},null,2)+'\n')
