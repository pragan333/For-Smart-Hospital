from fastapi import FastAPI

app = FastAPI(title="Smart Hospital API")


@app.get("/")
async def root():
    return {"status": "ok"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
