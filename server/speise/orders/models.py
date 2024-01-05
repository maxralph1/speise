import uuid
from datetime import datetime
from django.core.mail import send_mail
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from accounts.models import User
from menu.models import Meal


class Order(models.Model):
    user = models.ForeignKey(
        User, 
        related_name='orders', 
        verbose_name=_('Order Placed By'), 
        help_text=_('Select a User'), 
        on_delete=models.CASCADE
    )
    order_no = models.UUIDField(
        default=uuid.uuid4, 
        editable=False
    )
    cancelled = models.BooleanField(
        verbose_name=_('Order Cancellation'),
        help_text=_('Change order cancellation status'),
        default=False,
    )
    cancelled_at = models.DateTimeField(
        verbose_name=_('Cancelled At'), 
        null=True, 
        blank=True
    )
    paid = models.BooleanField(
        verbose_name=_('Order Payment'),
        help_text=_('Change order payment status'),
        default=False,
    )
    total_paid = models.IntegerField(
        verbose_name=_('Total Paid for Order'), 
        help_text=_('Give the total amount paid for the order'), 
    )
    outstanding_amount = models.FloatField(
        verbose_name=_('Outstanding Sum'), 
        help_text=_('Give the outstanding sum to be paid for Order'), 
        max_length=15
    )
    is_active = models.BooleanField(
        verbose_name=_('Order visibility'),
        help_text=_('Change order visibility'),
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
        verbose_name = _('Order')
        # verbose_name_plural = _('Orders')

    def get_absolute_url(self):
        return reverse('order:view_order', args=[self.order_no])

    def cancel_order(self, *args, **kwargs):
        self.cancelled = True
        self.cancelled_at = datetime.now()
        super().save(*args, **kwargs)

    def revert_cancel_order(self, *args, **kwargs):
        self.cancelled = False
        # self.cancelled_at = ''
        super().save(*args, **kwargs)

    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_no
    
    def email_user(self, subject, message):
        send_mail(
            subject,
            message,
            'no-reply@speise.com',
            [self.user.email],
            fail_silently=False
        )
    

class OrderItem(models.Model):
    meal = models.ForeignKey(
        Meal, 
        related_name='order_items', 
        verbose_name=_('Meal as the Order Item'), 
        help_text=_('Select a Meal'), 
        on_delete=models.CASCADE
    )
    order = models.ForeignKey(
        Order, 
        related_name='order_items', 
        verbose_name=_('Order'), 
        help_text=_('Select an Order'), 
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, 
        related_name='order_items', 
        verbose_name=_('Order Item Creator'), 
        help_text=_('Select a User'), 
        on_delete=models.CASCADE
    )
    order_item_no = models.UUIDField(
        default=uuid.uuid4, 
        editable=False
    )
    order_units = models.IntegerField(
        verbose_name=_('Order Item Units'), 
        help_text=_('Give the units ordered for the particular order item'), 
    )
    is_active = models.BooleanField(
        verbose_name=_('Order visibility'),
        help_text=_('Change order visibility'),
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
        verbose_name = _('Order Item')
        # verbose_name_plural = _('Order Items')

    def __str__(self):
        return self.order_item_no

    def get_absolute_url(self):
        return reverse('order:view_order_item', args=[self.order_item_no])
        
    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)
