from django.urls import path
from . import views

urlpatterns = [
  path("signup/", views.signup),
  path("questionnaire/", views.QuestionnaireView.as_view()),
  path("questionnaire/<str:id>/", views.QuestionnaireView.as_view()),
  path("filledQuestionnaire/", views.FilledQuestionnaireView.as_view()),

  ]
