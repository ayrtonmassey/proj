from rest_framework import viewsets

from app.serializers import EventSerializer
from app.models import Event

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    """API endpoint that allows question groups to be viewed.

    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
