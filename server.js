require('dotenv').config();
const http = require('http');

// The target URL to which we will redirect GET requests
const targetUrl = process.env.TARGET_URL;

// The number of seconds to wait before redirecting
const redirectDelay = 5; // You can change this to any number of seconds

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');

    // Write the HTML response with a meta refresh tag
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="${redirectDelay};url=${targetUrl}">
        <title>Redirecting...</title>
      </head>
      <body>
        <h1>Redirecting to ${targetUrl}...</h1>
        <p>You will be redirected in ${redirectDelay} seconds.</p>
      </body>
      </html>
    `);

    // End the response
    res.end();
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