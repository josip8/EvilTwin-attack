import argparse
import sys
import datetime
import json
import logging
import re
import random
import requests
import shutil
from pyquery import PyQuery as pq


def main(username, password, page):

    logging.basicConfig(filename='logging.log', level=logging.DEBUG)

    session = requests.session()

    uid, dtsg = login(session, username, password)


def login(session, username, password):

    # Navigate to the Facebook homepage
    response = session.get('https://facebook.com')

    # Construct the DOM
    dom = pq(response.text)

    # Get the lsd value from the HTML. This is required to make the login request
    lsd = dom('[name="lsd"]').val()

    # Perform the login request
    response = session.post('https://www.facebook.com/login.php?login_attempt=1', data={
        'lsd': lsd,
        'email': username,
        'pass': password,
        'default_persistent': '0',
        'timezone': '-60',
        'lgndim': '',
        'lgnrnd': '',
        'lgnjs': '',
        'locale':'en_GB',
        'qsstamp': ''
    })

    print len(response.text)
    sys.stdout.flush()

try:
    main(username=sys.argv[1], password=sys.argv[2], page='https://www.facebook.com')
except Exception, e:
    logging.exception(e)
