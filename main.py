from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = "SUNNY"

@app.get('/answer')
def get_answer():
    return answer


app.mount("/", StaticFiles(directory="docs",html=True), name="docs")

