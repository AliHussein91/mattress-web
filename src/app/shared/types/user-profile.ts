export interface UserProfile {
    "data": {
        "type": string
        "id": string
        "attributes": {
            "name": string
            "language": string
            "otp": string
            "mobile_number": string
            "profile_picture": string
            "email": string
            "is_active": true,
            "confirmed": false
        },
        "relationships": {
            "actions": {
                "data": [
                    {
                        "type": string
                        "id": string
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": string
            "id": string
            "attributes": {
                "endpoint_url": string
                "method": string
                "label": string
                "bg_color": string
                "key": string
            }
        }
    ],
    "meta": {
        "message": string
    }
}