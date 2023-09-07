from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("client.urls")),
    path("counselor/", include("counselor.urls")),
    path("adminCounselor/", include("adminCounselor.urls")),
]
