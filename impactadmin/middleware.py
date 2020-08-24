# pylint: disable=import-error
from whitenoise.middleware import WhiteNoiseMiddleware


class CustomWhiteNoiseMiddleware(WhiteNoiseMiddleware):
    mimetypes = {'.jsx': 'text/javascript'}
