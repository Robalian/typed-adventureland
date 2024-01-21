type ServersAndCharactersApiResponse = {
  type: "servers_and_characters";
  servers: [];
  characters: [];
};

type FriendsApiResponse = {
  type: "friends";
  chars: unknown[];
}

type MerchantsApiResponse = {
  type: "merchants";
  chars: Array<{
    map: MapKey;
    cx: string; // cosmetics
    skin: string;
    slots: Partial<Record<TradeSlotType, TradeItemInfo>>;
    name: string;
    level: number;
    afk: boolean | string;
    server: string;
    stand: StandKey | "cstand" /** computer stand */;
    y: number;
    x: number;
  }>;
};
type RawApiResponse = ServersAndCharactersApiResponse | MerchantsApiResponse;
type ApiResponse = BetterUXWrapper<RawApiResponse>;

interface ApiCalls {
  pull_merchants: MerchantsApiResponse;
  pull_friends: FriendsApiResponse;
}
