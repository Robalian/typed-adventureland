type SkillKey_NoParameter = Extract<
  SkillKey,
  | "agitate"
  | "alchemy"
  | "charge"
  | "cleave"
  | "darkblessing"
  | "dash"
  | "fishing"
  | "hardshell"
  | "invis"
  | "light"
  | "massproduction"
  | "massproductionpp"
  | "mcourage"
  | "mining"
  | "mshield"
  | "partyheal"
  | "scare"
  | "selfheal"
  | "stomp"
  | "warcry"
>;

type SkillKey_TargetParameter = Extract<
  SkillKey,
  | "4fingers"
  | "absorb"
  | "attack"
  | "burst"
  | "charm"
  | "curse"
  | "heal"
  | "huntersmark"
  | "magiport"
  | "mentalburst"
  | "mluck"
  | "pickpocket"
  | "piercingshot"
  | "purify"
  | "quickpunch"
  | "quickstab"
  | "reflection"
  | "rspeed"
  | "smash"
  | "snowball"
  | "supershot"
  | "taunt"
  | "zapperzap"
>;

type SkillKey_ItemNeeded = Extract<SkillKey, "pcoat" | "shadowstrike">;

type SkillKey_ItemAndTargetNeeded = Extract<
  SkillKey,
  "entangle" | "poisonarrow" | "revive" | "snowball"
>;
//  TODO: you can't supply coordinates to dash
// else if(name=="dash")
// 	{
// 		var d=character.direction;
// 		socket.emit("skill",{name:"dash",x:get_x(character)+[0,-40,40,0][d],y:get_y(character)+[40,0,0,-40][d]});
// 	}

type SkillKey_CoordinatesNeeded = Extract<SkillKey, "blink">;

type SkillTarget = string | { id: string };

declare function use_skill(name: "use_hp" | "use_mp"): Promise<unknown>;

declare function use_skill(name: "regen_hp" | "regen_mp"): Promise<unknown>;

declare function use_skill(name: "magiport", target: SkillTarget): Promise<unknown>;

declare function use_skill(name: "use_town" | "town"): Promise<unknown>;

/** For destination, it's an array of [x, y] */
declare function use_skill(
  name: SkillKey_CoordinatesNeeded,
  pos: [x: number, y: number]
): Promise<unknown>;

// cburst with no target
// var hostiles=get_nearby_hostiles({range:character.range-2,limit:12}),targets=[],mp=character.mp-200,hmp=parseInt(mp/hostiles.length);
// 		hostiles.forEach(declare function(hostile){
// 			targets.push([hostile.id,hmp]);
// 		});

/** The string is the ID of the target, the number is how much mana to spend on the attack */
declare function use_skill(
  name: "cburst",
  targets: [target: SkillTarget, mana: number][]
): Promise<unknown>;

// if(target && is_array(target))
// 	for(var i=0;i<target.length;i++)
// 	{
// 		if(target[i] && target[i].id) target[i]=target[i].id; // "3shot", "5shot"
// 		if(target[i] && target[i][0] && target[i][0].id) target[i][0]=target[i][0].id; // "cburst"
// 	}

/** if no target is supplied, it will find 3 targets in character.range-2 */
declare function use_skill(name: "3shot"): Promise<Array<unknown>>;

declare function use_skill(name: "3shot", targets: Tuple<SkillTarget, 1>): Promise<Tuple<unknown, 1>>;
declare function use_skill(name: "3shot", targets: Tuple<SkillTarget, 2>): Promise<Tuple<unknown, 2>>;
declare function use_skill(name: "3shot", targets: Tuple<SkillTarget, 3>): Promise<Tuple<unknown, 3>>;

/** if no target is supplied, it will find 5 targets in character.range-2 */
declare function use_skill(name: "5shot"): Promise<Array<unknown>>;

declare function use_skill(name: "5shot", targets: Tuple<SkillTarget, 1>): Promise<Tuple<unknown, 1>>;
declare function use_skill(name: "5shot", targets: Tuple<SkillTarget, 2>): Promise<Tuple<unknown, 2>>;
declare function use_skill(name: "5shot", targets: Tuple<SkillTarget, 3>): Promise<Tuple<unknown, 3>>;
declare function use_skill(name: "5shot", targets: Tuple<SkillTarget, 4>): Promise<Tuple<unknown, 4>>;
declare function use_skill(name: "5shot", targets: Tuple<SkillTarget, 5>): Promise<Tuple<unknown, 5>>;

declare function use_skill(name: "throw", target: SkillTarget, inventorySlot: number): Promise<unknown>;

declare function use_skill(name: "energize", target: SkillTarget, mp: number): Promise<unknown>;

// TODO: Skills accepting a target have `G.skills[name].target` set.
// Object.entries(G.skills).filter(([x,y]) => y.target)
// mtangle but it seems like it's a monster ability, and not a skill, type is monster
// TODO: G.skills[name].target can be `true`, `"player"` or `"monster"`.

/**
 * Skills expecting a target will default to the current target if none is explicitely specified.
 */
declare function use_skill(name: SkillKey_TargetParameter, target?: SkillTarget): Promise<unknown>;
declare function use_skill(name: SkillKey_NoParameter): Promise<unknown>;

// TODO: warp?
// else if(name=="warp")
// {
// 	if(target && is_string(target) && !target[2]) target[2]=character.map;
// 	else if(!target || !target[2] || is_string(target))
// 	{
// 		var trset=false;
// 		for(var id in G.maps)
// 		{
// 			var map=G.maps[id];
// 			if(map.ignore || map.instance) continue;
// 			map.spawns.forEach(declare function(s){
// 				if(trset) return;
// 				if(Math.random()<0.02) trset=true,target=[s[0],s[1],id];
// 			});
// 		}
// 		if(!trset) target=[Math.random()*100,Math.random()*100,"main"];
// 	}
// 	socket.emit("skill",{name:"warp",x:target[0],y:target[1],'in':target[2]});
// }
