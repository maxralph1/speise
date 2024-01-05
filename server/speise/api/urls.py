from django.urls import path, include


app_name = 'api'

urlpatterns = [
    path('menu/', include('menu_api.urls', namespace='menu_api')),
    path('orders/', include('orders_api.urls', namespace='orders_api')),
    path('accounts/', include('accounts_api.urls', namespace='accounts_api')),
    path('deliveries/', include('deliveries_api.urls', namespace='deliveries_api')),
    path('auth/', include('auth_api.urls', namespace='auth_api')),
]