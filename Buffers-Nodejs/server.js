import http from 'http';
import fs from 'fs/promises';

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    const contentBuffer = await fs.readFile('./text.txt');

    res.statusCode = 200;

    res.setHeader('Content-Type', 'text/plain');
    res.end(contentBuffer.toString('utf-8'));
});

server.listen(PORT, () => {
    console.log(`Server is listenin on port ${PORT}`);
});
