from rest_framework import serializers
from accounts.models import User, Address
# from accounts.models import User, Address, Suggestion
from menu.models import Category, Meal, MealInventory
# from menu.models import Category, Meal, MealInventory, Comment, Like
from orders.models import Order, OrderItem
from deliveries.models import Delivery


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'image_url', 'bio', 'created_at', 'role']


class UserExplicitSerializer(serializers.ModelSerializer):
    addresses = serializers.PrimaryKeyRelatedField(many=True, queryset=Address.objects.all())
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    meals = serializers.PrimaryKeyRelatedField(many=True, queryset=Meal.objects.all())
    meal_inventories = serializers.PrimaryKeyRelatedField(many=True, queryset=MealInventory.objects.all())
    orders = serializers.PrimaryKeyRelatedField(many=True, queryset=Order.objects.all())
    order_items = serializers.PrimaryKeyRelatedField(many=True, queryset=OrderItem.objects.all())
    deliveries = serializers.PrimaryKeyRelatedField(many=True, queryset=Delivery.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'image_url', 'bio', 'created_at', 'role', 'addresses', 'categories', 'meals', 'meal_inventories', 'orders', 'order_items', 'deliveries']
        # fields = ['id', 'username', 'email', 'first_name', 'last_name', 'image_url', 'bio', 'created_at', 'role', 'addresses', 'categories', 'meals', 'meal_inventories', 'orders', 'order_items', 'deliveries', 'comments', 'likes']