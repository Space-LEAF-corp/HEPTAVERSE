const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Route to Panther pages
  let filePath = req.url === '/' ? '/public/panther-signin.html' : `/public${req.url}`;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  let contentType = 'text/html';

  if (ext === '.js') contentType = 'application/javascript';
  if (ext === '.css') contentType = 'text/css';
  if (ext === '.json') contentType = 'application/json';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Not Found</h1><p>The predator you seek does not exist.</p>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🐆 ═══════════════════════════════════════`);
  console.log(`   PANTHER OS - Predator Command Center`);
  console.log(`═══════════════════════════════════════`);
  console.log(`\n   🌐 Running at http://localhost:${PORT}`);
  console.log(`   📝 Default credentials:`);
  console.log(`      Predator ID: predator`);
  console.log(`      Access Code: panther123`);
  console.log(`\n   💳 PantherPay Enabled`);
  console.log(`   🔒 Security Protocol: ACTIVE`);
  console.log(`\n═══════════════════════════════════════\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use.`);
    console.log(`   Try using a different port or kill the existing process.`);
  }
});

process.on('SIGINT', () => {
  console.log('\n🐆 Panther OS shutting down...');
  process.exit(0);
});
