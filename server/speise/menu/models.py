from datetime import datetime
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from accounts.models import User


class Category(models.Model):
    user = models.ForeignKey(
        User, 
        related_name='categories', 
        verbose_name=_('Category Creator'), 
        help_text=_('Select a User'), 
        on_delete=models.CASCADE
    )
    title = models.CharField(
        verbose_name=_('Category Title'),
        help_text=_('Required and unique'),
        max_length=50,
        unique=True,
    )
    slug = models.SlugField(
        verbose_name=_('Category (safe) URL'),
        unique=True
    )
    description = models.CharField(
        verbose_name=_('Category Description'),
        help_text=_('Required and unique'),
        max_length=255,
    )
    is_active = models.BooleanField(
        verbose_name=_('Category visibility'),
        help_text=_('Change category visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        verbose_name=_('Created at'), 
        auto_now_add=True, 
        editable=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_('Updated at'), 
        auto_now=True, 
        null=True, 
        blank=True
    )
    deleted_at = models.DateTimeField(
        verbose_name=_('Deleted At'), 
        null=True, 
        blank=True
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('menu:view_category', args=[self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title, allow_unicode=False)
        # self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)


class Meal(models.Model):
    category = models.ForeignKey(
        Category, 
        related_name='meals', 
        verbose_name=_('Meal Category'), 
        help_text=_('Select a Category'), 
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, 
        related_name='meals', 
        verbose_name=_('Meal Creator'), 
        help_text=_('Select a User'), 
        on_delete=models.CASCADE
    )
    name = models.CharField(
        verbose_name=_('Meal Name'), 
        max_length=50, 
        unique=True
    )
    slug = models.SlugField(
        verbose_name=_('Meal (safe) URL'),
        max_length=255,
        unique=True
    )
    description = RichTextField(
        verbose_name=_('Meal Description'),
        help_text=_('Describe the meal'),
        unique=True,
    )
    price = models.IntegerField(
        verbose_name=_('Meal Price'), 
        help_text=_('Give the Price of the Meal'), 
    )
    image_url = models.ImageField(
        verbose_name=_('Meal Image'), 
        upload_to='images/meals', 
        default='images/meals/default.png'
    )
    is_active = models.BooleanField(
        verbose_name=_('Meal visibility'),
        help_text=_('Change meal visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        verbose_name=_('Created At'), 
        auto_now_add=True, 
        editable=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_('Updated At'), 
        auto_now=True
    ) 
    deleted_at = models.DateTimeField(
        verbose_name=_('Deleted At'), 
        null=True, 
        blank=True
    ) 

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Meal')
        # verbose_name_plural = _('Meals')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('menu:view_meal', args=[self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name, allow_unicode=False)
        # self.is_active = True
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)
    

class MealInventory(models.Model):
    meal = models.OneToOneField(
        Meal, 
        verbose_name=_('Meal for the Inventory'), 
        help_text=_('Select a Meal'), 
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, 
        related_name='meal_inventories', 
        verbose_name=_('Meal Inventory Creator'), 
        help_text=_('Select a User'), 
        on_delete=models.CASCADE
    )
    units_prepared = models.IntegerField(
        verbose_name=_('Units of Meal Prepared'), 
        help_text=_('Give the Units of Meal Prepared'), 
    )
    units_left = models.IntegerField(
        verbose_name=_('Units of Meal Left'), 
        help_text=_('Give the Units of Meal Left'), 
    )
    is_active = models.BooleanField(
        verbose_name=_('Meal Inventory visibility'),
        help_text=_('Change meal inventory visibility'),
        default=True,
    )
    created_at = models.DateTimeField(
        verbose_name=_('Created At'), 
        auto_now_add=True, 
        editable=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_('Updated At'), 
        auto_now=True
    ) 
    deleted_at = models.DateTimeField(
        verbose_name=_('Deleted At'), 
        null=True, 
        blank=True
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Meal Inventory')
        verbose_name_plural = _('Meal Inventories')

    def __str__(self):
        return '{} Meal Inventory for '.format(self.meal.name)

    def get_absolute_url(self):
        return reverse('menu:view_meal_inventory', args=[self.meal.slug])

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)