from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login),
    path("ping/", views.ping),
    path("client/signup/", views.signup),
    path("client/questionnaire/", views.QuestionnaireView.as_view()),
    path("client/filledQuestionnaire/", views.FilledQuestionnaireView.as_view()),
    ]
