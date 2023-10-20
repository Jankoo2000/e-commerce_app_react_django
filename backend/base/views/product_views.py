from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from base.models import Product
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)  # safe parameter provides serialize list to json


# one cliced product it goes to
@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)  # safe parameter provides serialize list to json@api_view(['GET'])


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    # data = request.data
    product = Product.objects.create(
        user=user,
        name='Ziemniak',
        # image=
        brand='Koper sp. zoo',
        category='jedzenie',
        description='Pyszne',
        price=12,
        countInStock=12,

    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)  # safe parameter provides serialize list to json@api_view(['GET'])


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data

    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.countInStock = data['countInStock']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)  # safe parameter provides serialize list to json@api_view(['GET'])


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    print('Product deleted')
    return Response('Product deleted')
