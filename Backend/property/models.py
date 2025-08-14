from django.db import models


import uuid
from django.conf import settings
from accounts.models import User


# Create your models here.

class Property(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, choices=[('Indore', 'Indore'), ('ujjain', 'Ujjain'), ('Bhopal', 'Bhopal'), ('Gwalior', 'Gwalior')])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    images_url = models.ImageField(upload_to='upload/properties', blank=False, null=False)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.images.url}'

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Properties"
        ordering = ['-created_at']