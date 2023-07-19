from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Hat, LocationVO
from common.json import ModelEncoder

#Encoders


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "id"
    ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "fabric",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


#Api Views
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
                {"hats": hats},
                encoder=HatListEncoder,
                )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
                )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        location_href = content["location"]
        location = LocationVO.objects.get(import_href=location_href)
        content["location"] = location

        Hat.objects.filter(id=id).update(**content)
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
