const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Replace .cta-sweep-bg definitions with robust pure CSS
const oldSweepRegex = /\/\* Background Sweep Layers[\s\S]*?\.cta-banner-btn:hover \.cta-sweep-bg\s*\{[\s\S]*?\}/;

const newSweepCss = `/* Background Sweep Layers (scales from left to right with spring bounce) */
.cta-sweep-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.55s var(--spring-bounce);
  pointer-events: none;
  z-index: 1;
}

.cta-banner-btn:hover .cta-sweep-bg,
.group:hover .cta-sweep-bg {
  transform: scaleX(1) !important;
}`;

css = css.replace(oldSweepRegex, newSweepCss);
fs.writeFileSync('style.css', css, 'utf8');
console.log('Updated style.css with robust .cta-sweep-bg rule!');

// 2. Update index.html to ensure clean cta-sweep-bg on all buttons
let html = fs.readFileSync('index.html', 'utf8');

// Remove origin-left scale-x-0 from cta-sweep-bg elements so there is zero conflict with Tailwind transform
html = html.replace(/class="cta-sweep-bg ([^"]*?)origin-left scale-x-0([^"]*?)"/g, 'class="cta-sweep-bg $1$2"');
html = html.replace(/\s+pointer-events-none/g, ' pointer-events-none');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Cleaned up cta-sweep-bg in index.html!');

