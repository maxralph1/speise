const routeNames = {
    'categories.index': '/categories', 
    'categories.show': '/categories/:slug', 
    'meals.index': '/meals', 
    'meals.show': '/meals/:id', 
    'chefs.index': '/chefs', 
    'chefs.show': '/chefs/:id', 
    'search': '/search', 
    'sign-up': '/sign-up', 
    'sign-in': '/sign-in', 
    'home': '/', 

    // Auth routes
    // 'dashboard.comments.index': '/dashboard/comments', 
    // 'dashboard.comments.create': '/dashboard/comments/create', 
    // 'dashboard.comments.show': '/dashboard/comments/:id', 
    // 'dashboard.comments.edit': '/dashboard/comments/:id/edit', 
    // 'dashboard.likes.index': '/dashboard/likes', 
    'dashboard.staff.index': '/dashboard/staff', 
    'dashboard.staff.create': '/dashboard/staff/create', 
    'dashboard.staff.show': '/dashboard/staff/:username', 
    'dashboard.staff.edit': '/dashboard/staff/:username/edit', 
    'dashboard.customers.index': '/dashboard/customers', 
    'dashboard.customers.create': '/dashboard/customers/create', 
    'dashboard.customers.show': '/dashboard/customers/:username', 
    'dashboard.customers.edit': '/dashboard/customers/:username/edit', 
    'dashboard.categories.index': '/dashboard/categories', 
    'dashboard.categories.create': '/dashboard/categories/create', 
    'dashboard.categories.show': '/dashboard/categories/:slug', 
    'dashboard.categories.edit': '/dashboard/categories/:slug/edit', 
    'dashboard.meals.index': '/dashboard/meals', 
    'dashboard.meals.create': '/dashboard/meals/create', 
    'dashboard.meals.show': '/dashboard/meals/:slug', 
    'dashboard.meals.edit': '/dashboard/meals/:slug/edit', 
    'dashboard.meal-inventories.index': '/dashboard/meal-inventories', 
    'dashboard.meal-inventories.create': '/dashboard/meal-inventories/create', 
    'dashboard.meal-inventories.show': '/dashboard/meal-inventories/:slug', 
    'dashboard.meal-inventories.edit': '/dashboard/meal-inventories/:slug/edit', 
    'dashboard.orders.index': '/dashboard/orders', 
    'dashboard.orders.create': '/dashboard/orders/create', 
    'dashboard.orders.show': '/dashboard/orders/:order_id', 
    'dashboard.orders.edit': '/dashboard/orders/:order_id/edit', 
    // 'dashboard.order-items.index': '/dashboard/order-items', 
    // 'dashboard.order-items.create': '/dashboard/order-items/create', 
    // 'dashboard.order-items.show': '/dashboard/order-items/:order_item_id', 
    // 'dashboard.order-items.edit': '/dashboard/order-items/:order_item_id/edit', 
    'dashboard.deliveries.index': '/dashboard/deliveries', 
    'dashboard.deliveries.create': '/dashboard/deliveries/create', 
    'dashboard.deliveries.show': '/dashboard/deliveries/:delivery_id', 
    'dashboard.deliveries.edit': '/dashboard/deliveries/:delivery_id/edit', 
    'dashboard.profile': '/dashboard/profile', 
    'dashboard': '/dashboard', 
}

function route(name, params = {}) {
    let url = routeNames[name]
    
    for (let prop in params) {
        if (Object.prototype.hasOwnProperty.call(params, prop)) {
            url = url.replace(`:${prop}`, params[prop])
        }
    }

    return url
}

export { route }