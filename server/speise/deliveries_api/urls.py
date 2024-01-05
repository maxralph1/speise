from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


app_name = 'deliveries_api'


urlpatterns = [
    # Deliveries
    path('deliveries/', views.DeliveryList.as_view()),
    path('deliveries/<str:delivery_no>/', views.DeliveryDetail.as_view()),
    path('deliveries/<str:delivery_no>/soft-delete-or-reactivate/', views.DeliverySoftDeleteOrReactivate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)