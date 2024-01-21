type ImagesetKey = "custom" | "pack_1a" | "pack_20" | "skills";

interface GImageset {
  rows: number;
  file: string;
  columns: number;
  size: number;
  load?: boolean;
}
