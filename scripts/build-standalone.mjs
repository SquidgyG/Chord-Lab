import fs from 'fs/promises';
import path from 'path';

async function buildStandalone() {
  const projectRoot = process.cwd();
  const offlineDir = path.join(projectRoot, 'offline');
  const distDir = path.join(offlineDir, 'dist');

  const indexIn = path.join(distDir, 'index.html');
  const cssIn = path.join(distDir, 'styles.css');
  const jsIn = path.join(distDir, 'main.js');
  const outFile = path.join(projectRoot, 'chord-lab-standalone.html');

  try {
    const [indexHtml, css, js] = await Promise.all([
      fs.readFile(indexIn, 'utf-8'),
      fs.readFile(cssIn, 'utf-8'),
      fs.readFile(jsIn, 'utf-8'),
    ]);

    // Replace Tailwind CDN with inlined compiled CSS
    let html = indexHtml.replace(
      /<script\s+src="https:\/\/cdn\.tailwindcss\.com"><\/script>/,
      `<style>\n${css}\n</style>`
    );

    // Inline bundled JS (handle common path pattern from offline index)
    html = html.replace(
      /<script\s+src="(?:\.\/)?dist\/main\.js"><\/script>/,
      `<script>\n${js}\n</script>`
    );

    await fs.writeFile(outFile, html, 'utf-8');
    console.log(`Standalone built: ${outFile}`);
  } catch (err) {
    console.error('Failed to build standalone file:', err);
    process.exitCode = 1;
  }
}

buildStandalone();
