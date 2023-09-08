from django.db import models
import uuid

# Create your models here.

class RegistrationForm(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey("client.Client", on_delete=models.CASCADE)

    date_time = models.CharField(max_length=255, blank=True, default="")
    gender = models.CharField(max_length=255, blank=True, default="")
    marital_status = models.CharField(max_length=255, blank=True, default="")
    occupation = models.CharField(max_length=255, blank=True, default="")
    department = models.CharField(max_length=255, blank=True, default="")
    present_address = models.CharField(max_length=255, blank=True, default="")
    home_district = models.CharField(max_length=255, blank=True, default="")
    mobile_number = models.CharField(max_length=255, blank=True, default="")
    your_problem = models.TextField(max_length=1024, blank=True, default="")
    referred_by = models.CharField(max_length=255, blank=True, default="")
    type_of_service = models.CharField(max_length=255, blank=True, default="")
    official_comment = models.TextField(max_length=1024, blank=True, default="")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f" filled {self.id} regForm by {self.client.user.username}"

