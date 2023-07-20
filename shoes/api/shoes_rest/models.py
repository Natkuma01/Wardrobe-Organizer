from django.db import models


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True)


class Shoe(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture = models.URLField()
    
    bin = models.ForeignKey(
        BinVO,
        related_name ="shoe",
        on_delete=models.CASCADE,
    )


