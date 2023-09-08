from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from adminCounselor.models import AdminCounselor

from client.serializers import SigninSerializer, SignupSerializer

from questionnaire.models import Questionnaire, QuestionnaireField
from questionnaire.serializers import (
    QuestionnaireSerializer,
    QuestionnaireViewSerializer,
    QuestionnaireFieldSerializer,
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
    adminCounselor = AdminCounselor(user=user)
    adminCounselor.save()
    return Response(status=status.HTTP_201_CREATED)


class QuestionnaireView(APIView):
    """
    Authorized provider create , edit and update case
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)
        questionnaires = Questionnaire.objects.filter(
            adminCounselor_id=adminCounselor.id
        )

        serializer = QuestionnaireViewSerializer(questionnaires, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)
        request.data["adminCounselor"] = adminCounselor.id
        serializer = QuestionnaireSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        questionnaire = serializer.save()

        for question in request.data["questionnaireFields"]:
            questionnaireField = QuestionnaireField(
                question=question["question"], questionnaire=questionnaire
            )
            questionnaireField.save()

        return Response(
            status=status.HTTP_201_CREATED,
            data=QuestionnaireViewSerializer(questionnaire).data,
        )

    def put(self, request):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)
        serializer = QuestionnaireSerializer(
            instance=Questionnaire.objects.get(id=request.data["id"]),
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        questionnaire = serializer.save()
        return Response(
            status=status.HTTP_200_OK,
            data=QuestionnaireViewSerializer(questionnaire).data,
        )

    def delete(self, request, id):
        adminCounselor = get_object_or_404(AdminCounselor, user=request.user)
        instance = get_or_none(Questionnaire, pk=id)
        instance.delete()

        return Response(status=status.HTTP_200_OK)


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.MultipleObjectsReturned as e:
        print("You must use a unique field to get the object", e)
    except classmodel.DoesNotExist:
        return None
