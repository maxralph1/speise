from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


app_name = 'accounts_api'


urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<str:username>/', views.UserDetail.as_view()), 
    path('users/<str:username>/soft-delete-or-reactivate/', views.UserSoftDeleteOrReactivate.as_view()),


    path('users/<str:username>/set-as-admin/', views.UserSetAsAdmin.as_view()),
    path('users/<str:username>/set-as-manager/', views.UserSetAsManager.as_view()),
    path('users/<str:username>/set-as-sales-rep/', views.UserSetAsSalesRep.as_view()),
    path('users/<str:username>/set-as-cook/', views.UserSetAsCook.as_view()),
    path('users/<str:username>/set-as-rider/', views.UserSetAsRider.as_view()),
    path('users/<str:username>/set-as-customer/', views.UserSetAsCustomer.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)