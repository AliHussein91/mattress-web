import { Order } from "./order";

export interface Orders {
    data: Order[],
    "meta": {
        "pagination": {
            "total": number,
            "count": number,
            "per_page": number,
            "current_page": number,
            "total_pages": number
        }
    }
}