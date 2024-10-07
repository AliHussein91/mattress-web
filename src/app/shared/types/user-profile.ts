export interface UserProfile {
    "id": string
    "type": string
    "name": string
    "language": string
    "mobile_number": string
    "profile_picture": string
    "email": string
    "lat": string
    "lng": string
    "country_id": 1,
    "is_active": true,
    "confirmed": true,
    "exchange_points": 0,
    "unique_token": string
    "invite_friend_url": string
    "unread_notification_count": 0,
    "relationships": [],
    "addresses": {
        "data": []
    },
    "country": {
        "data": {
            "id": string
            "type": string
            "name": string
            "country_code": string
            "flag": string
        }
    }

}