from __future__ import unicode_literals

from django.db import models

from django.utils import timezone

# Create your models here.

class Event(models.Model):
    """Countries which have test frameworks available.

    Attributes:

        name (CharField): The name of the country.

    """
    user_id    = models.CharField(max_length = 254)
    event_type = models.CharField(max_length = 254)
    category   = models.CharField(max_length = 254)
    action     = models.CharField(max_length = 254, blank=True)
    label      = models.CharField(max_length = 254, blank=True)
    value      = models.CharField(max_length = 254, blank=True)
    datetime   = models.DateTimeField(default=timezone.now);
