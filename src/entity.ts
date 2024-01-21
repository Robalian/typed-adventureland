// type EntityBase = {
//   h: number;
//   v: number;
//   vn: number;
// };

// TODO: Get all types (from G?)
type DamageType = "magical" | "physical";

type RawEntity = MonsterEntity | CharacterEntity | NpcEntity | Character;
type Entity = BetterUXWrapper<RawEntity>;
