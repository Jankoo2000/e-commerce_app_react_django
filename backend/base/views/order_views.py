from django.contrib import admin
from django.urls import path, include

from base.views import order_views as views
from base.models import Product, Order, OrderItem, ShippingAddress
from rest_framework.decorators import api_view, permission_classes
from base.serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime


# POST request is Used to submit data to be processed to a specified resource.
@api_view(['POST'])  # respond to POST request
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    # deserializing request, As's parsing JSON to python data?
    order_items = data['orderItems']  # PLaceOrderScreen, orderAction
    if order_items and len(order_items) == 0:
        return Response({'detail': 'No order Items'}, status=400)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],

        )

        # shipping saved through product
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        for i in order_items:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])  # respond to GET request
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):  # path('<str:pk>/', views.get_order_by_id, name='get_order_by_id'),
    user = request.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(f"An exception occurred: {str(e)}")
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])  # respond to GET request
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')
