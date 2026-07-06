const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Default to signin
  let filePath = req.url === '/' ? '/public/signin.html' : `/public${req.url}`;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  let contentType = 'text/html';

  if (ext === '.js') contentType = 'application/javascript';
  if (ext === '.css') contentType = 'text/css';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Not Found</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🌌 Heptaverse OS running at http://localhost:${PORT}`);
  console.log(`📝 Default credentials: admin / heptaverse123`);
});
