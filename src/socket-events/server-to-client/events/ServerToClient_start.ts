type ServerToClient_start = ServerToClient_player & {
  info?: ServerToClient_new_map_map_infos;
  code_slot: number;
  code_version: number;
  base_gold: {
    [T in MonsterKey]?: { [T in string]?: number };
  };
  s_info: ServerToClient_server_info;
  entities: ServerToClient_entities;
};
