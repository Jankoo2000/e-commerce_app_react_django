from django.shortcuts import render
from flights.flights import start

from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import FlightSerializer
from rest_framework.exceptions import ValidationError
import json
from datetime import datetime, timedelta

# Create your views here.


@api_view(['GET'])
def flight(request):
    input_data = [
        ['0', 'warsaw', 'anywhere', str(datetime.now().date()), str(datetime.now().date() + timedelta(days=60)), '4',
         '7',
         '1500'],
    ]
    if (
            request.query_params.get('departure') is not None and
            request.query_params.get('destination') is not None and
            request.query_params.get('startDate') is not None and
            request.query_params.get('endDate') is not None
    ):
        input_data[0][1] = request.query_params.get('departure')
        input_data[0][2] = request.query_params.get('destination')
        input_data[0][3] = request.query_params.get('startDate')
        input_data[0][4] = request.query_params.get('endDate')
        # min_days
        input_data[0][5] = (datetime.strptime(input_data[0][4], '%Y-%m-%d') - datetime.strptime(input_data[0][3],
                                                                                                '%Y-%m-%d')).days
        # max_days
        input_data[0][6] = (datetime.strptime(input_data[0][4], '%Y-%m-%d') - datetime.strptime(input_data[0][3],
                                                                                                '%Y-%m-%d')).days + 2

    flights = start(input_data)
    print(flights[0])
    serialized_flights = []
    for flight_tuple in flights:
        print({
            'departure_datetime': flight_tuple[0],
            'departure_info': flight_tuple[1],
            'arrival_info': flight_tuple[2],
            'duration_info': flight_tuple[3],
            'return_datetime': flight_tuple[4],
            'return_departure_info': flight_tuple[5],
            'return_arrival_info': flight_tuple[6],
            'return_duration_info': flight_tuple[7],
            'price': flight_tuple[8],
            'booking_link': flight_tuple[9]
        })

        print({
            'departure_datetime': str(flight_tuple[0])[:10],
        })

        # name of field = name of filed in field class
        serializer = FlightSerializer(data={
            'departure_date': str(flight_tuple[0])[:10],
            'departure_info': flight_tuple[1][6:],
            'arrival_info': flight_tuple[2][6:],
            'duration_info': flight_tuple[3],
            'return_date': str(flight_tuple[4])[:10],
            'return_departure_info': flight_tuple[5],
            'return_arrival_info': flight_tuple[6],
            'return_duration_info': flight_tuple[7],
            'price': flight_tuple[8],
            'booking_link': flight_tuple[9],
        })
        if serializer.is_valid():
            serialized_flights.append(serializer.data)
        else:
            print(serializer.errors)

    return Response(serialized_flights)
