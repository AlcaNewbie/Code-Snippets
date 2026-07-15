/*
 * [ Yt Mp3 ]
 * creator : H1Dz
 * base    : -
 * channel : https://whatsapp.com/channel/0029Vb82nkLEwEjtLSQ49I44
 * support : follow my channel for more updates
 */

onst readline = require('readline');
const fs = require('fs');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function extractVideoId(url) {
    const pattern = /(?:v=|\/v\/|embed\/|youtu\.be\/|\/shorts\/|^)([^#\&\?^\/]{11})/;
    const match = url.match(pattern);
    return match ? match[1] : null;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

rl.question('Masukkan URL Video YouTube: ', async (userUrl) => {
    const videoId = extractVideoId(userUrl.trim());
    if (!videoId) {
        console.log('[Error] URL tidak valid!');
        rl.close();
        return;
    }

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://id.ytmp3.mobi',
        'Referer': 'https://id.ytmp3.mobi/',
        'Accept': '*/*'
    };

    try {
        const randomCache = Math.random();
        const initUrl = `https://a.ymcdn.org/api/v1/init?23=1llum1n471&p=y&_=${randomCache}`;
        
        const resInit = await axios.get(initUrl, { headers });
        const dataInit = resInit.data;

        if (dataInit.error !== 0) {
            console.log('[Error] Gagal inisialisasi!');
            rl.close();
            return;
        }

        const convertBaseUrl = dataInit.convertURL;
        const randomCache2 = Math.random();
        const convertUrl = `${convertBaseUrl}&v=${videoId}&f=mp3&_=${randomCache2}`;

        await sleep(1500);

        const resConvert = await axios.get(convertUrl, { headers });
        const dataConvert = resConvert.data;

        if (dataConvert.error !== 0) {
            console.log('[Error] Gagal konversi!');
            rl.close();
            return;
        }

        const title = dataConvert.title;
        const downloadLink = dataConvert.downloadURL;

        const cleanTitle = title.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
        const filename = `${cleanTitle}.mp3`;

        const resFile = await axios({
            method: 'get',
            url: downloadLink,
            headers,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filename);
        resFile.data.pipe(writer);

        writer.on('finish', () => {
            console.log(`Selesai: ${filename}`);
            rl.close();
        });

        writer.on('error', (err) => {
            console.log(`[Error] Gagal menulis file: ${err.message}`);
            rl.close();
        });

    } catch (e) {
        console.log(`[Error] ${e.message}`);
        rl.close();
    }
});
