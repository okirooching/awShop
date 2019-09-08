# Generated by Django 2.2.3 on 2019-09-04 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='orderdetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customeroder', models.CharField(max_length=180)),
                ('customerlongitude', models.IntegerField()),
                ('customerlatitude', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='productitem',
            fields=[
                ('ptroductitemimage', models.ImageField(upload_to='productsimages')),
                ('productitemname', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('productitemprice', models.IntegerField()),
            ],
        ),
    ]
