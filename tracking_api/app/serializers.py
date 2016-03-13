from rest_framework import serializers

from app.models import Event

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('url', 'user_id', 'event_type', 'category', 'action', 'label' , 'value', 'datetime')
