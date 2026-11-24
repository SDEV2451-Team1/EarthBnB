from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_GUEST = "guest"
    ROLE_HOST = "host"
    ROLE_ADMIN = "admin"
    
    ROLE_CHOICES = [
        (ROLE_GUEST, "Guest"),
        (ROLE_HOST, "Host"),
        (ROLE_ADMIN, "Admin"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_GUEST,
    )
    

    def __str__(self):
        return self.username