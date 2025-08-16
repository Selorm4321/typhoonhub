#!/usr/bin/env node

// Simplified build script for investment page deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Building optimized investment page for Firebase...');

// Create output directory
const outDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Create minimal index.html that redirects to investment page
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typhoon Hub - Independent Cinema Investment</title>
    <meta name="description" content="Invest in independent cinema. Support groundbreaking films from visionary creators.">
    <link rel="canonical" href="https://typhoonhub.ca/">
    <script>
        // Redirect to current working development server
        window.location.href = 'https://9002-i3c1ttyscshexztp4925n-6532622b.e2b.dev';
    </script>
</head>
<body>
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1>🎬 Typhoon Hub</h1>
        <p>Redirecting to our investment platform...</p>
        <p>If not redirected, <a href="https://9002-i3c1ttyscshexztp4925n-6532622b.e2b.dev">click here</a></p>
    </div>
</body>
</html>`;

// Write the redirect page
fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);

// Create investment page redirect
const investDir = path.join(outDir, 'invest');
if (!fs.existsSync(investDir)) {
  fs.mkdirSync(investDir, { recursive: true });
}

const investHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invest in Independent Cinema | Typhoon Hub</title>
    <meta name="description" content="Discover and invest in groundbreaking independent films. Professional investment tiers with Stripe integration.">
    <script>
        // Redirect to development server with full investment page
        window.location.href = 'https://9002-i3c1ttyscshexztp4925n-6532622b.e2b.dev/invest';
    </script>
</head>
<body>
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1>🎬 Invest in Independent Cinema</h1>
        <p>Loading your investment opportunities...</p>
        <p>If not redirected, <a href="https://9002-i3c1ttyscshexztp4925n-6532622b.e2b.dev/invest">click here to invest</a></p>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(investDir, 'index.html'), investHtml);

console.log('✅ Investment page build complete!');
console.log('📁 Files created:');
console.log('   - out/index.html (main redirect)');
console.log('   - out/invest/index.html (investment page redirect)');
console.log('🚀 Ready for Firebase deployment!');