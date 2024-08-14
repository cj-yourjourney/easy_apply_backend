# api/views.py

from typing import Any, Dict
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializerWithToken, UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db import IntegrityError

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

# imports for User Login
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from api.serializers import UserSerializerWithToken
from rest_framework.exceptions import ValidationError
from utils.validation import (
    validate_required_fields,
    check_existing_object,
    CustomValidationError,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def register_user(request):
    data = request.data
    try:
        validate_required_fields(data, ["username", "email", "password"])
        check_existing_object(
            User, {"email": data.get("email")}, "User with this email already exists!!"
        )

        user = User.objects.create(
            username=data.get("username"),
            email=data.get("email"),
            password=make_password(data.get("password")),
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except CustomValidationError as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError:
        return Response(
            {"detail": "Error creating user"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except ValidationError as e:
        return Response(
            {"detail": "Error in serialization", "error": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    print(request)
    user = request.user
    # extrct data from the request
    data = request.data
    try:

        # Check if the user is authenticated
        if not request.user:
            raise Exception("User not authenticated")

        # Update user information
        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)
        # save the new user info
        user.save()

        # Create serializer with data and check if it's valid
        serializer = UserSerializerWithToken(user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
