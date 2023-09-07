from rest_framework import serializers
from django.contrib.auth.models import User


class SigninSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class SignupSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    client = serializers.UUIDField(source="client.id", required=False)
    counselor = serializers.UUIDField(source="counselor.id", required=False)
    adminCounselor = serializers.UUIDField(source="adminCounselor.id", required=False)
    email = serializers.CharField(source="username")

    class Meta:
        model = User
        fields = ["email", "date_joined", "adminCounselor", "counselor", "client"]
