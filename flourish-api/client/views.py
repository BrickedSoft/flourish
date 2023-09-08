from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from client.models import Client

from client.serializers import SigninSerializer, SignupSerializer, UserSerializer


@api_view(["POST"])
def login(request):
    signinSerializer = SigninSerializer(data=request.data)
    if not signinSerializer.is_valid():
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    authenticated = authenticate(
        username=signinSerializer.data["email"],
        password=signinSerializer.data["password"],
    )

    if not authenticated:
        return Response(
            status=status.HTTP_401_UNAUTHORIZED,
        )
    user = User.objects.get(username=authenticated)

    serializer = UserSerializer(instance=user)
    return Response(
        data=serializer.data,
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    user = get_or_none(User, username=serializer.data["email"])
    if not user is None:
        return Response(status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        username=serializer.data["email"],
        password=serializer.data["password"],
    )

    user.save()
    client = Client(user=user)
    client.save()
    return Response(status=status.HTTP_201_CREATED)


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.MultipleObjectsReturned as e:
        print("You must use a unique field to get the object", e)
    except classmodel.DoesNotExist:
        return None
