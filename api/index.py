from fastapi import FastAPI

app = FastAPI(title="Smart Hospital API")


@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/health")
def health():
    return {"status": "healthy"}
