type ServerToClient_q_data = {
  num: number;
  p: {
    chance: number;
    level: number;
    name: ItemKey;
    nums: Array<number>;
    scroll: ItemKey;
    offering?: ItemKey;
    failure?: true;
    success?: true;
  };
  q: CharacterEntityQInfos;
};
