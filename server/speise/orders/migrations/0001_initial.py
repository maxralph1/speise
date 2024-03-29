# Generated by Django 5.0.1 on 2024-01-05 21:55

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('menu', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_no', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('cancelled', models.BooleanField(default=False, help_text='Change order cancellation status', verbose_name='Order Cancellation')),
                ('cancelled_at', models.DateTimeField(blank=True, null=True, verbose_name='Cancelled At')),
                ('paid', models.BooleanField(default=False, help_text='Change order payment status', verbose_name='Order Payment')),
                ('total_paid', models.IntegerField(help_text='Give the total amount paid for the order', verbose_name='Total Paid for Order')),
                ('outstanding_amount', models.FloatField(help_text='Give the outstanding sum to be paid for Order', max_length=15, verbose_name='Outstanding Sum')),
                ('is_active', models.BooleanField(default=True, help_text='Change order visibility', verbose_name='Order visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='Deleted At')),
                ('user', models.ForeignKey(help_text='Select a User', on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL, verbose_name='Order Placed By')),
            ],
            options={
                'verbose_name': 'Order',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_item_no', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('order_units', models.IntegerField(help_text='Give the units ordered for the particular order item', verbose_name='Order Item Units')),
                ('is_active', models.BooleanField(default=True, help_text='Change order visibility', verbose_name='Order visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='Deleted At')),
                ('meal', models.ForeignKey(help_text='Select a Meal', on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='menu.meal', verbose_name='Meal as the Order Item')),
                ('order', models.ForeignKey(help_text='Select an Order', on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='orders.order', verbose_name='Order')),
                ('user', models.ForeignKey(help_text='Select a User', on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to=settings.AUTH_USER_MODEL, verbose_name='Order Item Creator')),
            ],
            options={
                'verbose_name': 'Order Item',
                'ordering': ['-created_at'],
            },
        ),
    ]
