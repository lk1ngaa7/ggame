import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Game {
  englishName: string
}

// 从 JSON 文件读取游戏数据
let gamesData: Game[] = []
const gamesJsonPath = path.resolve(__dirname, '../src/data/games.json')

try {
  if (fs.existsSync(gamesJsonPath)) {
    gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf-8'))
  } else {
    console.warn('Warning: games.json not found, proceeding with empty games list')
  }
} catch (error) {
  console.error('Error reading games.json:', error)
  process.exit(1)
}

// 生成 sitemap XML
const generateSitemap = (hostname: string, games: Game[]) => {
  const timestamp = new Date().toISOString()

  // 静态路由
  const staticUrls = [
    '/',
    '/games'
  ].map(url => ({
    url,
    lastmod: timestamp,
    changefreq: 'daily',
    priority: url === '/' ? 1.0 : 0.8
  }))

  // 游戏详情页路由
  const gameUrls = games.map(game => ({
    url: `/game/${game.englishName}`,
    lastmod: timestamp,
    changefreq: 'weekly',
    priority: 0.6
  }))

  const urls = [...staticUrls, ...gameUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${hostname}${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return xml
}

// 主域名
const hostname = 'https://gamehub.newsbridge.top'

// 生成 sitemap
const sitemap = generateSitemap(hostname, gamesData)

// 确保 public 目录存在
const publicDir = path.resolve(__dirname, '../public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// 写入文件
try {
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemap)
  console.log('Sitemap generated successfully!')
} catch (error) {
  console.error('Error writing sitemap.xml:', error)
  process.exit(1)
}
