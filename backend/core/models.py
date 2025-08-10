
# Create your models here.
from django.db import models

class TravelData(models.Model):
    title = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    dates = models.CharField(max_length=100)
    text = models.TextField()
    google_maps_link = models.URLField()
    img_src = models.URLField()
    img_alt = models.CharField()

    def __str__(self):
        return f"{self.title} - {self.country}"
