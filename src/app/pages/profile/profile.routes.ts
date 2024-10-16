import { Route } from "@angular/router";
import { InfoComponent } from "./info/info.component";
import { AddressComponent } from "./address/address.component";
import { OrdersComponent } from "./orders/orders.component";
import { FavoritesComponent } from "./favorites/favorites.component";

export const profileRoutes: Route[]= [
    { 
        path: '',
        loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
        children: [
            {
                path: '',
                component: InfoComponent
            },
            {
                path: 'addresses',
                component: AddressComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'favorites',
                component: FavoritesComponent
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
]