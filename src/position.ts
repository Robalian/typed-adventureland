interface ICoord {
  x: number;
  y: number;
}

interface ICoordReal {
  real_x: number;
  real_y: number;
}

type IPosition = {
  /**
   * Contains the name of the map
   */
  map?: MapKey;
  x: number;
  y: number;
};
type PositionReal = IPosition & {
  map: MapKey;
  real_x: number;
  real_y: number;
};

type PositionMovable = PositionReal & {
  from_x?: number;
  from_y?: number;
  going_x: number;
  going_y: number;
};

type PositionSmart = IPosition & {
  map: MapKey;
  transport?: boolean;
  i?: number;
  s?: number;
};
