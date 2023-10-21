from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from itertools import chain
from django.shortcuts import get_object_or_404
from adminCounselor.models import AdminCounselor
from .models import QuestionnaireField, Questionnaire
from .serializers import QuestionnaireFieldSerializer


class QuestionnaireFieldView(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)
        questionnaires = Questionnaire.objects.filter(
            adminCounselor_id=adminCounselor.id
        )

        quesionnairFields = QuestionnaireField.objects.none()
        for questionnaire in questionnaires:
            quesionnairFields = list(
                chain(
                    quesionnairFields,
                    QuestionnaireField.objects.filter(
                        questionnaire_id=questionnaire.id
                    ),
                )
            )
        return Response(
            data=QuestionnaireFieldSerializer(quesionnairFields, many=True).data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)

        serializer = QuestionnaireFieldSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)

        serializer = QuestionnaireFieldSerializer(
            instance=QuestionnaireField.objects.get(pk=request.data["id"]),
            data=request.data,
            partial=True,
        )
        if not serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, id):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)

        instance = QuestionnaireField.objects.get(pk=id)
        instance.delete()

        return Response(status=status.HTTP_200_OK)
