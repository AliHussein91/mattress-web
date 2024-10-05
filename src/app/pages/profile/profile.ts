export interface Profile {
    "data": {
        "type": string
        "id": string
        "attributes": {
            "name": string
            "language": string
            "mobile_number": string
            "profile_picture": string
            "email": string
            "lat": string
            "lng": string
            "country_id": number | string,
            "is_active": boolean,
            "confirmed": boolean,
            "exchange_points": number | string,
            "unique_token": string
            "invite_friend_url": string
            "unread_notification_count": number | string,
        },
        "relationships": {
            "addresses": {
                "data": [
                    {
                        "type": string
                        "id": string
                    }
                ]
            },
            "country": {
                "data": {
                    "type": string
                    "id": string
                }
            }
        }
    },
    "included": [
        {
            "type": string
            "id": string
            "attributes": {
                "address"?: string,
                "mobile_number"?: string,
                "name"?: string
                "country_code"?: string
                "flag"?: string
            }
        }
    ],
    "meta": {
        "token": string,
        "message": string
    }
}