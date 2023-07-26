import { Session } from "./session";
import { Event } from "./event";

export interface EventInfo {
    event: Event,
    sessions: [Session]
}