from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts_api.permissions import IsSuperuser, IsOwnerOrReadOnly
from deliveries.models import Delivery
from .serializers import DeliverySerializer, DeliveryExplicitSerializer


'''
DELIVERY SECTION
'''

class DeliveryList(APIView):
    permission_classes = [IsSuperuser]

    # List all categories, or create a new delivery.
    def get(self, request, format=None):
        categories = Delivery.objects.all()
        serializer = DeliveryExplicitSerializer(categories, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        serializer = DeliverySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeliveryDetail(APIView):
    permission_classes = [IsSuperuser, IsOwnerOrReadOnly]
    
    def get_object(self, delivery_no):
        try:
            return Delivery.objects.get(delivery_no=delivery_no)
        except Delivery.DoesNotExist:
            raise Http404

    def get(self, request, delivery_no, format=None):
        delivery = self.get_object(delivery_no)
        serializer = DeliveryExplicitSerializer(delivery)
        return Response(serializer.data)
    
    def put(self, request, delivery_no, format=None):
        delivery = self.get_object(delivery_no)
        serializer = DeliverySerializer(delivery, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, delivery_no, format=None):
        delivery = self.get_object(delivery_no)
        delivery.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class DeliverySoftDeleteOrReactivate(APIView):
    permission_classes = [permissions.IsAdminUser]
  
    def get_object(self, delivery_no):
        try:
            return Delivery.objects.get(delivery_no=delivery_no)
        except Delivery.DoesNotExist:
            raise Http404
    
    def put(self, request, delivery_no, format=None):
        delivery = self.get_object(delivery_no)

        if delivery.is_active:
            delivery.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif delivery.is_active == False:
            delivery.reactivate()
            data = f"You have successfully reactivated the delivery {delivery.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)