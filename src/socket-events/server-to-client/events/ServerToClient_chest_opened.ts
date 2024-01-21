type ServerToClient_chest_opened_loot = {
  id: string;
  gold: number;
  goldm: number;
  items: Array<{
    name: string;
    q?: number;
    level?: number;
    looter: string;
  }>;
  opener: string;
  party: boolean;
};

type ServerToClient_chest_opened_gone = {
  id: string;
  gone: true;
};

type ServerToClient_chest_opened =
  | ServerToClient_chest_opened_loot
  | ServerToClient_chest_opened_gone;
