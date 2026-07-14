from fastapi.security import HTTPBearer
from fastapi_plugin.fast_api_client import Auth0FastAPI

import os

auth0 = Auth0FastAPI(
    domain=os.environ.get("AUTH0_DOMAIN"),
    audience=os.environ.get("AUTH0_AUDIENCE")
)

bearer_scheme = HTTPBearer()