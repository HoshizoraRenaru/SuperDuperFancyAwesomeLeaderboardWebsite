// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql2/promise');
const cors = require('cors');
const { Server } = require('socket.io');

// 💡 추가된 라이브러리
const axios = require('axios'); 
const cheerio = require('cheerio'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' } // change origin for production
});

const POLL_INTERVAL_MS = parseInt(process.env.POLL_INTERVAL_MS || '5000', 10);

let pool;
async function initDb() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'eternal',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    timezone: 'Z',
  });
  // test
  await pool.query('SELECT 1');
}

// ⭐ 새로 추가된 닉네임 조회 함수
/**
 * mcuuid.net에서 UUID를 이용해 닉네임을 조회하는 함수
 * @param {string} uuid - 조회할 플레이어의 UUID
 * @returns {Promise<string|null>} - 닉네임 또는 조회 실패 시 null
 */
async function getNameFromUUID(uuid) {
    const cleanUuid = uuid.replace(/-/g, '');
    const url = `https://mcuuid.net/?q=${cleanUuid}`;
    
    try {
        // mcuuid.net에 HTTP 요청
        const response = await axios.get(url, {
            // 브라우저가 아님을 명시하여 User-Agent 설정
            headers: { 'User-Agent': 'Eternal-Leaderboard-Server' }
        });
        
        // cheerio로 응답 HTML 파싱
        const $ = cheerio.load(response.data);
        
        // id가 'results_username'인 input 태그의 'value' 속성을 추출
        const name = $('#results_username').val();

        // 닉네임을 찾았으면 반환
        return name && name.trim() !== '' ? name.trim() : null; 

    } catch (error) {
        // 닉네임 조회 실패 시 로그를 남기고 null 반환 (조회 실패가 리더보드 전체를 막지 않도록)
        // console.error(`[UUID Lookup Error] for ${cleanUuid}:`, error.message);
        return null;
    }
}


async function fetchPlayers() {
  // Fetch players, compute kd, and order (primary: kills desc, secondary kd desc)
  const [rows] = await pool.query(`
    SELECT
      uuid,
      \`group\` AS \`group\`,
      COALESCE(kills,0) AS kills,
      COALESCE(deaths,0) AS deaths,
      COALESCE(xp,0) AS xp,
      COALESCE(\`level\`,0) AS \`level\`,
      COALESCE(killstreak,0) AS killstreak,
      COALESCE(killstreak_top,0) AS killstreak_top,
      COALESCE(multiplier,'') AS multiplier,
      COALESCE(lastseen, '') AS lastseen
    FROM players
  `);
  
  // ⭐ 닉네임 조회를 포함한 데이터 가공 및 병렬 처리
  const playerPromises = rows.map(async (r) => {
    const uuid = r.uuid;
    const name = await getNameFromUUID(uuid); // 닉네임 조회

    const kills = Number(r.kills || 0);
    const deaths = Number(r.deaths || 0);
    const kd = deaths === 0 ? (kills === 0 ? 0 : kills) : kills / deaths;
    
    return {
      // 💡 name 속성을 추가합니다.
      name: name, 
      uuid: uuid,
      uuid_clean: uuid.replace(/-/g,''),
      group: r.group || '',
      kills,
      deaths,
      xp: Number(r.xp || 0),
      level: Number(r.level || 0),
      killstreak: Number(r.killstreak || 0),
      killstreak_top: Number(r.killstreak_top || 0),
      multiplier: r.multiplier || '',
      lastseen: (r.lastseen ? new Date(r.lastseen).toISOString().replace('T',' ').slice(0,19) : ''),
      kd
    };
  });
  
  // 모든 닉네임 조회가 완료될 때까지 기다립니다.
  const players = await Promise.all(playerPromises); 

  // compute kd in JS, sort
  players.sort((a,b) => {
    if (b.kills !== a.kills) return b.kills - a.kills;
    if (b.kd !== a.kd) return b.kd - a.kd;
    return a.uuid.localeCompare(b.uuid);
  });

  return players;
}

let lastEmitJson = '';

async function pollAndEmit() {
  try {
    const players = await fetchPlayers();
    const json = JSON.stringify(players);
    if (json !== lastEmitJson) {
      lastEmitJson = json;
      io.emit('leaderboard:update', players);
      console.log(new Date().toISOString(), 'emitted update, rows=', players.length);
    }
  } catch (err) {
    console.error('poll error', err);
  }
}

app.get('/api/players', async (req, res) => {
  try {
    const players = await fetchPlayers();
    res.json({ ok: true, players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

io.on('connection', socket => {
  console.log('client connected', socket.id);
  // send initial snapshot
  (async () => {
    try {
      const players = await fetchPlayers();
      socket.emit('leaderboard:update', players);
    } catch (err) {
      console.error('initial send error', err);
    }
  })();

  socket.on('disconnect', () => {
    console.log('client disconnected', socket.id);
  });
});

async function start() {
  await initDb();
  server.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port', process.env.PORT || 3000);
  });

  // first poll immediately
  await pollAndEmit();
  setInterval(pollAndEmit, POLL_INTERVAL_MS);
}

start().catch(err => {
  console.error('startup error', err);
  process.exit(1);
});
