from rest_framework import serializers
from accounts.models import User
from accounts_api.serializers import UserSerializer
from menu.models import Meal
from menu_api.serializers import MealSerializer
from orders.models import Order, OrderItem


class OrderSerializer(serializers.Serializer):
    class Meta:
        model = Order
        fields = ['id', 'order_no', 'paid', 'total_paid', 'outstanding_amount', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data
    

class OrderItemSerializer(serializers.Serializer):
    class Meta:
        model = OrderItem
        fields = ['meal', 'order', 'user', 'order_units']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['meal'] = MealSerializer(Meal.objects.get(pk=data['meal'])).data
        data['order'] = OrderSerializer(Order.objects.get(pk=data['order'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data
    

'''
Detailed Serializers
'''

class OrderExplicitSerializer(serializers.Serializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'order_no', 'paid', 'total_paid', 'outstanding_amount', 'order_items', 'is_active', 'created_at', 'updated_at', 'deleted_at', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data
    

class OrderItemExplicitSerializer(serializers.Serializer):
    class Meta:
        model = OrderItem
        fields = ['meal', 'order', 'user', 'order_units', 'is_active', 'created_at', 'updated_at', 'deleted_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['meal'] = MealSerializer(Meal.objects.get(pk=data['meal'])).data
        data['order'] = OrderSerializer(Order.objects.get(pk=data['order'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data