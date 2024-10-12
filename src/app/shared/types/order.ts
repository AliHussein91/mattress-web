export interface Order {
    
        "id": string
        "type": string
        "products_prices_sum_coast": number,
        "shipping_coast": number,
        "total_coast": number,
        "extra_notes": null,
        "applied_promocode": number,
        "lat": string
        "lng": string
        "status": string
        "created_at": string
        "relationships": [
            "orderProducts",
            "userAddress"
        ],
        "orderProducts": {
            "data": [
                {
                    "id": string
                    "type": string
                    "quantity": number,
                    "price": number,
                    "relationships": [
                        "product",
                        "productSize"
                    ],
                    "product": {
                        "data": {
                            "id": string
                            "type": string
                            "name": string
                            "mini_description": string
                            "description": string
                            "image": string
                        }
                    },
                    "productSize": {
                        "data": {
                            "id": string
                            "type": string
                            "size": string
                        }
                    }
                }
            ]
        },
        "userAddress": {
            "data": {
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
        }
    
}
