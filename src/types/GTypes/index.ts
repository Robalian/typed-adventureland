type GData = {
  achievements: Record<AchievementKey, GAchievement>;
  animations: Record<AnimationKey, GAnimation>;
  classes: Record<ClassKey, GClass>;
  conditions: Record<ConditionKey, GCondition>;
  cosmetics: GCosmetic;
  craft: GCrafts;
  dimensions: Record<DimensionKey, GDimension>;
  dismantle: Record<DismantleKey, GDismantle>;
  drops: GDrops;
  emotions: Record<EmotionKey, GEmotion>;
  events: Record<EventKey, GEvent>;
  games: Record<GameKey, GGame>;
  geometry: Record<GeometryKey, GGeometry>;
  images: Record<ImageKey, GImage>;
  imagesets: Record<ImagesetKey, GImageset>;
  items: Record<ItemKey, GItem>;
  levels: Record<LevelKey, GLevel>;
  maps: Record<MapKey, GMap>;
  monsters: Record<MonsterKey, GMonster>;
  multipliers: Record<MultiplierKey, GMultiplier>;
  npcs: Record<NpcKey, GNpc>;
  projectiles: Record<ProjectileKey, GProjectile>;
  sets: Record<SetKey, GSet>;
  skills: Record<SkillKey, GSkill>;
  sprites: Record<SpriteKey, GSprite>;
  tilesets: Record<TilesetKey, GTileset>;
  titles: Record<TitleKey, GTitle>;
  tokens: Record<TokenKey, GToken>;
  version: number;

  /** base_gold is attached to the G object from `socket.on('start'` in `game.js` */
  base_gold: Record<MonsterKey, Partial<Record<MapKey, number>>>;
};