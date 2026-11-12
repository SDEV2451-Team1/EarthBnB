# Imports needed: path from django.urls
#                 TokenObtainPairView, TokenRefreshView from rest_framework_simplejwt.views
#                 MeView, UserRegistrationView from core.views

# TODO: Define a `urlpatterns` list that maps the following paths:
#   - "register/"      → UserRegistrationView.as_view()  (name="auth-register")
#   - "login/"         → TokenObtainPairView.as_view()   (name="auth-login")
#   - "token/refresh/" → TokenRefreshView.as_view()      (name="auth-token-refresh")
#   - "me/"            → MeView.as_view()                (name="auth-me")
