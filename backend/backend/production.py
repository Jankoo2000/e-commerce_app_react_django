import os
from .settings import *
from .settings import BASE_DIR

# https://cbi-analytics.nl/deploy-django-react-on-azure-2-change-backend-code-for-deployment/

# SECRET_KEY = os.environ['SECRET_KEY']
# SECRET_KEY = 'django-insecure-7^0er-(fs)dm$uhf6*e-l=+nl1#((t*1(e-@frnl0k!clnixz*'
# ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
# CSRF_TRUSTED_ORIGINS = ['https://' + os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
# DEBUG = False

# MIDDLEWARE = [
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#
#     'corsheaders.middleware.CorsMiddleware',
#     'whitenoise.middleware.WhiteNoiseMiddleware',
#
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  ####### ????????????

# conn_str = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
# conn_str = 'dbname=swift-shop-wat-database host=swift-shop-wat-server.postgres.database.azure.com port=5432 sslmode=require user=wpzhbrcnrn password=3C7YRB28286MZN08$'

# conn_str_params = {pair.split('=')[0]: pair.split('=')[1] for pair in conn_str.split(' ')}
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': conn_str_params['dbname'],
#         'HOST': conn_str_params['host'],
#         'USER': conn_str_params['user'],
#         'PASSWORD': conn_str_params['password'],
#     }
# }
