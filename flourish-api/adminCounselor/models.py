import uuid
from django.db import models
from django.contrib.auth.models import User


class AdminCounselor(models.Model):
  id =models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)   
  name = models.CharField(max_length=255, blank=True, default="") 
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="adminCounselor", null=True)

  def __str__(self):
      return f"name {self.name} id {self.id} email {self.user.email}"
