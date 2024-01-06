from rest_framework import serializers
from accounts.models import User
from menu.models import Category, Meal, MealInventory
from accounts_api.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'description', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data


class MealSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'price', 'image_url', 'category', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data


class MealInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MealInventory
        fields = ['id', 'units_prepared', 'units_left', 'meal', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['meal'] = MealSerializer(Meal.objects.get(pk=data['meal'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data
    

'''
Detailed Serializers
'''

class CategoryExplicitSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True)
    # meals = serializers.PrimaryKeyRelatedField(many=True, queryset=Meal.objects.all())

    class Meta:
        model = Category
        fields = ['id', 'slug', 'title', 'description', 'meals', 'is_active', 'created_at', 'updated_at', 'deleted_at', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        # data['meals'] = MealSerializer(User.objects.all()).data
        return data


class MealExplicitSerializer(serializers.ModelSerializer):
    meal_inventory = MealInventorySerializer()

    class Meta:
        model = Meal
        fields = ['id', 'slug', 'name', 'description', 'price', 'image_url', 'category', 'meal_inventory', 'is_active', 'created_at', 'updated_at', 'deleted_at', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # data['meal_inventory'] = MealInventorySerializer(Meal.objects.get(pk=data['meal_inventory'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data


class MealInventoryExplicitSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealInventory
        fields = ['id', 'slug', 'units_prepared', 'units_left', 'is_active', 'created_at', 'updated_at', 'deleted_at', 'meal', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['meal'] = MealSerializer(Meal.objects.get(pk=data['meal'])).data
        data['user'] = UserSerializer(User.objects.get(pk=data['user'])).data
        return data