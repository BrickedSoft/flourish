from rest_framework import serializers
from .models import RegistrationForm


class RegistrationFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationForm
        fields = "__all__"
