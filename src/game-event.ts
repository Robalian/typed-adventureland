type GameWithEventsFunctions = Pick<TypedEventEmitter<GameEvents>, "on" | "once" | "off"> & {
  all(callback?: (name: any, data: any) => void): void;
};

interface GameHitEvent {
  source: string;
  /** monster id or character name, perhaps NPC name? */
  actor: string;
  /** monster id or character name, perhaps NPC name?  */
  target: string;
  damage?: number;
  /** projectile id */
  pid?: string;
  heal?: number; // Set if the projectile was healing
  crit?: boolean;
  kill?: boolean;
  evade?: boolean;
  miss?: boolean;
  /**
   * Outrunning the projectile
   */
  avoid?: boolean;
  /**
   * Whether the attack poisoned the target
   */
  poison?: boolean;
  /**
   * Whether the attack freezed the target
   */
  freeze?: boolean;
  /**
   * Whether the attack stunned the target
   */
  stun?: boolean;
  /** Reflected damage */
  reflect?: number;
  /**
   * Returned damage
   */
  dreturn?: number;
  trigger?: string; // "sugarrush"; // Set when the attack triggered a condition/buff
  condition?: string; //"curse"; // Could be both a positive or negative condition for the target
  sneak?: boolean; // Set if this was a Rogue sneak attack
  stacked?: string[]; // Array of ID's - If multiple opponents staying in the same spot got hit
  mobbing?: number; // If 4+ monsters target you, their attacks increase the mobbing intensity/damage
  unintentional?: boolean; // true for the non-main targets of a stacked attack
  aoe?: boolean; // true for uncontrollable attacks like cleave and shadowstrike
  // Not all properties are always set, if the value is false, [] or 0 - they are usually not set
}

interface ActionEvent {
  source: string;
  /** monster id or character name, perhaps NPC name? */
  actor: string;
  /** monster id or character name, perhaps NPC name?  */
  target: string;

  projectile?: string; // momentum, heal, curse
  /** Arrival in ms  */
  eta?: number;
  /** projectile id */
  pid?: string;

  ray?: string;
  instant?: boolean;
}

// interface GameAttackActionEvent extends ActionEvent {
//   source: "attack";
//   damage: number;
//   projectile: "momentum";
//   /** Arrival in ms */
//   eta: number;
//   /** projectile id */
//   pid: string;
// }

// interface GameHealActionEvent extends ActionEvent {
//   source: "heal";
//   heal: number;
//   projectile: "heal";
//   /** Arrival in ms */
//   eta: number;
//   /** projectile id */
//   pid: string;
// }

// interface GameCurseActionEvent extends ActionEvent {
//   source: "curse";
//   projectile: "curse";
//   /** Arrival in ms */
//   eta: number;
//   /** projectile id */
//   pid: string;
// }

// interface GameBurstActionEvent extends ActionEvent {
//   source: "burst";
//   ray: "burst";
//   instant: boolean;
// }

/**
 * Item bought from an NPC
 */
interface GameBuyEvent {
  type: "+$";
  id: NpcKey;
  /** character name */
  name: string;
  item: ItemInfo; //{ name: "mpot1"; q: 1 };
  event: "buy";
}
interface GameSellEvent {
  type: "-$";
  id: NpcKey;
  /** character name */
  name: string;
  item: ItemInfo; //{ name: "strbelt"; level: 0 };
  num: number;
  event: "sell";
}

/**
 * Item bought from Ponty aka secondhand
 */
interface GamePontyBuy {
  /** Character who triggered the event */
  name: string;
  item: {
    name: ItemKey;
    level: number;
    rid: string;
    q: number;
    cash?: boolean;
  };
}

/** Item bought from Lost and Found */
interface GameLostAndFoundBuy {
  /** Character who triggered the event */
  name: string;
  item: {
    name: ItemKey;
    level: number;
    rid: string;
    q: number;
  };
}

interface GameEvents {
  level_up: {
    /** Character name */
    name: string;
    level: number;
  };
  event: {
    /** snowman, pinkgoo, wabbit, franky, grinch */
    name: string; // TODO: strongly typed names?
    map?: MapKey;
    x?: number;
    y?: number;
    // TODO: are there other data types for event?
  };
  shutdown: {
    /**
     * Server shutdown in 20 seconds
     */
    seconds: number;
  };
  item_sent: {
    // Player to player item transfer
    sender: string;
    receiver: string;
    item: ItemInfo;
  };
  gold_sent: {
    // Player to player item transfer
    sender: string;
    receiver: string;
    gold: number;
  };
  cx_sent: {
    // cosmetics transfer
    sender: string;
    receiver: string;
    cx: string; // hat999 // TODO: cosmetics key?
  };
  api_response: ApiResponse;

  /** Item bought from Ponty */
  sbuy: {
    /** Character who triggered the event */
    name: string;
    item: ItemInfo;
  };
  /** Item bought from Lost and Found */
  fbuy: {
    /** Character who triggered the event */
    name: string;
    item: {
      name: ItemKey;
      level: number;
      rid: string;
      q: number;
    };
  };
  death: {
    /** Character Name or Monster ID  */
    id: string;

    /** Luck taken into account when looting */
    luckm: number;

    /** Contribution distribution for cooperative monsters */
    points?: Record<string, number>;
  };
  mluck: {
    /** Character Name  */
    name: string;

    item: ItemInfo;

    /** Inventory slot */
    num: number;
  };
  trade: {
    /** Character Name  */
    seller: string;

    /** Character Name  */
    buyer: string;

    item: ItemInfo;

    slot: string;
  };
  hit: HitData;
}
