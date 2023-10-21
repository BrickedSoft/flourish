from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from counselor.models import Counselor

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from client.serializers import SigninSerializer, SignupSerializer
from questionnaire.models import FilledQuestionnaire
from questionnaire.serializers import FilledQuestionnaireSerializer


@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    user = get_or_none(User, username = serializer.data["email"])
    if not user is None:
        return Response(status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        username=serializer.data["email"],
        password=serializer.data["password"],
    )

    user.save()
    counselor = Counselor(user=user)
    counselor.save()
    return Response(status=status.HTTP_201_CREATED)


class FilledQuestionnaireView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request,clientId):
        counselor = get_object_or_404(Counselor, user=request.user)
        questionnaires = FilledQuestionnaire.objects.all()
        if clientId:
            questionnaires.filter(client_id = clientId)
        serializer = FilledQuestionnaireSerializer(questionnaires, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    
def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.MultipleObjectsReturned as e:
        print("You must use a unique field to get the object", e)
    except classmodel.DoesNotExist:
        return None