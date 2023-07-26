import { Event } from "./event";
import { SessionProduct } from "./session-product";

export interface Product {
    event: Event,
    sessionsProduct: SessionProduct[]
}