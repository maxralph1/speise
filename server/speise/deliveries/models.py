import uuid
from datetime import datetime
from django.core.mail import send_mail
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from accounts.models import User
from orders.models import Order


class Delivery(models.Model):
    order = models.ForeignKey(
        Order, 
        related_name='deliveries', 
        verbose_name=_('Order'), 
        help_text=_('Select an Order'), 
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, 
        related_name='deliveries', 
        verbose_name=_('Delivery Staff'), 
        help_text=_('Select a Staff Driver'), 
        on_delete=models.CASCADE
    )
    delivery_no = models.UUIDField(
        default=uuid.uuid4, 
        editable=False
    )
    delivered = models.BooleanField(
        verbose_name=_('Delivery Status'),
        help_text=_('Change delivery status'),
        default=False,
    )
    is_active = models.BooleanField(
        verbose_name=_('Delivery visibility'),
        help_text=_('Change delivery visibility'),
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
        verbose_name = _('Delivery')
        verbose_name_plural = _('Deliveries')

    def get_absolute_url(self):
        return reverse('delivery:view_delivery', args=[self.delivery_no])


    def deactivate(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = datetime.now()
        super().save(*args, **kwargs)

    def reactivate(self, *args, **kwargs):
        self.is_active = True
        # self.deleted_at = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return self.delivery_no
    