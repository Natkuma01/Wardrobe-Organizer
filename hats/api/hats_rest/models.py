from django.db import models

# Create your models here.
class Hat(models.Model):
    name = models.CharField(max_length=200)
    fabric = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        "wardrobe_api.Location",
        related_name="location",
        on_delete=models.CASCADE
    )
