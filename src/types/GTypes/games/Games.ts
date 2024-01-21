type GameKey = "dice" | "slots" | "tarot" | "wheel";

interface GGame {
  gold?: number;
  slices?: Array<[string, "gold", number, string] | [string, "item", ItemKey, string]>;
  cards?: Tuple<string, 78>;
  hours?: number;
  npc?: string;
  glyphs?: Tuple<string, 10>;
}
