from django.db import models

# Create your models here.


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)


class Hat(models.Model):
    name = models.CharField(max_length=200)
    fabric = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="location",
        null=True,
        on_delete=models.CASCADE
    )
