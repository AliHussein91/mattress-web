import { Data } from "./data";

export interface UserRegistation extends Data {
    "data": Data["data"] & {
        "attributes": {
            "profile_picture": number,
            "name": string,
            "email": string,
            "mobile_number": string,
            "country_id": number,
            "password": string,
            "password_confirmation": string,
            "lat": string,
            "lng": string,
            "invitation_token": null | string
        }
    }
}