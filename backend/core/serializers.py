from rest_framework import serializers
from .models import TravelData

class TravelDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelData
        fields = '__all__'
