"""
WSGI config for Backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

# import os

# from django.core.wsgi import get_wsgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Backend.settings")

# application = get_wsgi_application()

import os
import sys
from django.core.wsgi import get_wsgi_application

# Add the parent folder of the Django project to Python path
# This allows Python to find 'accounts' and other apps
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set the Django settings module (double Backend for your folder structure)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Backend.Backend.settings")

# Get WSGI application
application = get_wsgi_application()
