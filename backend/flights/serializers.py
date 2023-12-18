from rest_framework import serializers

from rest_framework import serializers


class FlightSerializer(serializers.Serializer):
    # departure_datetime = serializers.DateTimeField()
    # arrival_datetime = serializers.DateTimeField()
    # departure_airport = serializers.CharField()
    # arrival_airport = serializers.CharField()
    # duration = serializers.CharField()
    # price = serializers.CharField()
    # booking_link = serializers.URLField()

    departure_date = serializers.CharField()
    departure_info = serializers.CharField()
    arrival_info = serializers.CharField()
    duration_info = serializers.CharField()
    return_date = serializers.CharField()
    return_departure_info = serializers.CharField()
    return_arrival_info = serializers.CharField()
    return_duration_info = serializers.CharField()
    price = serializers.CharField()
    booking_link = serializers.URLField()
