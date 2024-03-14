from rest_framework import routers
from.api import ClientesViewSet

router = routers.DefaultRouter()
router.register('api/Clientes', ClientesViewSet, 'Clientes')

urlpatterns = router.urls