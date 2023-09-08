from rest_framework import serializers
from .models import Questionnaire, QuestionnaireField, FilledQuestionnaire


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = '__all__'

class QuestionnaireFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionnaireField
        fields = '__all__'

class FilledQuestionnaireSerializer(serializers.ModelSerializer):

    class Meta:
        model = FilledQuestionnaire
        fields = '__all__'

class QuestionnaireViewSerializer(serializers.ModelSerializer):
    questionnaireFields = QuestionnaireFieldSerializer(many=True)
    class Meta:
        model = Questionnaire
        fields = '__all__'