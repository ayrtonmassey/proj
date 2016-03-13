# =====================
# wsgi.py file begin 

import os, sys
# add the hellodjango project path into the sys.path
sys.path.append('/var/www/tracking_api')

# add the virtualenv site-packages path to the sys.path
sys.path.append('/var/www/tracking_api/lib/python-2.7/site-packages')

# poiting to the project settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tracking_api.settings")
os.environ["DJANGO_SETTINGS_MODULE"] = "tracking_api.settings"

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# wsgi.py file end
# ===================
