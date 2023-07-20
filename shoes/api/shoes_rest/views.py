from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Shoe, BinVO
import json
from common.json import ModelEncoder


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name", 
        "import_href"
        ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["name"]

    def get_extra_data(self, o):
        return{"bin": o.bin.closet_name}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "name",
        "manufacturer",
        "color",
        "picture",
        "bin"
    ]
    encoders = {
        "bin": BinVODetailEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):    
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            bin_href = content["bin"]  
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
            
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "You don't have this shoe"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
    
    else:
        content = json.loads(request.body)
        
        bin_href = content["bin"]  
        bin = BinVO.objects.get(import_href=bin_href)
        content["bin"] = bin 

        Shoe.objects.filter(id=pk).update(**content)
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder = ShoeDetailEncoder,
            safe=False,
        )   