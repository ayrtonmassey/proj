from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^', include('app.urls')),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]

