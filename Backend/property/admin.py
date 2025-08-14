from django.contrib import admin

# Register your models here.

from .models import Property

admin.site.register(Property)
# This will allow the Property model to be managed through the Django admin interface.