export interface User {
    "data": {
        "type": string,
        "id": string,
        "attributes": {
            "name": string,
            "language": string,
            "mobile_number": string,
            "profile_picture": string,
            "email": string,
            "lat": string,
            "lng": string,
            "country_id": number,
            "is_active": boolean,
            "confirmed": boolean,
            "exchange_points": number,
            "unique_token": string,
            "invite_friend_url": string,
            "unread_notification_count": number
        },
        "relationships": {
            "addresses": {
                "data": []
            },
            "country": {
                "data": {
                    "type": string,
                    "id": string,
                }
            }
        }
    },
    "included": [
        {
            "type": string,
            "id": string,
            "attributes": {
                "name": string,
                "country_code": string,
                "flag": string,
            }
        }
    ],
    "meta": {
        "token": string,
        "message": string,
    }
}
