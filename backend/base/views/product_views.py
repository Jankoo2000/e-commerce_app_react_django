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
    query = request.query_params.get('keyword')
    print('query: ', query)
    if query is None:
        query = ''

    # products = Product.objects.all()
    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)  # safe parameter provides serialize list to json


@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]
    # "rating" field is greater than or equal to 4.
    # The minus sign ("-") before "rating" indicates a descending order, so the products with the highest ratings will be at the to
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# one cliced product it goes to
@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)  # safe parameter provides serialize list to json@api_view(['GET'])


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    # TODO: update this function
    user = request.user
    data = request.data
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


@api_view(['POST'])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')
