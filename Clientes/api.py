from Clientes.models import Clientes
from rest_framework import viewsets, permissions
from .serializers import ClientesSerializer

class ClientesViewSet(viewsets.ModelViewSet):
   queryset = Clientes.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = ClientesSerializer
