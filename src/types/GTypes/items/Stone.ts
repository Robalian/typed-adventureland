import type { PositionKey } from "../positions/Positions";

export type StoneKey =
  | "stoneofgold" // Stone of Riches
  | "stoneofluck" // Stone of Luck
  | "stoneofxp"; // Stone of Wisdom

export interface GStone {
  ignore: boolean;
  skin_a: PositionKey;
  /** Cost of the item in gold, if an NPC were to sell this item. */
  g: number;
  /** The skin of the item. */
  skin: StoneKey;
  explanation: string;
  /** The type of item, `shield`, `weapon`, `gloves`... */
  type: "stone";
  days: number;
  /** The full display name of an item. */
  name: string;
}
