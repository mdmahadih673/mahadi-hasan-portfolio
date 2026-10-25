const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processAssets() {
  const refPath = path.resolve(__dirname, '../../hero-reference.png');
  const imagesDir = path.resolve(__dirname, '../public/images');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // 1. Copy reference image
  if (fs.existsSync(refPath)) {
    fs.copyFileSync(refPath, path.join(imagesDir, 'hero-reference.png'));
    console.log('Copied hero-reference.png');

    // Extract portrait
    const { data, info } = await sharp(refPath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Crop box for portrait: x: 250 to 774, y: 30 to 575
    const cropX1 = 250;
    const cropX2 = 774;
    const cropY1 = 30;
    const cropY2 = 575;
    const cropW = cropX2 - cropX1;
    const cropH = cropY2 - cropY1;

    const portraitBuf = Buffer.alloc(cropW * cropH * 4);

    for (let y = cropY1; y < cropY2; y++) {
      for (let x = cropX1; x < cropX2; x++) {
        const srcIdx = (y * info.width + x) * 4;
        const dstIdx = ((y - cropY1) * cropW + (x - cropX1)) * 4;

        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];

        // Detect red background letters/graphics: high red, low green and blue
        const isPureRed = (r > 75 && g < 45 && b < 45);
        const isDarkRed = (r > 40 && g < 20 && b < 20);
        const isRedAccent = isPureRed || (isDarkRed && r > (g + b) * 1.5);
        
        // Pure black canvas
        const isCanvasBlack = (r <= 12 && g <= 12 && b <= 12);

        if (isRedAccent || isCanvasBlack) {
          // Transparent background
          portraitBuf[dstIdx] = 0;
          portraitBuf[dstIdx + 1] = 0;
          portraitBuf[dstIdx + 2] = 0;
          portraitBuf[dstIdx + 3] = 0;
        } else {
          // Keep developer pixel
          portraitBuf[dstIdx] = r;
          portraitBuf[dstIdx + 1] = g;
          portraitBuf[dstIdx + 2] = b;
          portraitBuf[dstIdx + 3] = 255;
        }
      }
    }

    // Save cutout portrait
    await sharp(portraitBuf, {
      raw: { width: cropW, height: cropH, channels: 4 }
    })
      .png()
      .toFile(path.join(imagesDir, 'profile.png'));
    console.log('Generated profile.png cutout (size:', cropW, 'x', cropH, ')');

    // Also generate high-contrast editorial portrait card for About section
    await sharp(refPath)
      .extract({ left: 300, top: 40, width: 424, height: 530 })
      .png()
      .toFile(path.join(imagesDir, 'about-portrait.png'));
    console.log('Generated about-portrait.png');
  }

  // 2. Generate Project Previews (No gradients! Clean SVG render through Sharp)
  // FileFlow Project Mockup
  const fileFlowSvg = `
  <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="#0A0A0A" />
    <!-- App Window Frame -->
    <rect x="60" y="50" width="1080" height="650" rx="8" fill="#141414" stroke="#262626" stroke-width="2" />
    <!-- Window Titlebar -->
    <rect x="60" y="50" width="1080" height="50" rx="8" fill="#1A1A1A" />
    <circle cx="95" cy="75" r="7" fill="#A90E02" />
    <circle cx="120" cy="75" r="7" fill="#333333" />
    <circle cx="145" cy="75" r="7" fill="#333333" />
    <text x="600" y="80" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="14" text-anchor="middle" font-weight="bold" letter-spacing="2">FILEFLOW / WINDOWS FILE ORGANIZER v1.4.0</text>
    
    <!-- Sidebar -->
    <rect x="60" y="100" width="260" height="600" fill="#111111" stroke="#262626" stroke-width="1" />
    <text x="90" y="145" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1.5">ORGANIZER CATEGORIES</text>
    <rect x="80" y="165" width="220" height="36" fill="#A90E02" rx="4" />
    <text x="100" y="188" fill="#FFFBD4" font-family="sans-serif" font-size="13" font-weight="bold">● Smart Auto-Sort</text>
    <text x="100" y="232" fill="#A8A8A8" font-family="sans-serif" font-size="13">📁 Development Code</text>
    <text x="100" y="272" fill="#A8A8A8" font-family="sans-serif" font-size="13">📸 Media &amp; Design</text>
    <text x="100" y="312" fill="#A8A8A8" font-family="sans-serif" font-size="13">📑 Archives &amp; Docs</text>
    <text x="100" y="352" fill="#A8A8A8" font-family="sans-serif" font-size="13">⚡ Duplicate Detector</text>
    <rect x="80" y="580" width="220" height="80" fill="#1A1A1A" stroke="#333333" rx="4" />
    <text x="96" y="612" fill="#A8A8A8" font-family="sans-serif" font-size="11">DISK SPACE CLEANED</text>
    <text x="96" y="642" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="20" font-weight="bold">42.8 GB / 100%</text>

    <!-- Main Content Area -->
    <rect x="350" y="130" width="760" height="90" fill="#181818" stroke="#2A2A2A" rx="6" />
    <text x="380" y="168" fill="#FFFBD4" font-family="sans-serif" font-size="20" font-weight="bold">Watching Folder: C:/Users/Downloads</text>
    <text x="380" y="196" fill="#A8A8A8" font-family="sans-serif" font-size="13">Real-time background listener active • 1,420 files scanned</text>
    <rect x="960" y="152" width="120" height="42" fill="#A90E02" rx="4" />
    <text x="1020" y="178" fill="#FFFBD4" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">RUN NOW</text>

    <!-- File Table -->
    <rect x="350" y="245" width="760" height="420" fill="#181818" stroke="#262626" rx="6" />
    <line x1="350" y1="290" x2="1110" y2="290" stroke="#333333" stroke-width="1" />
    <text x="380" y="275" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">TARGET FILE</text>
    <text x="700" y="275" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">DETECTED TYPE</text>
    <text x="890" y="275" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">DESTINATION</text>
    <text x="1040" y="275" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">STATUS</text>

    <text x="380" y="330" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">bundle-v2.1.tar.gz</text>
    <text x="700" y="330" fill="#A8A8A8" font-family="sans-serif" font-size="13">Archive / Code</text>
    <text x="890" y="330" fill="#A8A8A8" font-family="sans-serif" font-size="13">/Dev/Archives</text>
    <text x="1040" y="330" fill="#A90E02" font-family="sans-serif" font-size="12" font-weight="bold">MOVED</text>

    <line x1="350" y1="355" x2="1110" y2="355" stroke="#222222" stroke-width="1" />

    <text x="380" y="395" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">editorial-layout.psd</text>
    <text x="700" y="395" fill="#A8A8A8" font-family="sans-serif" font-size="13">Photoshop Image</text>
    <text x="890" y="395" fill="#A8A8A8" font-family="sans-serif" font-size="13">/Design/Work</text>
    <text x="1040" y="395" fill="#A90E02" font-family="sans-serif" font-size="12" font-weight="bold">MOVED</text>

    <line x1="350" y1="420" x2="1110" y2="420" stroke="#222222" stroke-width="1" />

    <text x="380" y="460" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">react-mern-architecture.pdf</text>
    <text x="700" y="460" fill="#A8A8A8" font-family="sans-serif" font-size="13">PDF Document</text>
    <text x="890" y="460" fill="#A8A8A8" font-family="sans-serif" font-size="13">/Docs/Tech</text>
    <text x="1040" y="460" fill="#A90E02" font-family="sans-serif" font-size="12" font-weight="bold">MOVED</text>

    <line x1="350" y1="485" x2="1110" y2="485" stroke="#222222" stroke-width="1" />

    <text x="380" y="525" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">mongodb-atlas-backup.json</text>
    <text x="700" y="525" fill="#A8A8A8" font-family="sans-serif" font-size="13">JSON Data</text>
    <text x="890" y="525" fill="#A8A8A8" font-family="sans-serif" font-size="13">/Database</text>
    <text x="1040" y="525" fill="#A90E02" font-family="sans-serif" font-size="12" font-weight="bold">MOVED</text>
  </svg>
  `;

  // Users CRUD App Mockup
  const usersCrudSvg = `
  <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="#070707" />
    <rect x="50" y="40" width="1100" height="670" fill="#111111" stroke="#262626" stroke-width="2" rx="10" />
    <!-- Browser Top Bar -->
    <rect x="50" y="40" width="1100" height="48" fill="#1C1C1C" rx="10" />
    <circle cx="85" cy="64" r="6" fill="#A90E02" />
    <circle cx="107" cy="64" r="6" fill="#3A3A3A" />
    <circle cx="129" cy="64" r="6" fill="#3A3A3A" />
    <rect x="240" y="50" width="720" height="28" rx="4" fill="#0C0C0C" />
    <text x="600" y="69" fill="#A8A8A8" font-family="monospace, sans-serif" font-size="12" text-anchor="middle">https://users-crud-mern.app/dashboard/members</text>

    <!-- Header bar inside -->
    <rect x="80" y="110" width="1040" height="70" fill="#171717" stroke="#2E2E2E" rx="6" />
    <text x="110" y="152" fill="#FFFBD4" font-family="sans-serif" font-size="22" font-weight="900" letter-spacing="1">MERN USERS DIRECTORY</text>
    <text x="110" y="170" fill="#A8A8A8" font-family="sans-serif" font-size="12">Next.js App Router + Express.js API + MongoDB Atlas</text>
    <rect x="940" y="125" width="150" height="40" fill="#A90E02" rx="4" />
    <text x="1015" y="150" fill="#FFFBD4" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">+ ADD USER</text>

    <!-- Stats row -->
    <rect x="80" y="200" width="330" height="100" fill="#161616" stroke="#262626" rx="6" />
    <text x="110" y="235" fill="#A8A8A8" font-family="sans-serif" font-size="12">TOTAL REGISTERED</text>
    <text x="110" y="278" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="32" font-weight="bold">1,842</text>

    <rect x="435" y="200" width="330" height="100" fill="#161616" stroke="#262626" rx="6" />
    <text x="465" y="235" fill="#A8A8A8" font-family="sans-serif" font-size="12">ACTIVE SESSIONS</text>
    <text x="465" y="278" fill="#A90E02" font-family="monospace, sans-serif" font-size="32" font-weight="bold">318</text>

    <rect x="790" y="200" width="330" height="100" fill="#161616" stroke="#262626" rx="6" />
    <text x="820" y="235" fill="#A8A8A8" font-family="sans-serif" font-size="12">API RESPONSE TIME</text>
    <text x="820" y="278" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="32" font-weight="bold">42 ms</text>

    <!-- User Table -->
    <rect x="80" y="320" width="1040" height="360" fill="#161616" stroke="#282828" rx="6" />
    <line x1="80" y1="370" x2="1120" y2="370" stroke="#333333" stroke-width="1" />
    <text x="110" y="352" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">USER NAME</text>
    <text x="360" y="352" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">EMAIL ADDRESS</text>
    <text x="660" y="352" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">ROLE</text>
    <text x="860" y="352" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">STATUS</text>
    <text x="1030" y="352" fill="#A8A8A8" font-family="sans-serif" font-size="12" font-weight="bold">ACTIONS</text>

    <text x="110" y="415" fill="#FFFBD4" font-family="sans-serif" font-size="14" font-weight="bold">Mahadi Hasan</text>
    <text x="360" y="415" fill="#A8A8A8" font-family="sans-serif" font-size="14">mdmahadih673@gmail.com</text>
    <text x="660" y="415" fill="#FFFBD4" font-family="sans-serif" font-size="14">Lead Developer</text>
    <text x="860" y="415" fill="#A90E02" font-family="sans-serif" font-size="13" font-weight="bold">● ACTIVE</text>
    <text x="1030" y="415" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">[EDIT] [DEL]</text>

    <line x1="80" y1="445" x2="1120" y2="445" stroke="#222222" stroke-width="1" />

    <text x="110" y="490" fill="#FFFBD4" font-family="sans-serif" font-size="14" font-weight="bold">Rashid Al-Mansoor</text>
    <text x="360" y="490" fill="#A8A8A8" font-family="sans-serif" font-size="14">rashid.mansoor@enterprise.io</text>
    <text x="660" y="490" fill="#FFFBD4" font-family="sans-serif" font-size="14">Product Manager</text>
    <text x="860" y="490" fill="#A90E02" font-family="sans-serif" font-size="13" font-weight="bold">● ACTIVE</text>
    <text x="1030" y="490" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">[EDIT] [DEL]</text>

    <line x1="80" y1="520" x2="1120" y2="520" stroke="#222222" stroke-width="1" />

    <text x="110" y="565" fill="#FFFBD4" font-family="sans-serif" font-size="14" font-weight="bold">Elena Rostova</text>
    <text x="360" y="565" fill="#A8A8A8" font-family="sans-serif" font-size="14">elena.rostova@designworks.co</text>
    <text x="660" y="565" fill="#FFFBD4" font-family="sans-serif" font-size="14">UI/UX Architect</text>
    <text x="860" y="565" fill="#A8A8A8" font-family="sans-serif" font-size="13">○ IDLE</text>
    <text x="1030" y="565" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13">[EDIT] [DEL]</text>
  </svg>
  `;

  // Bangla News 24 Mockup
  const banglaNewsSvg = `
  <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="#080808" />
    <rect x="50" y="40" width="1100" height="670" fill="#121212" stroke="#282828" stroke-width="2" rx="10" />
    <!-- Browser bar -->
    <rect x="50" y="40" width="1100" height="46" fill="#1E1E1E" rx="10" />
    <circle cx="85" cy="63" r="6" fill="#A90E02" />
    <circle cx="107" cy="63" r="6" fill="#3A3A3A" />
    <circle cx="129" cy="63" r="6" fill="#3A3A3A" />
    <text x="600" y="68" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="13" text-anchor="middle" font-weight="bold">BANGLA NEWS 24 / LIVE NEWS DESK</text>

    <!-- News Header -->
    <rect x="50" y="86" width="1100" height="70" fill="#0E0E0E" stroke="#222222" stroke-width="1" />
    <text x="90" y="132" fill="#A90E02" font-family="Impact, sans-serif" font-size="34" font-weight="900" letter-spacing="2">BANGLA NEWS 24</text>
    <text x="380" y="130" fill="#FFFBD4" font-family="sans-serif" font-size="13">| DHAKA • SYLHET • CHITTAGONG • GLOBAL</text>
    <text x="920" y="130" fill="#A8A8A8" font-family="monospace, sans-serif" font-size="12">LIVE API FEED: CONNECTED</text>

    <!-- Breaking News Ticker -->
    <rect x="50" y="156" width="1100" height="40" fill="#A90E02" />
    <text x="90" y="181" fill="#FFFBD4" font-family="sans-serif" font-size="13" font-weight="900" letter-spacing="1">BREAKING NEWS</text>
    <text x="240" y="181" fill="#FFFBD4" font-family="sans-serif" font-size="13">Next-generation tech hub inaugurated in Dhaka — local developers scale global exports</text>

    <!-- Main Editorial Layout -->
    <rect x="90" y="220" width="620" height="450" fill="#181818" stroke="#2A2A2A" rx="4" />
    <rect x="90" y="220" width="620" height="230" fill="#222222" />
    <text x="400" y="340" fill="#444444" font-family="sans-serif" font-size="28" font-weight="900" text-anchor="middle">[COVER PHOTO ARCHIVE]</text>
    <text x="120" y="485" fill="#A90E02" font-family="sans-serif" font-size="13" font-weight="bold">TECHNOLOGY / INSIGHTS</text>
    <text x="120" y="525" fill="#FFFBD4" font-family="sans-serif" font-size="22" font-weight="bold">The Modern Web Landscape: Building Full-Stack Apps with Next.js</text>
    <text x="120" y="565" fill="#A8A8A8" font-family="sans-serif" font-size="13">Exploring real-time data streaming, edge rendering, and MongoDB integration for high-traffic media portals.</text>
    <text x="120" y="620" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="12">Read 4 min • 18 Oct 2026</text>

    <!-- Side column news -->
    <rect x="740" y="220" width="370" height="140" fill="#181818" stroke="#2A2A2A" rx="4" />
    <text x="765" y="255" fill="#A90E02" font-family="sans-serif" font-size="11" font-weight="bold">DEVELOPMENT</text>
    <text x="765" y="285" fill="#FFFBD4" font-family="sans-serif" font-size="16" font-weight="bold">Electron vs Web Architecture</text>
    <text x="765" y="315" fill="#A8A8A8" font-family="sans-serif" font-size="12">Desktop productivity apps built using web tech.</text>

    <rect x="740" y="380" width="370" height="140" fill="#181818" stroke="#2A2A2A" rx="4" />
    <text x="765" y="415" fill="#A90E02" font-family="sans-serif" font-size="11" font-weight="bold">API INTEGRATION</text>
    <text x="765" y="445" fill="#FFFBD4" font-family="sans-serif" font-size="16" font-weight="bold">REST &amp; Realtime Endpoints</text>
    <text x="765" y="475" fill="#A8A8A8" font-family="sans-serif" font-size="12">Optimizing cache invalidation and SSR latency.</text>

    <rect x="740" y="540" width="370" height="130" fill="#181818" stroke="#2A2A2A" rx="4" />
    <text x="765" y="575" fill="#A90E02" font-family="sans-serif" font-size="11" font-weight="bold">ECOSYSTEM</text>
    <text x="765" y="605" fill="#FFFBD4" font-family="sans-serif" font-size="16" font-weight="bold">Open Source in South Asia</text>
    <text x="765" y="635" fill="#A8A8A8" font-family="sans-serif" font-size="12">Community driven software development.</text>
  </svg>
  `;

  await sharp(Buffer.from(fileFlowSvg)).png().toFile(path.join(imagesDir, 'project-fileflow.png'));
  console.log('Saved project-fileflow.png');

  await sharp(Buffer.from(usersCrudSvg)).png().toFile(path.join(imagesDir, 'project-users-crud.png'));
  console.log('Saved project-users-crud.png');

  await sharp(Buffer.from(banglaNewsSvg)).png().toFile(path.join(imagesDir, 'project-bangla-news.png'));
  console.log('Saved project-bangla-news.png');
}

processAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
