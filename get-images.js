async function getImages() {
  const r = await fetch('https://innoveity.com/');
  const t = await r.text();
  const matches = [...t.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  console.log(matches.filter(m => m.match(/jpg|jpeg|png|webp|svg/i)));
}
getImages();
