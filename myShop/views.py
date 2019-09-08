from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.contrib import auth
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from .models import  productitem, orderdetails

# Create your views here.
def index(request):
    
    allMyProducts = productitem.objects.all()
    if request.method == 'POST':
        searchProduct = request.POST.get("searchItem")
        # if searchProduct:
        match = productitem.objects.filter(Q(productitemname__icontains=searchProduct))
        if match:
            allMyProducts = productitem.objects.all()
            return render(request, 'index.html', {'products': match, 'allMyProducts': allMyProducts})
        else:
            message = "That item is out of stock"
            return render(request, 'index.html', {'message': message, 'allMyProducts': allMyProducts})
        # else:
            # return HttpResponseRedirect('/')
    # else:
    return render(request, 'index.html', {'allMyProducts': allMyProducts})


    
def addOrder(request):
    if request.method == 'POST':
        userOrder = request.POST.get("orderText")
        userLongitude =  request.POST.get("userLongitude")
        userLatitude =  request.POST.get("userLatitude")
        an_Order = orderdetails( customeroder=userOrder, customerlongitude=userLongitude,  customerlatitude=userLatitude)
        an_Order.save()
    return HttpResponseRedirect('/')

def shop(request):

    orderedItems = orderdetails.objects.all()
    return render(request, 'shop.html', {'orderedItems':orderedItems})