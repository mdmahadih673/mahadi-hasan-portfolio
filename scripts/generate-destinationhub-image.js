const path = require('path');
const sharp = require('sharp');

async function generateDestinationHub() {
  const imagesDir = path.resolve(__dirname, '../public/images');

  const destinationHubSvg = `
  <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="#070707" />
    <rect x="50" y="40" width="1100" height="670" fill="#101010" stroke="#252525" stroke-width="2" rx="10" />
    
    <!-- Browser Top Bar -->
    <rect x="50" y="40" width="1100" height="48" fill="#191919" rx="10" />
    <circle cx="85" cy="64" r="6" fill="#A90E02" />
    <circle cx="107" cy="64" r="6" fill="#3A3A3A" />
    <circle cx="129" cy="64" r="6" fill="#3A3A3A" />
    <rect x="250" y="50" width="700" height="28" rx="4" fill="#0C0C0C" />
    <text x="600" y="69" fill="#A8A8A8" font-family="monospace, sans-serif" font-size="12" text-anchor="middle">https://destinationhub-ai.vercel.app/explore</text>

    <!-- App Navigation Header -->
    <rect x="50" y="88" width="1100" height="64" fill="#0E0E0E" stroke="#1F1F1F" stroke-width="1" />
    <text x="90" y="128" fill="#A90E02" font-family="Impact, sans-serif" font-size="24" font-weight="900" letter-spacing="1">DESTINATION<tspan fill="#FFFBD4">HUB</tspan></text>
    <text x="320" y="126" fill="#FFFBD4" font-family="sans-serif" font-size="13" font-weight="bold">AI TRIP PLANNER</text>
    <text x="470" y="126" fill="#A8A8A8" font-family="sans-serif" font-size="13">DESTINATIONS</text>
    <text x="610" y="126" fill="#A8A8A8" font-family="sans-serif" font-size="13">BOOKINGS</text>
    <rect x="970" y="103" width="140" height="34" fill="#A90E02" rx="4" />
    <text x="1040" y="124" fill="#FFFBD4" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">BETTERAUTH: ACTIVE</text>

    <!-- Hero Search Bar with AI Tag -->
    <rect x="90" y="175" width="1020" height="90" fill="#151515" stroke="#2B2B2B" rx="8" />
    <rect x="110" y="195" width="150" height="24" fill="#A90E02" rx="3" />
    <text x="185" y="211" fill="#FFFBD4" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">AI FIRST SEARCH</text>
    <text x="110" y="248" fill="#FFFBD4" font-family="sans-serif" font-size="18" font-weight="bold">Find AI-Curated Eco Stays, Mountain Retreats &amp; Resorts</text>
    
    <rect x="850" y="198" width="230" height="44" fill="#1E1E1E" stroke="#333333" rx="4" />
    <text x="965" y="225" fill="#A8A8A8" font-family="sans-serif" font-size="12" text-anchor="middle">Stripe Checkout Ready 💳</text>

    <!-- Destination Cards Grid -->
    <!-- Card 1 -->
    <rect x="90" y="290" width="320" height="380" fill="#161616" stroke="#282828" rx="6" />
    <rect x="90" y="290" width="320" height="190" fill="#202020" />
    <text x="250" y="390" fill="#444444" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">[SAJEK VALLEY LUXURY COTTAGE]</text>
    <rect x="110" y="305" width="110" height="22" fill="#A90E02" rx="3" />
    <text x="165" y="320" fill="#FFFBD4" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">★ 4.98 AI RATED</text>
    <text x="110" y="515" fill="#FFFBD4" font-family="sans-serif" font-size="17" font-weight="bold">Cloudview Retreat, Sajek</text>
    <text x="110" y="540" fill="#A8A8A8" font-family="sans-serif" font-size="12">Mongoose schema • Realtime availability</text>
    <text x="110" y="590" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="16" font-weight="bold">$140 <tspan font-size="11" fill="#A8A8A8">/ night</tspan></text>
    <rect x="270" y="568" width="120" height="34" fill="#A90E02" rx="4" />
    <text x="330" y="589" fill="#FFFBD4" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">BOOK STRIPE</text>

    <!-- Card 2 -->
    <rect x="440" y="290" width="320" height="380" fill="#161616" stroke="#282828" rx="6" />
    <rect x="440" y="290" width="320" height="190" fill="#202020" />
    <text x="600" y="390" fill="#444444" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">[COX'S BAZAR OCEAN FRONT]</text>
    <rect x="460" y="305" width="110" height="22" fill="#A90E02" rx="3" />
    <text x="515" y="320" fill="#FFFBD4" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">★ 4.95 VERIFIED</text>
    <text x="460" y="515" fill="#FFFBD4" font-family="sans-serif" font-size="17" font-weight="bold">Inani Beach Horizon Suite</text>
    <text x="460" y="540" fill="#A8A8A8" font-family="sans-serif" font-size="12">RBAC: Host Verified • Dynamic Routing</text>
    <text x="460" y="590" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="16" font-weight="bold">$210 <tspan font-size="11" fill="#A8A8A8">/ night</tspan></text>
    <rect x="620" y="568" width="120" height="34" fill="#A90E02" rx="4" />
    <text x="680" y="589" fill="#FFFBD4" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">BOOK STRIPE</text>

    <!-- Card 3 (Admin Panel view) -->
    <rect x="790" y="290" width="320" height="380" fill="#161616" stroke="#282828" rx="6" />
    <rect x="790" y="290" width="320" height="50" fill="#1C1C1C" />
    <text x="815" y="322" fill="#A90E02" font-family="sans-serif" font-size="13" font-weight="bold">ADMIN RBAC DASHBOARD</text>
    <rect x="815" y="360" width="270" height="70" fill="#111111" stroke="#252525" rx="4" />
    <text x="830" y="385" fill="#A8A8A8" font-family="sans-serif" font-size="11">TOTAL REVENUE (STRIPE)</text>
    <text x="830" y="415" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="20" font-weight="bold">$28,490.00</text>
    <rect x="815" y="445" width="270" height="70" fill="#111111" stroke="#252525" rx="4" />
    <text x="830" y="470" fill="#A8A8A8" font-family="sans-serif" font-size="11">ACTIVE BOOKINGS</text>
    <text x="830" y="500" fill="#A90E02" font-family="monospace, sans-serif" font-size="20" font-weight="bold">142 CONFIRMED</text>
    <rect x="815" y="540" width="270" height="100" fill="#111111" stroke="#252525" rx="4" />
    <text x="830" y="568" fill="#FFFBD4" font-family="monospace, sans-serif" font-size="11">WEBHOOK: payment.succeeded</text>
    <text x="830" y="592" fill="#A8A8A8" font-family="sans-serif" font-size="11">Session: sess_942a verified</text>
    <text x="830" y="616" fill="#A90E02" font-family="sans-serif" font-size="11">MongoDB state updated: 12ms</text>
  </svg>
  `;

  await sharp(Buffer.from(destinationHubSvg))
    .png()
    .toFile(path.join(imagesDir, 'project-destinationhub.png'));

  console.log('Saved project-destinationhub.png');
}

generateDestinationHub().catch(console.error);
