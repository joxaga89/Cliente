from django.db import models

# Create your models here.

class Clientes(models.Model):
 nombre = models.TextField()
 cedula = models.TextField(max_length=9)
 edad = models.IntegerField()
 telefono = models.TextField(max_length=8)
 correo = models.TextField()