export interface IEvent {
  event_id: string;
  event_name: string;
  odds: { win: number; draw: number; lose: number };
}

export interface IEventSelectedOddPair {
  eventId: string;
  oddType: "win" | "draw" | "lose";
}
