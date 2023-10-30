from rest_framework import serializers

from counselor.models import Counselor


class SigninSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class SignupSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class CounselorSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.username')
    class Meta:
        model = Counselor
        fields = "__all__"
