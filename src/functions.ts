interface CanStackArgs {
  /** If true, will ignore the pvp flag. For an example, see bank_store. */
  ignore_pvp?: boolean;
}

declare function get_characters(): OnlineCharacter[];

declare function is_monster(entity: Entity): entity is MonsterEntity;
declare function is_character(entity: Entity): entity is CharacterEntity;

declare function resolving_promise<T>(data: T): Promise<T>;

declare function sleep(ms: number): Promise<void>;

declare function calculate_item_value(item: ItemInfo, m?: number): number;

declare function open_stand(inventoryIndex?: number): Promise<any>;
declare function close_stand(): Promise<any>;

declare function get_party(): Record<string, PartyCharacter>;

declare function is_object(arg: unknown): boolean;

declare function destroy(itemSlot: number): Promise<{ success: boolean; place: "destroy" }>;

/**
 * Moves the item at slot `slot` to slot `destSlot`.
 * Combines into slot `destSlot` if possible.
 * @param destSlot If combination is possible, items will end up here.
 * @param slot Second slot to swap/combine.
 */
declare function swap(destSlot: number, slot: number): Promise<unknown>;

/**
 * Created a new item instance (ALWAYS) with exactly `count` items
 * taken from the slot `slot`.
 * @param slot Slot to split.
 * @param count How many items should be in the new slot.
 */
declare function split(slot: number, count: number): Promise<unknown>;

/** Shuffles the elements of the array. */
declare function shuffle<T>(arr: Array<T>): Array<T>;

/** Sends a message in chat. */
declare function say(message: string): void;

declare function unmap_key(key: string): void;
declare function map_key(key: string, thing: string, arg?: string): void;
declare function set_keymap(keymap: Record<string, { name: SkillKey }>): void;
declare function load_code(nameOrSlot: string | number, onerror?: any): void;

/**
 * Accept a magiport request from a mage
 * @param name The name of the mage offering a magiport
 */
declare function accept_magiport(name: string): void;

/**
 * Accept the party invititation of another character (i.e. join their party)
 * @param name The name of the character offering a party invite
 */
declare function accept_party_invite(name: string): void;

/**
 * Accept the request of another character to join your party (i.e. let them join your party)
 * @param name The name of the character to allow in to your party
 */
declare function accept_party_request(name: string): void;

/**
 * Activate an item (likely a booster)
 * @param inventoryPosition The position of the item in your inventory
 */
declare function activate(inventoryPosition: number): void;

/**
 * Attack another monster or a player with your normal attack
 * @param target The target entity to attack (`parent.entities`)
 * @returns A promise containing information about the attack, such as the projectile, or a promise cointaining the error why the attack didn't work
 */
// TODO: Change the "any" to the promise that this declare function returns
declare function attack(target: Entity): Promise<any>;

/**
 * Buy an item from an NPC. This declare function can buy things with gold or shells.
 * @param item The name of the item you wish to purchase (`G.items`)
 * @param quantity How many items to buy. The default is to buy one item
 */
// TODO: Change the "any" to the promise that this declare function returns
declare function buy(
  item: ItemKey,
  quantity?: number
): Promise<{
  cost: number;
  num: number;
  name: ItemKey;
  q: number;
  success: true;
  response: "buy_success";
  place: "buy";
}>;

/**
 * Buy an item from an NPC using only gold. If you want to buy things with shells, use `buy_with_shells`.
 * @param item The name of the item you wish to purchase (`G.items`)
 * @param quantity How many items to buy. The default is to buy one item
 */
// TODO: Change the "any" to the promise that this declare function returns
declare function buy_with_gold(item: ItemKey, quantity?: number): Promise<any>;

/**
 * Buy an item from an NPC using only shells. If you want to buy things with gold, use `buy_with_gold`
 * @param item The name of the item you wish to purchase (`G.items`)
 * @param quantity How many items to buy. The default is to buy one item
 */
// TODO: Change the "any" to the promise that this declare function returns
declare function buy_with_shells(item: ItemKey, quantity?: number): Promise<any>;

/**
 * Check if you can attack the given target. This declare function also checks status conditions by calling `parent.is_disabled(character)` which checks statuses such as `rip` and `stunned`.
 * NOTE: If you just want to check the cooldown, consider using `is_on_cooldown("attack")`
 * @param target The target entity to check if you can attack (`parent.entities`)
 * @returns TRUE if the target is attackable, FALSE otherwise.
 */
declare function can_attack(target: Entity): boolean;

/**
 * Check if you can heal the given target.
 * @param target The target entity to check if you can heal (`parent.entities`)
 */
declare function can_heal(target: Entity): boolean;

/**
 * Checks if the given entity can transport. If given your own character, it will also check if you are already transporting
 * @param entity The entity to check
 * @returns TRUE if you are not currently transporting, and can transport, FALSE otherwise
 */
declare function can_transport(entity: Entity): boolean;

/**
 * Checks if the skill is usable by the given character. Also checks if the given skill is on cooldown.
 * @param skill The skill to check
 * @param returns TRUE if not on cooldown, FALSE otherwise.
 */
declare function can_use(skill: SkillKey): boolean;

declare function can_stack(
  itemA: ItemInfo,
  itemB: ItemInfo,
  additionalQuantity?: number,
  args?: CanStackArgs
): boolean;

/**
 * Quick check to see if you can use the door.
 * This can return false positives, so you should check `can_use_door` if this returns true.
 * @param map A given map (from `G.maps`)
 * @param door The given door (from `G.maps[map].doors`)
 * @param x The x position on the map
 * @param y The y position on the map
 * @returns TRUE if the door can be used from the given position, FALSE otherwise
 */
declare function is_door_close(map: MapKey, door: DoorInfo, x: number, y: number): boolean;

/**
 * Checks if you can use the given door from the given position
 * This declare function is costly, so only check when is_door_close is true.
 * @param map A given map (from `G.maps`)
 * @param door The given door (from `G.maps[map].doors`)
 * @param x The x position on the map
 * @param y The y position on the map
 * @returns TRUE if the door can be used from the given position, FALSE otherwise
 */
declare function can_use_door(map: MapKey, door: DoorInfo, x: number, y: number): boolean;

/**
 * Formats a floating number to a pretty string.
 *
 * @param num The number to format
 *
 * @returns A pretty string
 *
 * @example to_pretty_float(123456.789) // "123,456.78"
 */
declare function to_pretty_float(num: number): string;

/**
 * Formats a number to a pretty string.
 *
 * @param num The number to format
 *
 * @returns A pretty string
 *
 * @example to_pretty_num(123456.789) // "123,456"
 */
declare function to_pretty_num(num: number): string;

/**
 * Formats a number to a pretty string, with a given edge.
 * The number will only be formatted if it's greater than or equal to the edge.
 *
 * @param num The number to format
 * @param edge The edge to decide whether to format or not (default: 10000)
 *
 * @returns A pretty string
 *
 * @example to_pretty_num(123456.789, 100000) // "123,456"
 * @example to_pretty_num(1234.789, 10000) // "1234.789"
 */
declare function smart_num(num: number, edge?: number): string;

/**
 * Shrinks a number to its nearest unit.
 * The thresholds are:
 * -  1e3 (K)
 * -  1e6 (M)
 * -  1e9 (B)
 * - 1e12 (T)
 * @param num The number to shrink
 *
 * @returns A string with the number and its unit
 *
 * @example to_shrinked_num(123456.789) // "123K"
 * @example to_shrinked_num(1234567) // "1.2M"
 */
declare function to_shrinked_num(num: number): string;

/**
 * Changes the target of the player. Use in association with `get_targeted_monster()`.
 * @param target A given target (from `parent.entities`)
 */
declare function change_target(target?: Entity): void;

/**
 * Clears all drawings from the window. Use this declare function to clean up `draw_circle` and `draw_line`.
 */
declare function clear_drawings(): void;

/**
 * Runs the given code snippet for the given character.
 * @param character The name of the character
 * @param code The code snippet to run (using eval)
 */
declare function command_character(character: string, code: string): void;

/**
 * Compounds the three items for a chance at obtaining 1 higher level item of the same kind.
 * @param itemSlot1 The inventory position of the first item
 * @param itemSlot2 The inventory position of the second item
 * @param itemSlot3 The inventory position of the third item
 * @param scrollSlot The inventory position of the scroll to use to combine the three items
 * @param offeringSlot The inventory position of the offering (e.g. Primordial Essence) to use
 * @param onlyCalculate If set to true, no action if performed and the success chance is returned.
 */
declare function compound(
  itemSlot1: number,
  itemSlot2: number,
  itemSlot3: number,
  scrollSlot: number,
  offeringSlot?: number | null,
  onlyCalculate?: false
): Promise<BetterUXWrapper<CompoundSuccessResponse | CompoundFailureResponse>>;
declare function compound(
  itemSlot1: number,
  itemSlot2: number,
  itemSlot3: number,
  scrollSlot: number,
  offeringSlot: number | null | undefined,
  onlyCalculate: true
): Promise<CompoundCalculateResponse>;

type CompoundSuccessResponse = {
  success: boolean;
  level: number;
  num: number;
};

type CompoundCalculateResponse = {
  calculate: boolean;
  chance: number;
  item: ItemInfo;
  scroll: string;
  grace: number;
  success: boolean;
  response: string;
  place: string;
};

type CompoundFailureResponse = {
  reason: string;
};

/**
 * Consumes the given item (e.g. Candy Pop)
 * @param item The inventory position of the item
 */
declare function consume(item: number): void;

type CraftSuccessResponse = {
  num: number;
  name: ItemKey;
  success: true;
  response: "craft";
  place: "craft";
};

type CraftFailureResponse = {
  failed: true;
  reason: string;
};

/**
 * Crafts the given item if you can craft that item, you have the required items, and you have enough gold.
 * @param name The name of the item to craft (`G.craft`)
 */
declare function auto_craft(
  name: ItemKey
): Promise<BetterUXWrapper<CraftSuccessResponse | CraftFailureResponse>>;

/**
 * Crafts the given items. Note: Some recipes might require gold to craft, too.
 * @param item0 The inventory position of the item to be put in the top left crafting slot
 * @param item1 The inventory position of the item to be put in the top middle crafting slot
 * @param item2 The inventory position of the item to be put in the top right crafting slot
 * @param item3 The inventory position of the item to be put in the center left crafting slot
 * @param item4 The inventory position of the item to be put in the center middle crafting slot
 * @param item5 The inventory position of the item to be put in the center right crafting slot
 * @param item6 The inventory position of the item to be put in the bottom left crafting slot
 * @param item7 The inventory position of the item to be put in the bottom middle crafting slot
 * @param item8 The inventory position of the item to be put in the bottom right crafting slot
 */
declare function craft(
  item0: number,
  item1?: number,
  item2?: number,
  item3?: number,
  item4?: number,
  item5?: number,
  item6?: number,
  item7?: number,
  item8?: number
): Promise<BetterUXWrapper<CraftSuccessResponse | CraftFailureResponse>>;

/**
 * Overrides the character to walk at `Math.min(parent.character.speed, cruise_speed)` speed.
 * @param speed The speed at which to walk at
 */
declare function cruise(speed: number): void;

/** Feed this declare function a value like (character.apiercing - target.armor) and it spits out a multiplier so you can adjust your expected damage */
declare function damage_multiplier(difference: number): number;
declare function distance(from: IPosition | PositionReal, to: IPosition | PositionReal): number;

declare function equip(inventoryPostion: number, slot?: SlotType): Promise<unknown>;

declare function dismantle(inventoryPostion: number): Promise<unknown>;

/**
 * Will html_escape the message before displaying it.
 * If the message is an object, it will be stringified.
 * @param message The string or object with potential html that should be escaped.
 * @param color Can be used to override the color of the message. Any CSS color is fine.
 *
 * @see game_log if you want to print text as-is.
 * @see log if you don't want to escape the text but still stringify objects.
 */
declare function safe_log(message: any, color?: string): void;

/**
 * Displays a log message in the game log. This is not the chat and other players can't see it.
 * @param message The message that will be printed. Should NOT contain html.
 * @param color Can be used to override the color of the message. Any CSS color is fine.
 *
 * @warning This declare function won't escape html. See `safe_log` if you want to log unsafe data.
 *
 * @see safe_log if you want to escape a string or object that might contain html.
 * @see log if you want to stringify an object.
 */
declare function game_log(message: any, color?: string): void;

/**
 * Displays a string in the game logs. If the message is an object, it will be stringified.
 *
 * @param message A string or an object that should be stringified.
 * @param color Can be used to override the color of the message. Any CSS color is fine.
 *
 * @see game_log if you want to print text as-is.
 * @see safe_log if you want to escape a string or object that might contain html.
 */
declare function log(message: any, color?: string): void;

/**
 * Retrieves a value stored in localstorage.
 * @param key The key to retrieve.
 */
declare function get<T>(key: string): T;

declare function get_targeted_monster(): MonsterEntity | null;
declare function get_target(): CharacterEntity | Entity | null;
declare function get_target_of(entity: Entity): Entity | null;
declare function get_player(name: string): CharacterEntity;

declare function get_nearest_monster(args: {
  /**
   * Maximum attack the monster should have.
   */
  max_att?: number;

  /**
   * Minimum XP the monster should give.
   */
  min_xp?: number;

  /**
   * Only return monsters that target this "name" or player object
   */
  target?: string | { name: string };

  /**
   * Only pick monsters that don't have any target.
   */
  no_target?: boolean;

  /**
   * Checks if the character can move to the target.
   */
  path_check?: boolean;

  /**
   * Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)`.
   *
   * @since [08/02/17]
   */
  type?: string;
}): MonsterEntity | null;

declare function heal(target: Entity): any;
declare function use_hp_or_mp(): void;
declare function interact(name: string) : Promise<{started:true} | {completed:true} | {failed:true}>;
/** Checks whether or not we can attack other players */
declare function is_pvp(): boolean;
declare function is_in_range(entity: Entity, skill?: SkillKey): boolean;
declare function is_transporting(entity: Entity): boolean;
declare function is_moving(entity: Entity): boolean;
declare function is_on_cooldown(skill: SkillKey): boolean;

/** returns true if you are silenced or disabled */
declare function is_silenced(entity: Entity): boolean;

/** returns true if you are dead, stunned, fingered, stoned, deepfreezed or sleeping */
declare function is_disabled(entity: Entity): boolean;

/**
 * If no ID is given, it will loot some chests.
 * @param id The ID of a chest (from `parent.chests`)
 */
declare function loot(id?: string): Promise<any>;

declare function mssince(date: Date): number;
declare function reduce_cooldown(skill: SkillKey, ms: number): void;
declare function respawn(): any;
/** Quantity defaults to 1 if not set */
declare function sell(inventoryPostion: number, quantity?: number): any;
declare function send_cm(to: string | string[], data: any): any;
declare function send_gold(to: string | { name: string }, amount: number): any;
declare function send_item(
  to: string | { name: string },
  inventoryPostion: number,
  quantity?: number
): Promise<
  BetterUXWrapper<
    | {
        response: "item_sent";

        /** Character you sent the item to */
        name: string;

        /** Item you sent */
        item: ItemKey;

        /** Quantity sent */
        q: number;

        /** Slot the item you sent was in */
        num: number;

        place: "send";
        success: true;
      }
    | {
        response: string;
        reason: string;
        failed: true;
        place: "send";
      }
  >
>;
declare function send_local_cm(to: string, data: any): any;
/**
 *
 * @param name name could be a player object, name, or id
 * @param isRequest If isRequest is set to true, it will send a party request
 */
declare function send_party_invite(name: any, isRequest?: boolean): any;
declare function send_party_request(name: string): any;

declare function leave_party(): Promise<void>;

declare function get_active_characters(): {
  [characterName: string]: "self" | "starting" | "loading" | "active" | "code";
};

/**
 * Renders the object as json inside the game.
 * @param value Whatever you want to display.
 */
declare function show_json(value: any): void;
declare function set(key: string, value: unknown): unknown;
declare function set_message(text: string, color?: string): any;
declare function set_skillbar(keys: string[]): void;
declare function set_skillbar(...keys: string[]): void;
declare function simple_distance(from: IPosition | PositionReal, to: IPosition | PositionReal): number;

declare function start_character(characterName: string, codeSlotOrName?: string | number): any;
/** stops moving, or channeled actions */
declare function stop(action?: string): any;
declare function stop_character(name: string): any;
/** For buying things off players' merchants */
declare function trade_buy(target: Entity, trade_slot: TradeSlotType, quantity?: number): any;
/** For selling things to player merchants */
declare function trade_sell(target: Entity, trade_slot: TradeSlotType, quantity?: number): any;
declare function transport(map: MapKey, spawn?: number): any;
declare function unequip(slot: SlotType | TradeSlotType): any;

/** Used to leave jail, cyberland and maybe others. */
declare function leave(): Promise<unknown>;

declare function upgrade(
  item_slot: number,
  scroll_slot: number,
  offering_slot?: number | null,
  only_calculate?: false
): Promise<{
  success: boolean;
  level: number;

  stat?: boolean;
  stat_type?: string;

  /** Slot index */
  num: number;
}>;
declare function upgrade(
  item_slot: number,
  scroll_slot: number,
  offering_slot: number | null | undefined,
  only_calculate: true
): Promise<{
  success: boolean;
  level: number;

  /** Success chance */
  chance: number;

  stat?: boolean;
  stat_type?: string;

  /** Slot index */
  num: number;
}>;

declare function exchange(item_slot: number): Promise<{
  success: boolean;

  /** Slot index */
  num: number;

  /** The item obtained from the exchange. Can be undefined if gold or nothing. */
  reward?: ItemKey;
}>;

/**
 * Lists an item as selling in the merchant stand.
 * @param inventoryPosition
 * @param tradeSlot
 * @param price
 * @param quantity
 */
declare function trade(
  inventoryPosition: number,
  tradeSlot: number | TradeSlotType,
  price: number,
  quantity: number
): unknown;

/**
 * Lists an item as wanted in the merchant stand.
 * @param slot
 * @param name
 * @param price
 * @param q
 * @param level
 */
declare function wishlist(
  slot: TradeSlotType | number,
  name: ItemKey,
  price: number,
  level?: number,
  q?: number
): unknown;

/**
 * Will start a giveaway where characters can enlist in hope of getting the item.
 * @param slot Giveaway slot to add the item into.
 * @param inventoryPosition Inventory slot of the item to giveaway.
 * @param q Quantity to giveaway.
 * @param minutes How long the giveaway should last.
 */
declare function giveaway(slot: number, inventoryPosition: number, q: number, minutes: number): unknown;

/**
 * Joins a giveaway for the specified item
 * @param characterName Name of the character you want to join the giveaway of
 * @param slot_name Trade slot containing the item you want to join the giveaway of
 * @param rid Unique id of the item you want to join the giveaway of
 */
declare function join_giveaway(characterName: string, slot_name: TradeSlotType, rid: string): unknown;

type ShiftResult = {
  name: BoosterKey;
  success: boolean;
  response: "data";
  place: "booster";
};

/**
 * Will change the type of the booster to the specified one.
 * @param inventoryPosition Inventory slot of the booster to shift.
 * @param toBooster Type the booster should be of.
 */
declare function shift(inventoryPosition: number, toBooster: BoosterKey): Promise<ShiftResult>;

declare function join(eventName: EventKey): Promise<any>;
/**
 * MOVEMENT METHODS
 */

/**
 * returns the position of the npc with the specified id, the first map it encounters with the npc is returned, it does not priortize your current map.
 * @param id The key of the npc from G.npcs
 */
declare function find_npc(id: NpcKey): IPosition;

/** This declare function uses move() if it can, otherwise it uses smart_move() */
declare function xmove(entity: PositionReal): Promise<boolean>;
declare function xmove(x: number, y: number): Promise<boolean>;

/**
 * It validates against the map geometry from G.geometry doing 2d "raycasting" to see if we will hit a wall if we go in a straight line
 * Checks if the you can move from `[position.x, position.y] to [position.going_x, position.going_y]
 * @param entity The moveable entity you want to check is movable
 * @returns TRUE if you can move there, FALSE otherwise
 */
declare function can_move(
  position: IPosition & {
    going_x: number;
    going_y: number;
    base?: {
      h: number;
      v: number | null;
      vn: number;
    };
  }
): boolean;

// declare function can_move(position: PositionMovable & { base: EntityBase }): boolean;

/**
 * Checks if you can move your character to the given destination on your current map from your current position
 * @param destination A position object containing the destination coordinates
 * @returns TRUE if you can move there, FALSE otherwise
 */
declare function can_move_to(destination: ICoordReal): boolean;
/**
 * Checks if you can move your character to the given destination on your current map
 * @param x The x-coordinate that you want to move to
 * @param y The y-coordinate that you want to move to
 * @returns TRUE if you can move there, FALSE otherwise
 */
declare function can_move_to(x: number, y: number): boolean;

type MoveFailureResponse = {
  reason: string | "unable" | "interrupted";
};
/**
 * The promise returned is not upon arrival at the destination, it's upon the server confirming it recieved your request.
 * @param x
 * @param y
 */
declare function move(x: number, y: number): Promise<MoveResponse>;
type MoveResponse = void | MoveFailureResponse;
type SmartMoveMapPosition =
  | "town"
  | "upgrade"
  | "exchange"
  | "potions"
  | "scrolls"
  | "compound";
type SmartMoveToDestination =
  | NpcKey
  | IPosition
  | MapKey
  | MonsterKey
  | SmartMoveMapPosition;

type SmartMoveSuccess = { success: true };
type SmartMoveFailure = { success: false; reason: string | "invalid" };
type SmartMoveResponse = SmartMoveSuccess | SmartMoveFailure;
declare function smart_move(
  destination:
    | SmartMoveToDestination
    | {
        to: SmartMoveToDestination;
        return?: boolean;
      },
  /**
   * a callback declare function with true or false ad the argument depending on smart_move success or failure
   * @deprecated on_done declare function is an old callback declare function for compatibility, smart_move also returns a Promise [25/03/20]
   */
  on_done?: () => Promise<void | boolean>
): Promise<SmartMoveResponse>;

/**
 * Checks if the given entity can walk (i.e. move). If given your own character, it will also check if you are already transporting.
 * @param entity The entity to check
 * @returns TRUE if you are not currently transporting, and can walk, FALSE otherwise
 */
declare function can_walk(entity: Entity): boolean;

/** Contains information about smart_move() */
let smart: IPosition & {
  /** If searching and false, we are still searching. If  */
  found: boolean;
  /** If .moving == true, we are moving or searching */
  moving: boolean;
  plot: PositionSmart[];
  /** If ().moving == false && .searching == true), we are searching for a path. */
  searching: boolean;
  start_x: number;
  start_y: number;
  /** A settable flag. If true, smart_move will use town teleports to move around */
  use_town: boolean;
};

/**
 * Contains elements that describe a door
 * [0]: The x-position of the door
 * [1]: The y-position of the door
 * [2]: The width of the door
 * [3]: The height of the door
 * [4]: The map that this door leads to (use in combination with [5] (spawn))
 * [5]: The spawn that this door leads to (use in combination with [4] (map))
 * [6]: The spawn that this door is close to on the current map
 * [7]: ??? Maybe "locked" or "ulocked"?
 * [8]: ??? There's reference to "complicated" in smart_move?
 */
type DoorInfo = [number, number, number, number, MapKey, number?, number?, string?, string?];

interface OnlineCharacter {
x: number;
y: number;
map: MapKey;
in: string;
name: string;
level: number;
skin: string;
server: string;
secret: string;
cx?: {
  head?: string;
  hair?: string;
};
online: number;
type: string;
id: string;
}

interface PartyCharacter {
  x: number;
  y: number;
  map: MapKey;
  in: string;
  skin: string;
  level: number;
  type: string;

  /** This number refers to the percent of gold you get when one of the party members loots a chest */
  share: number;
  pdps: number;
  l: number;
  xp: number;
  luck: number;
  gold: number;
  cx?: {
    head?: string;
    hair?: string;
  };
}
