from django.urls import path
from . import views

urlpatterns = [
  path("", views.QuestionnaireFieldView.as_view()),
  path("<str:id>", views.QuestionnaireFieldView.as_view())]
