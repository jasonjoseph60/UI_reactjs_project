from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
import webbrowser
import os
import shutil
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(BASE_DIR, "archived")
os.makedirs(pdf_path, exist_ok=True)


@app.get("/api/ping")
async def root():
    return {"message": "FastAPI is active!"}


@app.post("/api/extract")
async def extract_values(file: UploadFile = File(...)):
    try:
        # Replace placeholders with your actual credentials and URLs
        isga_host = "xxx"
        nucleus_isga_scope = "xxx"
        fa_user_certificate = "xxx"
        fa_user_private_key = "xxx"
        ca_certificate = r"xxx"

        request_body_data = {
            "grant_type": "client_credentials",
            "scope": nucleus_isga_scope
        }

        response = requests.post(
            isga_host + '/auth/oauth/v3/token',
            data=request_body_data,
            cert=(fa_user_certificate, fa_user_private_key)
        )

        access_token = response.json()['access_token']

        # Organization credentials
        serviceId = "xxx"
        host = "xxx"
        organizationId = "xxx"

        headers = {'Authorization': 'Bearer ' + access_token}

        # API request JSON
        json_request = {
            "referenceId": "string",
            "documentName": "string"
        }

        filename = file.filename
        pdf_filepath = os.path.join(pdf_path, filename)

        with open(pdf_filepath, 'wb') as buffer:
            shutil.copyfileobj(file.file, buffer)

        with open(pdf_filepath, 'rb') as f:
            files = {
                'file': f,
                'uploadData': (None, json.dumps(json_request), 'application/json')
            }
            response = requests.post(url=f"{host}/api/v1/processing-document-service/organizations/{organizationId}/services/{serviceId}/documents",
                                     headers=headers, files=files, verify=False)

        print(response.status_code)
        response_json = response.json()
        print(response_json)

        output_data = response_json['processings'][0]['enrichments'][0]['textEnrichment']['values'][0]['value']
        start_val = output_data.index("[")
        end_val = output_data.rindex("]") + 1
        output_substring = output_data[start_val:end_val]
        output_parsed = json.loads(output_substring)

        output_final = [{"label": label, "value": value} for data in output_parsed for label, value in data.items()]
        print("your data:", output_final)

        return JSONResponse(content={"extracted_data": output_final})

    except Exception as e:
        print("Error:", str(e))
        return JSONResponse(status_code=500, content={"message": str(e)})


# Serve frontend React dist
frontend_path = os.path.abspath("./frontend/data-validator-ui/dist")
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="static")


if __name__ == "__main__":
    webbrowser.open("http://127.0.0.1:8000/")
    uvicorn.run(app, host="127.0.0.1", port=8000)
