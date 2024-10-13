export interface Token {
    "id": string
    "type": string
    "name": string
    "language": string
    "mobile_number": string
    "profile_picture": string
    "email": string
    "lat": string
    "lng": string
    "country_id": number,
    "is_active": true,
    "confirmed": true,
    "exchange_points": number,
    "unique_token": string
    "invite_friend_url": string
    "unread_notification_count": number,
    "relationships": [
        "addresses",
        "country"
    ],
    "addresses": {
        "data": [
            {
                "id": string
                "type": string
                "address": string
                "mobile_number": string
                "relationships": [
                    "actions"
                ],
                "actions": {
                    "data": [
                        {
                            "id": string
                            "type": string
                            "endpoint_url": string
                            "method": string
                            "label": string
                            "bg_color": string
                            "key": string
                        }
                    ]
                }
            }
        ]
    },
    "country": {
        "data": {
            "id": string
            "type": string
            "name": string
            "country_code": string
            "flag": string
        }
    },
    "meta": {
        "token": string
        "message": string
    }
}