# Generated by Django 4.2.4 on 2023-10-15 09:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_coutry_shippingaddress_country'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingaddress',
            name='shippingPrice',
        ),
    ]
