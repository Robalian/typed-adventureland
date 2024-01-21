type ServerToClient_action_base = {
  attacker: string;
  conditions?: Array<ConditionKey>;
  damage?: number;
  heal?: number;
  eta: number;
  m: number;
  pid: string;
  source: SkillKey;
  target: string;
  type: SkillKey;
  x: number;
  y: number;
};

type ServerToClient_action_projectile = ServerToClient_action_base & {
  projectile: ProjectileKey;
};

type ServerToClient_action_ray = ServerToClient_action_base & {
  instant: boolean;
};

type ServerToClient_action = ServerToClient_action_projectile | ServerToClient_action_ray;
