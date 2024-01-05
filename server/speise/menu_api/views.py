from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts_api.permissions import IsSuperuser
from menu.models import Category, Meal, MealInventory
from .serializers import CategorySerializer, MealSerializer, MealInventorySerializer, CategoryExplicitSerializer, MealExplicitSerializer, MealInventoryExplicitSerializer


'''
CATEGORY SECTION
'''

class CategoryList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser]

    # List all categories, or create a new category.
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategoryExplicitSerializer(categories, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CategoryDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser]
    
    def get_object(self, slug):
        try:
            return Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        category = self.get_object(slug)
        serializer = CategoryExplicitSerializer(category)
        return Response(serializer.data)
    
    def put(self, request, slug, format=None):
        category = self.get_object(slug)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        category = self.get_object(slug)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CategorySoftDeleteOrReactivate(APIView):
    permission_classes = [permissions.IsAdminUser]
  
    def get_object(self, slug):
        try:
            return Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            raise Http404
    
    def put(self, request, slug, format=None):
        category = self.get_object(slug)

        if category.is_active:
            category.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif category.is_active == False:
            category.reactivate()
            data = f"You have successfully reactivated the category {category.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)
        

'''
MEAL SECTION
'''

class MealList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # List all meals, or create a new meal.
    def get(self, request, format=None):
        meals = Meal.objects.all()
        serializer = MealExplicitSerializer(meals, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MealDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser]

    def get_object(self, slug):
        try:
            return Meal.objects.get(slug=slug)
        except Meal.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        meal = self.get_object(slug)
        serializer = MealExplicitSerializer(meal)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        meal = self.get_object(slug)
        serializer = MealSerializer(meal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        meal = self.get_object(slug)
        meal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class MealSoftDeleteOrReactivate(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, pk):
        try:
            return Meal.objects.get(pk=pk)
        except Meal.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        meal = self.get_object(pk)

        if meal.is_active:
            meal.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif meal.is_active == False:
            meal.reactivate()
            data = f"You have successfully reactivated the meal {meal.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)
        

'''
MEAL INVENTORY SECTION
'''

class MealInventoryList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # List all meal inventories, or create a new meal inventory.
    def get(self, request, format=None):
        meal_inventories = MealInventory.objects.all()
        serializer = MealInventoryExplicitSerializer(meal_inventories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MealInventorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MealInventoryDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSuperuser]

    def get_object(self, pk):
        try:
            return MealInventory.objects.get(pk=pk)
        except MealInventory.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        meal_inventory = self.get_object(pk)
        serializer = MealInventoryExplicitSerializer(meal_inventory)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        meal_inventory = self.get_object(pk)
        serializer = MealInventorySerializer(meal_inventory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        meal_inventory = self.get_object(pk)
        meal_inventory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class MealInventorySoftDeleteOrReactivate(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, pk):
        try:
            return MealInventory.objects.get(pk=pk)
        except MealInventory.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        meal_inventory = self.get_object(pk)

        if meal_inventory.is_active:
            meal_inventory.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif meal_inventory.is_active == False:
            meal_inventory.reactivate()
            data = f"You have successfully reactivated the meal inventory for the meal, {meal_inventory.meal.name}"
            return Response({'response': data}, status=status.HTTP_200_OK)