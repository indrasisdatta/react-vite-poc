import express from "express";
import cors from "cors";
import https from "https";

const app = express();

const PORT  = 4000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/streaming-test', (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    let c = 0;
    let interval = setInterval(() => {
        c++;
        if (c > 5) {
            res.write(`event: done\ndata: end\n\n`);
            clearInterval(interval);
            // res.end();
            return;
        }
        res.write(`id: interval${c} \n`);
        res.write(`event: interval\n`)
        res.write(`data: ${JSON.stringify({ id: c, num: c, message: `Log message ${c}` })}\n\n`);
    }, 1000);

    res.on("close", () => {
        console.log('SSE Connection closed')
        clearInterval(interval);
        res.end();
    })
});

app.get('/streaming-file', (req, res) => {
    res.setHeader("Content-type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const fileUrl = 'https://raw.githubusercontent.com/dscape/spell/refs/heads/master/test/resources/big.txt';
    const parsedUrl = new URL(fileUrl);
    
    const fileReq = https.request(parsedUrl, (fileRes) => {
        fileRes.on("data", (chunk) => {
            res.write(`event: fileRead\n`)
            res.write(`data: ${JSON.stringify({ chunk: chunk.toString() })}\n\n`);
        });
        fileRes.on("end", () => {
            res.write(`event: done\n`)
            res.write(`data: finished\n\n`);
            res.write(`retry: 0\n\n`)
            res.end();
        })
    });

    fileReq.on("error", (e) => {
        console.error(e);
        res.write(`data: Error: ${e.message}\n\n`);
        res.end();
    });

    fileReq.end();

    req.on("close", () => {
        console.log('Client closed connection')
        fileReq.abort();
        res.end();
    })
})

app.listen(PORT, () => {
    console.log(`App started in port ${PORT}`)
})