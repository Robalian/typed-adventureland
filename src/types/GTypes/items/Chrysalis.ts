type ChrysalisKey =
  | "chrysalis0" // Dragold's Chrysalis
  | "kitty1" // Egg
  | "puppy1"; // Egg

interface GChrysalis {
  a: boolean;
  explanation?: string;
  /** Cost of the item in gold, if an NPC were to sell this item. */
  g: number;
  grade: number;
  ignore: boolean;
  monster: MonsterKey;
  /** The full display name of an item. */
  name: string;
  /** The skin of the item. */
  skin: QuestKey;
  /** The type of item, `shield`, `weapon`, `gloves`... */
  type: "chrysalis";
}
