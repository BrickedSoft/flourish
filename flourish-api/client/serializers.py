from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class SigninSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class SignupSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('find_my_token')
    client = serializers.UUIDField(source="client.id", required=False)
    counselor = serializers.UUIDField(source="counselor.id", required=False)
    adminCounselor = serializers.UUIDField(source="adminCounselor.id", required=False)
    email = serializers.CharField(source="username")

    def find_my_token(self, instance):
      token, created = Token.objects.get_or_create(user=instance)
      return token.key
    class Meta:
        model = User
        fields = ["token", "email", "date_joined", "adminCounselor", "counselor", "client", ]
