from fastapi import FastAPI
import httpx

app = FastAPI()


async def upc_lookup(upc: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.upcitemdb.com/prod/trial/lookup?upc={upc}")
        return response.json()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/lookup/{upc}")
async def get_upc_lookup(upc: str):
    r = await upc_lookup(upc)
    return r

