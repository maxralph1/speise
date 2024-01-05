from rest_framework import serializers
from accounts.models import User
from accounts_api.serializers import UserSerializer
from orders.models import Order
from orders_api.serializers import OrderSerializer
from deliveries.models import Delivery


class DeliverySerializer(serializers.Serializer):
    class Meta:
        model = Delivery
        fields = ['order', 'user', 'delivered']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['order'] = OrderSerializer(Order.objects.get(pk=data['order'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data
    

class DeliveryExplicitSerializer(serializers.Serializer):
    class Meta:
        model = Delivery
        fields = ['order', 'user', 'delivered', 'is_active', 'created_at', 'updated_at', 'deleted_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['order'] = OrderSerializer(Order.objects.get(pk=data['order'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data