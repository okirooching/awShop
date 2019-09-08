from django.db import models

# Create your models here.
class productitem(models.Model):
    productitemimage = models.ImageField(upload_to='productsimages')
    productitemname = models.CharField(max_length=20, primary_key=True)
    productitemprice = models.IntegerField()

class orderdetails(models.Model):
    customeroder = models.CharField(max_length=250)
    customerlongitude = models.FloatField()
    customerlatitude = models.FloatField()
