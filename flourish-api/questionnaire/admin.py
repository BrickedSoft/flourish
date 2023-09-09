from django.contrib import admin

from questionnaire.models import Questionnaire, QuestionnaireField, FilledQuestionnaire

admin.site.register(Questionnaire)
admin.site.register(QuestionnaireField)
admin.site.register(FilledQuestionnaire)

