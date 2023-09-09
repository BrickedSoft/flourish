import uuid
from django.db import models


class Questionnaire(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True, default="")
    adminCounselor = models.ForeignKey(
        "adminCounselor.AdminCounselor",
        on_delete=models.SET_NULL,
        null=True
    )
    options = models.TextField(blank=True, default="")
    evaluation_range = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.id} name {self.name} of {self.adminCounselor}"


class QuestionnaireField(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    questionnaire = models.ForeignKey("questionnaire.Questionnaire",
                                      on_delete=models.CASCADE,
                                      related_name='questionnaireFields')
    created_at = models.DateTimeField(auto_now_add=True)
    question = models.CharField(max_length=255, blank=True, default="")

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.id} question {self.question} of {self.questionnaire}"


class FilledQuestionnaire(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey("client.Client", on_delete=models.CASCADE)
    questionnaire = models.ForeignKey("questionnaire.Questionnaire", on_delete=models.CASCADE)
    filled = models.TextField(blank=True, default="")
    comment = models.TextField(blank=True, default="")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f" filled {self.questionnaire.name} questionnaire by {self.id}  {self.client.user.username}"

