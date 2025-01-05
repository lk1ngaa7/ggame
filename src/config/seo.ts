import type { LocaleObject } from '@/types/locale'

export const defaultSEO = {
  siteName: {
    'en-US': 'GameHub - Free Online Games for Everyone',
    'zh-CN': 'GameHub - 免费在线游戏平台',
    'ja-JP': 'GameHub - 無料オンラインゲーム',
    'ko-KR': 'GameHub - 무료 온라인 게임',
    'fr-FR': 'GameHub - Jeux en ligne gratuits',
    'de-DE': 'GameHub - Kostenlose Online-Spiele',
    'es-ES': 'GameHub - Juegos en línea gratis',
    'ru-RU': 'GameHub - Бесплатные онлайн-игры',
    'pt-BR': 'GameHub - Jogos online grátis'
  },
  description: {
    'en-US': 'Play the best free online games on GameHub. New games added daily! Action, puzzle, sports, and more games for all ages.',
    'zh-CN': '在GameHub上玩最好的免费在线游戏。每天更新新游戏！动作、益智、运动等适合所有年龄段的游戏。',
    'ja-JP': 'GameHubで最高の無料オンラインゲームをプレイ。毎日新しいゲームが追加！アクション、パズル、スポーツなど、全年齢向けのゲーム。',
    'ko-KR': 'GameHub에서 최고의 무료 온라인 게임을 즐기세요. 매일 새로운 게임이 추가됩니다! 액션, 퍼즐, 스포츠 등 모든 연령대를 위한 게임.',
    'fr-FR': 'Jouez aux meilleurs jeux gratuits en ligne sur GameHub. Nouveaux jeux ajoutés quotidiennement ! Action, puzzle, sports et plus encore pour tous les âges.',
    'de-DE': 'Spielen Sie die besten kostenlosen Online-Spiele auf GameHub. Täglich neue Spiele! Action, Puzzle, Sport und mehr Spiele für alle Altersgruppen.',
    'es-ES': 'Juega a los mejores juegos gratis en línea en GameHub. ¡Nuevos juegos agregados diariamente! Acción, rompecabezas, deportes y más juegos para todas las edades.',
    'ru-RU': 'Играйте в лучшие бесплатные онлайн-игры на GameHub. Новые игры добавляются ежедневно! Экшн, головоломки, спорт и другие игры для всех возрастов.',
    'pt-BR': 'Jogue os melhores jogos online grátis no GameHub. Novos jogos adicionados diariamente! Ação, quebra-cabeça, esportes e mais jogos para todas as idades.'
  },
  keywords: {
    'en-US': 'online games, free games, browser games, action games, puzzle games, multiplayer games, casual games',
    'zh-CN': '在线游戏,免费游戏,浏览器游戏,动作游戏,益智游戏,多人游戏,休闲游戏',
    'ja-JP': 'オンラインゲーム,無料ゲーム,ブラウザゲーム,アクションゲーム,パズルゲーム,マルチプレイヤーゲーム,カジュアルゲーム',
    'ko-KR': '온라인 게임,무료 게임,브라우저 게임,액션 게임,퍼즐 게임,멀티플레이어 게임,캐주얼 게임',
    'fr-FR': 'jeux en ligne,jeux gratuits,jeux de navigateur,jeux d\'action,jeux de puzzle,jeux multijoueur,jeux occasionnels',
    'de-DE': 'Online-Spiele,Kostenlose Spiele,Browser-Spiele,Actionspiele,Puzzlespiele,Multiplayer-Spiele,Casual-Spiele',
    'es-ES': 'juegos en línea,juegos gratis,juegos de navegador,juegos de acción,juegos de rompecabezas,juegos multijugador,juegos casuales',
    'ru-RU': 'онлайн игры,бесплатные игры,браузерные игры,экшн игры,головоломки,многопользовательские игры,казуальные игры',
    'pt-BR': 'jogos online,jogos grátis,jogos de navegador,jogos de ação,jogos de quebra-cabeça,jogos multiplayer,jogos casuais'
  }
}

export const generateMetaTags = (locale: string, pageTitle: string, pageDescription?: string) => {
  const currentLocale = locale as keyof LocaleObject
  return {
    title: `${pageTitle} | ${defaultSEO.siteName[currentLocale]}`,
    meta: [
      {
        name: 'description',
        content: pageDescription || defaultSEO.description[currentLocale]
      },
      {
        name: 'keywords',
        content: defaultSEO.keywords[currentLocale]
      },
      // Open Graph tags
      {
        property: 'og:title',
        content: `${pageTitle} | ${defaultSEO.siteName[currentLocale]}`
      },
      {
        property: 'og:description',
        content: pageDescription || defaultSEO.description[currentLocale]
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: defaultSEO.siteName[currentLocale]
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: `${pageTitle} | ${defaultSEO.siteName[currentLocale]}`
      },
      {
        name: 'twitter:description',
        content: pageDescription || defaultSEO.description[currentLocale]
      }
    ]
  }
}
