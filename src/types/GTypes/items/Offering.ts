type OfferingKey =
  | "offering" // Primordial Essence
  | "offeringp" // Primling
  | "offeringx"; // Primordial X

interface GOffering {
  a: boolean;
  explanation: string;
  /** Cost of the item in gold, if an NPC were to sell this item. */
  g: number;
  grade: number;
  /** The full display name of an item. */
  name: string;
  /** Indicates how many of this items you can stack. Set if the item is stackable. */
  s: number;
  /** The skin of the item. */
  skin: string;
  /** The type of item, `shield`, `weapon`, `gloves`... */
  type: "offering";
}
