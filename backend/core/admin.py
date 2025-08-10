from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import TravelData

@admin.register(TravelData)
class TravelDataAdmin(admin.ModelAdmin):
    list_display = ('title', 'country', 'dates')
    search_fields = ('title', 'country')
