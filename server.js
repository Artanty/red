require('dotenv').config();
const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

// The target URL to which we will redirect GET requests
const targetUrl = process.env.TARGET_URL;

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Redirect GET requests to the target URL
    proxy.web(req, res, { target: targetUrl });
  } else {
    // Handle other request methods as needed
    res.statusCode = 405; // Method Not Allowed
    res.end('Only GET requests are allowed');
  }
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});