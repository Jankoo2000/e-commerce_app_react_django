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


# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html
# sending with token username and email
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


# '/api/users/login/'
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    data = request.data
    print(data)
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],  ## must be unique
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def register_user(request):
#     data = request.data
#     try:
#         # Check if a user with the same email already exists
#         if User.objects.filter(username=data['email']).exists():
#             message = {'detail': 'User with this email already exists'}
#             return Response(message, status=status.HTTP_400_BAD_REQUEST) # occurs error that's why displayed in console
#
#         user = User.objects.create(
#             first_name=data['name'],
#             username=data['email'],
#             email=data['email'],
#             password=make_password(data['password'])
#         )
#         # Assuming you have a serializer named UserSerializerWithToken
#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)  # pointless status transferring because it's
#         # not used and saved at all
#     except Exception as e:
#         message = {'detail': 'An error occurred during registration'}
#         return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])  # response to GET request
@permission_classes([IsAuthenticated])  # without ACCESS token is't [http://127.0.0.1:8000/api/users/login/] not
# accesable "detail": "Authentication credentials were not provided."
def get_user_profile(request):
    # because of this decorator django is looking for authentication token
    # (so even if you are logged in django it will return null because of not having token)

    user = request.user
    serializer = UserSerializer(user, many=False)  # how to serialize
    return Response(serializer.data)  # safe parameter provides serialize list to json


@api_view(['PUT'])  # response to PUT request / PUT = UPDATE
@permission_classes([IsAuthenticated])  # without ACCESS token is't [http://127.0.0.1:8000/api/users/login/] not
# accesable "detail": "Authentication credentials were not provided."
def update_user_profile(request):
    # because of this decorator django is looking for authentication token
    # (so even if you are logged in django it will return null because of not having token)
    print('halo')
    user = request.user
    print(user)
    serializer = UserSerializerWithToken(user, many=False)  # how to serialize

    # updating
    data = request.data
    print(f'request data {data["name"]} ')
    # user.first_name = 'Ziemniak'
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)  #


@api_view(['GET'])
@permission_classes([IsAdminUser])  # without ACCESS token is;t not accessible
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)  # safe parameter provides serialize list to json@api_view(['GET'])
