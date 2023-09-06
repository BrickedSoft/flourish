from rest_framework import serializers


class SigninSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class SignupSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
