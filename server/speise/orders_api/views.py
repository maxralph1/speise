from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts_api.permissions import IsOwnerOrReadOnly, IsCustomer, IsSuperuser
from menu.models import Meal
from orders.models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer, OrderExplicitSerializer, OrderItemExplicitSerializer


'''
ORDER SECTION
'''

class OrderList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsCustomer]

    # List all orders, or create a new order.
    def get(self, request, format=None):
        orders = Order.objects.all()
        serializer = OrderExplicitSerializer(orders, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class OrderDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser, IsOwnerOrReadOnly]
    
    def get_object(self, order_no):
        try:
            return Order.objects.get(order_no=order_no)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, order_no, format=None):
        order = self.get_object(order_no)
        serializer = OrderExplicitSerializer(order)
        return Response(serializer.data)
    
    def put(self, request, order_no, format=None):
        order = self.get_object(order_no)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, order_no, format=None):
        order = self.get_object(order_no)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class OrderSoftDeleteOrReactivate(APIView):
    permission_classes = [permissions.IsAdminUser, IsOwnerOrReadOnly]
  
    def get_object(self, order_no):
        try:
            return Order.objects.get(order_no=order_no)
        except Order.DoesNotExist:
            raise Http404
    
    def put(self, request, order_no, format=None):
        order = self.get_object(order_no)

        if order.is_active:
            order.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif order.is_active == False:
            order.reactivate()
            data = f"You have successfully reactivated the order {order.order_no}"
            return Response({'response': data}, status=status.HTTP_200_OK)
        


'''
ORDER ITEM SECTION
'''

class OrderItemList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser]

    # List all categories, or create a new order item.
    def get(self, request, format=None):
        categories = OrderItem.objects.all()
        serializer = OrderItemExplicitSerializer(categories, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class OrderItemDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser, IsOwnerOrReadOnly]
    
    def get_object(self, order_item):
        try:
            return OrderItem.objects.get(order_item=order_item)
        except OrderItem.DoesNotExist:
            raise Http404

    def get(self, request, order_item, format=None):
        order_item = self.get_object(order_item)
        serializer = OrderItemExplicitSerializer(order_item)
        return Response(serializer.data)
    
    def put(self, request, order_item, format=None):
        order_item = self.get_object(order_item)
        serializer = OrderItemSerializer(order_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, order_item, format=None):
        order_item = self.get_object(order_item)
        order_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class OrderItemSoftDeleteOrReactivate(APIView):
    permission_classes = [permissions.IsAdminUser, IsOwnerOrReadOnly]
  
    def get_object(self, order_item):
        try:
            return OrderItem.objects.get(order_item=order_item)
        except OrderItem.DoesNotExist:
            raise Http404
    
    def put(self, request, order_item, format=None):
        order_item = self.get_object(order_item)

        if order_item.is_active:
            order_item.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif order_item.is_active == False:
            order_item.reactivate()
            data = f"You have successfully reactivated the order_item {order_item.order_item_no}"
            return Response({'response': data}, status=status.HTTP_200_OK)