const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResume() {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const outputPath = path.resolve(__dirname, '../public/Mahadi_Hasan_MERN_Resume.pdf');

  doc.pipe(fs.createWriteStream(outputPath));

  // Colors
  const red = '#A90E02';
  const black = '#111111';
  const gray = '#444444';

  // Header
  doc
    .fontSize(24)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('MAHADI HASAN', 40, 40)
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor(red)
    .text('AI-DRIVEN MERN STACK & FULL-STACK WEB ENGINEER', 40, 70);

  doc
    .fontSize(9)
    .font('Helvetica')
    .fillColor(gray)
    .text('Email: mdmahadih673@gmail.com  |  Location: Bangladesh  |  GitHub: github.com/mdmahadih673', 40, 88)
    .text('LinkedIn: linkedin.com/in/md-mahadi-hasan-792ba8344', 40, 102);

  // Line separator
  doc
    .strokeColor(red)
    .lineWidth(2)
    .moveTo(40, 120)
    .lineTo(555, 120)
    .stroke();

  // Summary
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('PROFESSIONAL SUMMARY', 40, 132);

  doc
    .fontSize(9)
    .font('Helvetica')
    .fillColor(gray)
    .text(
      'AI-Driven Full-Stack Web Engineer specializing in Next.js, React, Node.js, Express.js, and MongoDB. Proven experience in architecting responsive media platforms, real-time market tracker portals, and interactive wellness applications. Proficient in modular MVC patterns, RESTful APIs, state management, and modern AI-assisted engineering tools.',
      40,
      148,
      { width: 515, align: 'justify', lineGap: 3 }
    );

  // Technical Competencies
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('TECHNICAL COMPETENCIES', 40, 205);

  doc
    .strokeColor('#DDDDDD')
    .lineWidth(1)
    .moveTo(40, 220)
    .lineTo(555, 220)
    .stroke();

  const skills = [
    { cat: 'Frontend Frameworks:', val: 'Next.js (App Router, Server Components, SSR, CSR, ISR), React, TypeScript, JavaScript (ES6+)' },
    { cat: 'UI & Styling:', val: 'Tailwind CSS, ShadCN UI, Hero UI, Responsive Mobile Architecture, CSS3, HTML5' },
    { cat: 'Backend & APIs:', val: 'Node.js, Express.js (Modular MVC Pattern), RESTful API Engineering, Middleware Pipeline' },
    { cat: 'Database & ODM:', val: 'MongoDB Atlas, Mongoose ODM, Document Modeling, NoSQL Aggregation Pipelines' },
    { cat: 'Auth & Security:', val: 'BetterAuth, JWT, HTTPOnly Cookies, Role-Based Access Control (RBAC), OAuth' },
    { cat: 'Payments & Integration:', val: 'Stripe, SSLCommerz, Axios, Third-Party REST API Data Ingestion' },
    { cat: 'AI Tools & DevOps:', val: 'Cursor AI, Antigravity, Claude Code, Git, GitHub, Vercel Deployment, Postman' },
  ];

  let yPos = 230;
  skills.forEach((s) => {
    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor(black)
      .text(s.cat, 40, yPos, { width: 140 })
      .font('Helvetica')
      .fillColor(gray)
      .text(s.val, 185, yPos, { width: 370 });
    yPos += 18;
  });

  // Featured Projects
  yPos += 10;
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('FEATURED PRODUCTION PROJECTS', 40, yPos);

  yPos += 15;
  doc
    .strokeColor('#DDDDDD')
    .lineWidth(1)
    .moveTo(40, yPos)
    .lineTo(555, yPos)
    .stroke();

  yPos += 10;

  // Project 1: Bangla News 24
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('1. Bangla News 24 — Real-Time Digital Journalism Portal', 40, yPos)
    .fontSize(8)
    .font('Helvetica-Bold')
    .fillColor(red)
    .text('Live: bangla-news-24-rho.vercel.app  |  GitHub: github.com/mdmahadih673/bangla-news-24', 40, yPos + 14);

  doc
    .fontSize(8.5)
    .font('Helvetica')
    .fillColor(gray)
    .text(
      '• Engineered a dynamic Bengali journalism portal utilizing Next.js for rapid server rendering and SEO performance.\n• Built real-time breaking news marquee tickers, categorized editorial feeds, and most-read article ranking modules.\n• Implemented clean responsive typography and cross-device adaptive layouts for high-readability.',
      40,
      yPos + 28,
      { width: 515, lineGap: 2.5 }
    );

  yPos += 75;

  // Project 2: Bazar Dor
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('2. Bazar Dor (বাজার দর) — Daily Commodity Price Tracker & Market Analytics', 40, yPos)
    .fontSize(8)
    .font('Helvetica-Bold')
    .fillColor(red)
    .text('Live: assignment-7-flw1.vercel.app  |  GitHub: github.com/mdmahadih673/assignment-7', 40, yPos + 14);

  doc
    .fontSize(8.5)
    .font('Helvetica')
    .fillColor(gray)
    .text(
      '• Developed a dedicated commodity price tracker monitoring daily rates for groceries, vegetables, meat, and fish.\n• Built dynamic category filters, search capabilities, and price change indicators (+/- percentage badges).\n• Structured responsive card-based market analytics to provide transparency on consumer staple fluctuations.',
      40,
      yPos + 28,
      { width: 515, lineGap: 2.5 }
    );

  yPos += 75;

  // Project 3: FitLog
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('3. FitLog — Workout Companion & Gym Routine Planner', 40, yPos)
    .fontSize(8)
    .font('Helvetica-Bold')
    .fillColor(red)
    .text('Live: assienment-6.vercel.app  |  GitHub: github.com/mdmahadih673/assienment-6', 40, yPos + 14);

  doc
    .fontSize(8.5)
    .font('Helvetica')
    .fillColor(gray)
    .text(
      '• Created a minimalist, high-contrast dark gym companion designed to log sets and build weekly training plans.\n• Features an interactive exercise library covering 12 lifts across major muscle groups with dynamic state management.\n• Engineered seamless client-side plan saving, responsive grid cards, and intuitive lift selection workflows.',
      40,
      yPos + 28,
      { width: 515, lineGap: 2.5 }
    );

  // Education
  yPos += 75;
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('EDUCATION & TRAINING', 40, yPos);

  yPos += 15;
  doc
    .strokeColor('#DDDDDD')
    .lineWidth(1)
    .moveTo(40, yPos)
    .lineTo(555, yPos)
    .stroke();

  yPos += 10;
  doc
    .fontSize(9.5)
    .font('Helvetica-Bold')
    .fillColor(black)
    .text('AI-Driven Full-Stack Web Engineering (Batch 14)', 40, yPos)
    .fontSize(8.5)
    .font('Helvetica')
    .fillColor(gray)
    .text('Programming Hero  |  Comprehensive 7-Month Guided Bootcamp & 30+ Production Projects', 40, yPos + 13);

  doc.end();
  console.log('Successfully updated public/Mahadi_Hasan_MERN_Resume.pdf with real projects!');
}

generateResume();
