type ServerToClient_new_map_map_infos =
  | {
      dice: "bets" | "roll" | "lock";
      num?: string;
      seconds: number;
    }
  | Record<string, never>;

type ServerToClient_new_map = {
  direction: number;
  effect: number | "blink" | "magiport";
  entities: ServerToClient_entities;
  eval?: string;
  in: string;
  info?: ServerToClient_new_map_map_infos;
  m: number;
  name: MapKey;
  x: number;
  y: number;
};
