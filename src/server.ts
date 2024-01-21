declare const server: Server;

/**
 * Changes servers. This will reload the page (the URL will change to match the server given), which means your code will also reload.
 * @param region The region to change to (e.g. ASIA)
 * @param identifier The server identifier to change to (e.g. PVP)
 */
declare function change_server(
  region: ServerRegion,
  identifier: ServerIdentifier
): void;

type Server = {
  mode: string;
  pvp: boolean;
  region: ServerRegion;
  id: ServerIdentifier;
};

// TODO: type it properly so correct server identifiers only exist where valid
// TODO: Confirm that PVP is actually the identifier for PVP servers
type ServerIdentifier = "I" | "II" | "III" | "PVP";

type ServerRegion = "ASIA" | "US" | "EU";
