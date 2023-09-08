from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import RegistrationForm
from .serializers import RegistrationFormSerializer

from client.models import Client

class RegistrationFormView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        forms = RegistrationForm.objects.all()
        if user.client:
            forms = forms.filter(client_id=user.client.id)
            serializer = RegistrationFormSerializer(forms, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        if user.adminCounselor:
            return Response(
                data=RegistrationFormSerializer(forms, many=True).data,
                status=status.HTTP_200_OK,
            )

        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def post(self, request):
        client = get_object_or_404(Client, user=request.user)
        request.data["client"] = client.id

        serializer = RegistrationFormSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

