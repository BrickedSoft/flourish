from django.urls import path
from . import views

urlpatterns = [ 
  path("signup/", views.signup),
  path("filledQuestionnaire/<str:clientId>/", views.FilledQuestionnaireView.as_view()),
  path("questionnaire/", views.QuestionnaireView.as_view())
  ]