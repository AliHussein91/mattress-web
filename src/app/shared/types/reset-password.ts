import { Data } from "@angular/router"

export interface ResetPassword extends Data {
    "data": Data["data"] & {
        "attributes": {
            "otp": string,
            "user_id" :number,
            "password" :string,
            "password_confirmation":string
        }
    }
}
