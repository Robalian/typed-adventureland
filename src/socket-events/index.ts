
type SocketWithEventsFunctions = Pick<
  TypedEventEmitter<ServerToClientEvents>,
  "on" | "once" | "off"
> &
  Pick<TypedEventEmitter<ClientToServerEvents>, "emit">;
