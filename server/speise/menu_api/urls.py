from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


app_name = 'menu_api'


urlpatterns = [
    # Categories
    path('categories/', views.CategoryList.as_view()),
    path('categories/<slug:slug>/', views.CategoryDetail.as_view()),
    path('categories/<slug:slug>/soft-delete-or-reactivate/', views.CategorySoftDeleteOrReactivate.as_view()),

    # Meals
    path('meals/', views.MealList.as_view()),
    path('meals/<slug:slug>/', views.MealDetail.as_view()),
    path('meals/<slug:slug>/soft-delete-or-reactivate/', views.MealSoftDeleteOrReactivate.as_view()),

    # Meal Inventories
    path('meal-inventories/', views.MealList.as_view()),
    path('meal-inventories/<int:pk>/', views.MealDetail.as_view()),
    path('meal-inventories/<int:pk>/soft-delete-or-reactivate/', views.MealSoftDeleteOrReactivate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)