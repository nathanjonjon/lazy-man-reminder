from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'items', views.ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('me/', views.MeView.as_view()),
]
