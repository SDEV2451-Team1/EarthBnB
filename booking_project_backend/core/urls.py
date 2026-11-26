# Imports needed: TokenRefreshView from rest_framework_simplejwt.views
#                 MeView, UserRegistrationView from core.views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

# TODO: Define a `urlpatterns` list that maps the following paths:
#   - "register/"      → UserRegistrationView.as_view()  (name="auth-register")
#   - "token/refresh/" → TokenRefreshView.as_view()      (name="auth-token-refresh")
#   - "me/"            → MeView.as_view()                (name="auth-me")
urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="auth-login"),
]
