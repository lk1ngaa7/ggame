import { ref, computed } from 'vue'
import type { Game } from '@/types'

export const useGameStore = () => {
  const primaryTags = new Set([
    // 动作和射击类
    'action', 'shooter', 'survival',
    // 益智解谜类
    'puzzle', 'memory', 'logic', 'match3',
    // 休闲娱乐类
    'arcade', 'casual', 'runner',
    // 体育竞技类
    'racing', 'sports', 'fishing',
    // 策略思维类
    'strategy', 'defense',
    // 教育学习类
    'educational',
    // 模拟类
    'simulation', 'cooking',
    // 平台动作类
    'platformer',
    // 冒险类
    'adventure'
  ])
  const simplifyTags = (game: Game): Game => {
    let newTags: string[] = []
    // 优先添加主要游戏类型标签
    const primaryGameTags = game.tags.filter(tag => primaryTags.has(tag))
    if (primaryGameTags.length > 0) {
      newTags = primaryGameTags.slice(0, 2)
    }
    // 如果还能添加标签，添加一个特色标签
    if (newTags.length < 2) {
      const otherTags = game.tags.filter(tag => !primaryTags.has(tag))
      if (otherTags.length > 0) {
        newTags.push(otherTags[0])
      }
    }
    return { ...game, tags: newTags }
  }
  const gamesData =
[{"englishName":"escape","url":"https://ggame.newsbridge.top/10_escape/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/10.jpg","tags":["puzzle","adventure","escape"]},{"englishName":"fruit_pie","url":"https://ggame.newsbridge.top/11_fruit_pie/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/11.jpg","tags":["cooking","casual","food"]},{"englishName":"brick_layer","url":"https://ggame.newsbridge.top/12_brick_layer/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/12.jpg","tags":["puzzle","building","strategy"]},{"englishName":"wanderer_vs_zombies","url":"https://ggame.newsbridge.top/13_wanderer_vs_zombies/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/13.jpg","tags":["action","zombie","survival","shooter"]},{"englishName":"halloween_bubble_shooter","url":"https://ggame.newsbridge.top/14_halloween_bubble_shooter/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/14.jpg","tags":["puzzle","halloween","shooter","arcade"]},{"englishName":"ninja_adventure","url":"https://ggame.newsbridge.top/15_ninja_adventure/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/15.jpg","tags":["action","adventure","ninja","platformer"]},{"englishName":"casino_card_memory","url":"https://ggame.newsbridge.top/16_casino_card_memory/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/16.jpg","tags":["casino","cards","memory","puzzle"]},{"englishName":"fruit_snake","url":"https://ggame.newsbridge.top/17_fruit_snake/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/17.jpg","tags":["arcade","snake","casual","food"]},{"englishName":"tank_defense","url":"https://ggame.newsbridge.top/18_tank_defense/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/18.jpg","tags":["strategy","defense","action","military"]},{"englishName":"fishing_master","url":"https://ggame.newsbridge.top/19_fishing_master/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/19.jpg","tags":["sports","fishing","casual","simulation"]},{"englishName":"crazy_runner","url":"https://ggame.newsbridge.top/20_crazy_runner/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/20.jpg","tags":["runner","arcade","action","endless"]},{"englishName":"space_shuttle","url":"https://ggame.newsbridge.top/21_space_shuttle/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/21.jpg","tags":["space","simulation","action","sci-fi"]},{"englishName":"super_cowboy_run","url":"https://ggame.newsbridge.top/22_super_cowboy_run/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/22.jpg","tags":["runner","western","action","arcade"]},{"englishName":"duck_hunter","url":"https://ggame.newsbridge.top/23_duck_hunter/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/23.jpg","tags":["shooting","hunting","arcade","action"]},{"englishName":"traffic_racing","url":"https://ggame.newsbridge.top/24_traffic_racing/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/24.jpg","tags":["racing","cars","arcade","sports"]},{"englishName":"girl_dress_up","url":"https://ggame.newsbridge.top/25_girl_dress_up/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/25.jpg","tags":["dress-up","fashion","casual","kids"]},{"englishName":"candle_line","url":"https://ggame.newsbridge.top/26_candle_line/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/26.jpg","tags":["puzzle","casual","logic"]},{"englishName":"jelly_3","url":"https://ggame.newsbridge.top/27_jelly_3/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/27.jpg","tags":["match3","puzzle","casual"]},{"englishName":"shoot_bandits","url":"https://ggame.newsbridge.top/28_shoot_bandits/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/28.jpg","tags":["shooter","western","action","arcade"]},{"englishName":"zombie_shooter","url":"https://ggame.newsbridge.top/29_zombie_shooter/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/29.jpg","tags":["shooter","zombie","action","horror"]},{"englishName":"christmas_panda_run","url":"https://ggame.newsbridge.top/30_christmas_panda_run/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/30.jpg","tags":["runner","christmas","arcade","kids"]},{"englishName":"speed_racing","url":"https://ggame.newsbridge.top/31_speed_racing/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/31.jpg","tags":["racing","cars","sports","arcade"]},{"englishName":"christmas_match","url":"https://ggame.newsbridge.top/32_christmas_match/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/32.jpg","tags":["match3","christmas","puzzle","casual"]},{"englishName":"christmas_balloon","url":"https://ggame.newsbridge.top/33_christmas_balloon/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/33.jpg","tags":["arcade","christmas","casual","kids"]},{"englishName":"kids_true_colors","url":"https://ggame.newsbridge.top/34_kids_true_colors/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/34.jpg","tags":["educational","kids","colors","puzzle"]},{"englishName":"air_combat","url":"https://ggame.newsbridge.top/35_air_combat/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/35.jpg","tags":["action","shooter","flying","military"]},{"englishName":"shark_mission","url":"https://ggame.newsbridge.top/36_shark_mission/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/36.jpg","tags":["action","adventure","underwater","arcade"]},{"englishName":"stick_soldier","url":"https://ggame.newsbridge.top/37_stick_soldier/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/37.jpg","tags":["action","shooter","military","stickman"]},{"englishName":"bubble_professor","url":"https://ggame.newsbridge.top/38_bubble_professor/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/38.jpg","tags":["puzzle","educational","bubble","casual"]},{"englishName":"ninja_game","url":"https://ggame.newsbridge.top/39_ninja_game/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/39.jpg","tags":["action","ninja","platformer","arcade"]},{"englishName":"candy_match_3","url":"https://ggame.newsbridge.top/40_candy_match_3/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/40.jpg","tags":["match3","puzzle","casual","candy"]},{"englishName":"super_color_line","url":"https://ggame.newsbridge.top/41_super_color_line/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/41.jpg","tags":["puzzle","colors","casual","logic"]},{"englishName":"touch_ball","url":"https://ggame.newsbridge.top/42_touch_ball/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/42.jpg","tags":["arcade","sports","casual","ball"]},{"englishName":"quick_dice","url":"https://ggame.newsbridge.top/43_quick_dice/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/43.jpg","tags":["dice","casual","board","strategy"]},{"englishName":"balloon_heaven","url":"https://ggame.newsbridge.top/44_balloon_heaven/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/44.jpg","tags":["arcade","casual","kids","balloon"]},{"englishName":"hot_jewels","url":"https://ggame.newsbridge.top/45_hot_jewels/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/45.jpg","tags":["match3","puzzle","jewel","casual"]},{"englishName":"smiley_face_game","url":"https://ggame.newsbridge.top/46_smiley_face_game/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/46.jpg","tags":["casual","kids","puzzle","emoji"]},{"englishName":"kids_math_game","url":"https://ggame.newsbridge.top/47_kids_math_game/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/47.jpg","tags":["educational","kids","math","puzzle"]},{"englishName":"zombie_uprising","url":"https://ggame.newsbridge.top/48_zombie_uprising/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/48.jpg","tags":["action","zombie","shooter","survival"]},{"englishName":"super_target","url":"https://ggame.newsbridge.top/49_super_target/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/49.jpg","tags":["shooter","arcade","action","target"]},{"englishName":"supercar_puzzle","url":"https://ggame.newsbridge.top/50_supercar_puzzle/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/50.jpg","tags":["puzzle","cars","logic","casual"]},{"englishName":"kids_crossword","url":"https://ggame.newsbridge.top/51_kids_crossword/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/51.jpg","tags":["educational","kids","word","puzzle"]},{"englishName":"sitar_logic","url":"https://ggame.newsbridge.top/52_sitar_logic/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/52.jpg","tags":["puzzle","logic","music","casual"]},{"englishName":"car_physics","url":"https://ggame.newsbridge.top/53_car_physics/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/53.jpg","tags":["racing","physics","cars","simulation"]},{"englishName":"robot_x","url":"https://ggame.newsbridge.top/54_robot_x/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/54.jpg","tags":["action","robot","sci-fi","arcade"]},{"englishName":"memory_game","url":"https://ggame.newsbridge.top/55_memory_game/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/55.jpg","tags":["memory","puzzle","casual","brain"]},{"englishName":"bouncy_ball","url":"https://ggame.newsbridge.top/57_bouncy_ball/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/57.jpg","tags":["arcade","physics","ball","casual"]},{"englishName":"jumping_bounce","url":"https://ggame.newsbridge.top/58_jumping_bounce/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/58.jpg","tags":["platformer","arcade","casual","jumping"]},{"englishName":"easter_memory","url":"https://ggame.newsbridge.top/60_easter_memory/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/60.jpg","tags":["memory","easter","puzzle","holiday"]},{"englishName":"destroy_zombies","url":"https://ggame.newsbridge.top/6_destroy_zombies/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/6.jpg","tags":["action","zombie","shooter","survival"]},{"englishName":"sticky_monkey","url":"https://ggame.newsbridge.top/7_sticky_monkey/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/7.jpg","tags":["arcade","platformer","kids","monkey"]},{"englishName":"plumber","url":"https://ggame.newsbridge.top/8_plumber/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/8.jpg","tags":["puzzle","pipe","logic","casual"]},{"englishName":"gold_miner","url":"https://ggame.newsbridge.top/9_gold_miner/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/9.jpg","tags":["arcade","mining","casual","action"]},{"englishName":"swat_vs_zombies","url":"https://ggame.newsbridge.top/2_swat_vs_zombies/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/2.jpg","tags":["action","zombie","shooter","military"]},{"englishName":"tank_battle","url":"https://ggame.newsbridge.top/3_tank_battle/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/3.jpg","tags":["action","tank","military","shooter"]},{"englishName":"mummy_candy","url":"https://ggame.newsbridge.top/4_mummy_candy/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/4.jpg","tags":["puzzle","halloween","candy","casual"]},{"englishName":"halloween_memory","url":"https://ggame.newsbridge.top/5_halloween_memory/index.html","pic":"https://ggame.newsbridge.top/%E7%BC%A9%E7%95%A5%E5%9B%BE/5.jpg","tags":["memory","halloween","puzzle","holiday"]}]
  const games = ref<Game[]>(gamesData.map(simplifyTags))

  const tagMapping = computed(() => {
    const mapping: Record<string, string[]> = {}
    games.value.forEach(game => {
      game.tags.forEach(tag => {
        if (!mapping[tag]) {
          mapping[tag] = []
        }
        mapping[tag].push(game.englishName)
      })
    })
    return mapping
  })

  const allTags = computed(() => {
    const uniqueTags = new Set<string>()
    games.value.forEach(game => {
      game.tags.forEach(tag => uniqueTags.add(tag))
    })
    return Array.from(uniqueTags).sort()
  })

  const getGamesByTag = (tag: string) => {
    if (!tag) return games.value
    return games.value.filter(game => game.tags.includes(tag))
  }

  const getGameByName = (name: string) => {
    return games.value.find(game => game.englishName === name)
  }

  return {
    games,
    tagMapping,
    allTags,
    getGamesByTag,
    getGameByName
  }
}
