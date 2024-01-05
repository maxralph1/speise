from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


app_name = 'orders_api'


urlpatterns = [
    # Orders
    path('orders/', views.OrderList.as_view()),
    path('orders/<str:order_no>/', views.OrderDetail.as_view()),
    path('orders/<str:order_no>/soft-delete-or-reactivate/', views.OrderSoftDeleteOrReactivate.as_view()),

    # Order Items
    path('order-items/', views.OrderItemList.as_view()),
    path('order-items/<str:order_item_no>/', views.OrderItemDetail.as_view()),
    path('order-items/<str:order_item_no>/soft-delete-or-reactivate/', views.OrderItemSoftDeleteOrReactivate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)