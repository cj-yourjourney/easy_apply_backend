import json
from django.http import JsonResponse
from serpapi import GoogleSearch
from django.conf import settings  # Import settings module to get the BASE_DIR
from rest_framework.decorators import api_view
from ..models import Job
import os


def job_listings_test(request):
    # Path to the JSON file containing job listings
    json_file_path = os.path.join(settings.BASE_DIR, "job_listings.json")

    # Read data from the JSON file
    with open(json_file_path, "r") as file:
        job_listings_data = json.load(file)

    # Extract job listings from the JSON data
    job_listings = job_listings_data.get("job_listings", [])

    # Return the job listings as JSON response
    return JsonResponse({"job_listings": job_listings})


# def get_job_listings(request):
#     api_key = os.environ.get("SERP_API_KEY")
#     # Define the search parameters
#     params = {
#         "engine": "google_jobs",
#         "q": "React developer",
#         "ltype": "1",
#         "hl": "en",
#         "api_key": api_key,
#     }

#     # Perform the search
#     search = GoogleSearch(params)
#     results = search.get_dict()

#     # Extract job listings from the search results
#     job_listings = []
#     if "jobs_results" in results:
#         for job_result in results["jobs_results"]:
#             job = {
#                 "title": job_result.get("title", ""),
#                 "company_name": job_result.get("company_name", ""),
#                 "description": job_result.get("description", ""),
#                 "apply_job_link": job_result.get("related_links", [{}])[0].get(
#                     "link", ""
#                 ),  # Assuming apply job link is the first related link
#             }
#             job_listings.append(job)

#     # Save job listings as JSON file
#     json_file_path = os.path.join(settings.BASE_DIR, "job_listings.json")
#     with open(json_file_path, "w") as json_file:
#         json.dump({"job_listings": job_listings}, json_file, indent=4)

#     # Return the job listings as JSON response
#     return JsonResponse({"job_listings": job_listings})


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json


@api_view(["POST"])
def create_job(request):
    data = request.data
    try:
        title = data.get("title")
        company_name = data.get("company_name")
        description = data.get("description")
        apply_job_link = data.get("apply_job_link")

        job = Job.objects.create(
            title=title,
            company_name=company_name,
            description=description,
            apply_job_link=apply_job_link,
        )
        return JsonResponse({"message": "Job created successfully"}, status=201)

    except Exception as e:
        # Return an error response if there's any exception
        return JsonResponse({"error": str(e)}, status=400)
