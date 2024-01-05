from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
# from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    ADMIN = 'ADM'
    MANAGER = 'MGR'
    SALESREP = 'SRP' 
    COOK = 'COK' 
    RIDER = 'RDR' 
    CUSTOMER = 'CST' 
    ROLE_CHOICES = {
        ADMIN: 'Admin',
        MANAGER: 'Manager',
        SALESREP: 'Sales Representative', 
        COOK: 'Cook', 
        RIDER: 'Rider', 
        CUSTOMER: 'Customer', 
    }
    username = models.CharField(
        _('Username'), 
        max_length=150, 
        unique=True
    )
    email = models.EmailField(
        _('Email Address'), 
        unique=True
    )
    first_name = models.CharField(
        _('First Name'), 
        max_length=150, 
        blank=True
    )
    last_name = models.CharField(
        _('Last Name'), 
        max_length=150, 
        blank=True
    )
    image_url = models.ImageField(
        _('Image'), 
        upload_to='images/users', 
        default='images/users/default.png'
    )
    bio = models.TextField(
        _('Bio'), 
        max_length=500, 
        blank=True
    )
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(
        _('Created At'), 
        auto_now_add=True, 
        editable=False
    )
    role = models.CharField(
        max_length=3, 
        choices=ROLE_CHOICES, 
        default=CUSTOMER,
    )
    # verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
    
    def email_user(self, subject, message):
        send_mail(
            subject,
            message,
            'no-reply@speise.com',
            [self.email],
            fail_silently=False
        )
    
    def set_as_admin(self, *args, **kwargs):
        self.is_superuser = True
        self.is_staff = True
        self.role = 'ADM'
        super().save(*args, **kwargs)
    
    def set_as_manager(self, *args, **kwargs):
        self.is_superuser = True
        self.is_staff = True
        self.role = 'MGR'
        super().save(*args, **kwargs)
    
    def set_as_sales_rep(self, *args, **kwargs):
        self.is_superuser = False
        self.is_staff = True
        self.role = 'SRP'
        super().save(*args, **kwargs)
    
    def set_as_cook(self, *args, **kwargs):
        self.is_superuser = False
        self.is_staff = True
        self.role = 'COK'
        super().save(*args, **kwargs)
    
    def set_as_rider(self, *args, **kwargs):
        self.is_superuser = False
        self.is_staff = True
        self.role = 'RDR'
        super().save(*args, **kwargs)
    
    def set_as_customer(self, *args, **kwargs):
        self.is_superuser = False
        self.is_staff = False
        self.role = 'CST'
        super().save(*args, **kwargs)


class Address(models.Model):
    user = models.ForeignKey(
        User, 
        related_name='user', 
        on_delete=models.CASCADE, 
        verbose_name=_('Select a User'))
    house_number = models.CharField(
        verbose_name=_('House Number'), 
        help_text=_('House Number'), 
        max_length=20, 
    )
    full_name = models.CharField(
        verbose_name=_('Full Name'), 
        help_text=_('Full Name of the Address (i.e. Recipient)'), 
        max_length=150
    )
    phone = models.CharField(
        verbose_name=_('Phone Number'), 
        help_text=_('Phone Number at the Address'), 
        max_length=150
    )
    post_code = models.CharField(
        verbose_name=_('Post Code'), 
        help_text=_('Postal Code of the Address'), 
        max_length=20
    )
    address_line_1 = models.CharField(
        verbose_name=_('Address Line 1'), 
        help_text=_('Address Line #1'), 
        max_length=250
    )
    address_line_2 = models.CharField(
        verbose_name=_('Address Line 2'), 
        help_text=_('Address Line #2'), 
        max_length=250
    )
    town_city = models.CharField(
        verbose_name=_('Town/City/State'), 
        help_text=_('Town/City/State'), 
        max_length=150
    )
    delivery_instructions = models.CharField(
        verbose_name=_('Delivery Instructions'), 
        help_text=_('The instructions on how to get items delivered at the address'), 
        max_length=250
    )
    created_at = models.DateTimeField(
        verbose_name=_('Created at'), 
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        verbose_name=_('Updated at'), 
        auto_now=True
    )
    default = models.BooleanField(
        verbose_name=_('Default'), 
        help_text=_('Is this the default address of user/customer'), 
        default=False
    )

    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return '{} Address'.format(self.full_name)