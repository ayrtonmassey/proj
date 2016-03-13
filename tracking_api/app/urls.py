from rest_framework import routers
from django.conf.urls import url, include

from app.views import EventViewSet


# Create a router
router = routers.DefaultRouter()

# Register views.users
router.register(r'events' , EventViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
]
