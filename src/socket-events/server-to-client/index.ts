interface ServerToClientEvents {
  achievement_progress: ServerToClient_achievement_progress;
  action: ServerToClient_action;
  chat_log: ServerToClient_chat_log;
  chest_opened: ServerToClient_chest_opened;
  cm: ServerToClient_cm;
  code_eval: ServerToClient_code_eval;
  death: ServerToClient_death;
  disappear: ServerToClient_disappear;
  disappearing_text: ServerToClient_disappearing_text;
  disconnect_reason: ServerToClient_disconnect_reason;
  drop: ServerToClient_drop;
  eval: ServerToClient_eval;
  emotion: ServerToClient_emotion;
  entities: ServerToClient_entities;
  // TODO: Confirm that there isn't a separate `friends` socket event
  friend: ServerToClient_friend;
  game_error: ServerToClient_game_error;
  game_event: ServerToClient_game_event;
  game_log: ServerToClient_game_log;
  game_response: ServerToClient_game_response;
  hit: ServerToClient_hit;
  invite: ServerToClient_invite;
  limitdcreport: ServerToClient_limitdcreport;
  lostandfound: ServerToClient_lostandfound;
  magiport: ServerToClient_magiport;
  new_map: ServerToClient_new_map;
  notthere: ServerToClient_notthere;
  party_update: ServerToClient_party_update;
  ping_ack: ServerToClient_ping_ack;
  player: ServerToClient_player;
  players: ServerToClient_players;
  pm: ServerToClient_pm;
  q_data: ServerToClient_q_data;
  request: ServerToClient_request;
  /** Item list from Ponty */
  secondhands: ServerToClient_secondhands;
  server_info: ServerToClient_server_info;
  skill_timeout: ServerToClient_skill_timeout;
  start: ServerToClient_start;
  tavern: ServerToClient_tavern;
  tracker: ServerToClient_tracker;
  ui: ServerToClient_ui;
  upgrade: ServerToClient_upgrade;
  welcome: ServerToClient_welcome;
}
