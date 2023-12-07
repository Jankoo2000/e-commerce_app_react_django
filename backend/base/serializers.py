from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from backend.production import DOMAIN, MEDIA_URL


# is typically used
# for both sending and receiving data in the context of a Django REST framework (DRF) API.

class UserSerializer(serializers.ModelSerializer):
    # defining fileds. Action in these fileds is defined in methods get_filedname
    # The fields defined using serializers.SerializerMethodField in a Django REST framework serializer are like
    # additional properties in the JSON representation of your objects.
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    # obj refers to the instance of the model tact is being serialized - obj = User
    class Meta:
        model = User
        # fields = '__all__'
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    # obj = User
    def get_name(self, obj):  # obj - (User) instance which is serialized
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)  # obj is current user
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        return DOMAIN + MEDIA_URL + str(obj.image)


# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'



class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


# serializer class (not deserializer)
class OrderSerializer(serializers.ModelSerializer):
    # The fields defined using serializers.SerializerMethodField in a Django REST framework serializer are like
    # additional properties in the JSON representation of your objects.
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    # how orders act
    def get_orderItems(self, obj):  # obj - (Order) instance which is serialized
        items = obj.orderitem_set.all()  # name of table are in lowercase
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            # address = ShippingAddressSerializer(obj.address, many=False)
            address = ShippingAddressSerializer(obj.shippingaddress,
                                                many=False).data  # one-to-one relationship with lowercase
        except Exception as e:
            print(f"Exception occured: {e}")
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

# STRUCTURE OF OrderSerializer OBJECT
