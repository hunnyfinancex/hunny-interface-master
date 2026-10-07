import argparse
import json
import os.path
from argparse import RawTextHelpFormatter


SPREADSHEET_ID = "16s7NtjGRJCkjK_MdDaHPWESz9KeSYZiAPDn7HL6wwMU"
RANGE_IDX = "pancakehunny.finance!A:Z"
META_COL_COUNT = 2

parser = argparse.ArgumentParser(
    formatter_class=RawTextHelpFormatter,
    description='''Download translations from Sheet: %s.\n
If this is your first time, install dependencies by running this command:
\tpip install --user google-api-python-client google-auth-httplib2 google-auth-oauthlib
''' % SPREADSHEET_ID)
parser.add_argument('token', metavar='token_file', help='Token file for authetication')
parser.add_argument('--dir', default='./src/resources/locales/', help='Directory of the output locale files')

args = parser.parse_args()


from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


def main():
    if os.path.exists(args.token):
        creds = Credentials.from_service_account_file(args.token)

    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    result = (sheet.values()
              .get(spreadsheetId=SPREADSHEET_ID, range=RANGE_IDX)
              .execute())
    rows = result.get('values', [])

    headers = rows[0]
    print("Parsing Sheet `%s` values..." % SPREADSHEET_ID)

    lang_table_map = {}
    idx_lang_map = {}
    for i in range(len(headers)):
        if i < META_COL_COUNT:
            continue
        header = headers[i]
        lang_code = get_lang_code(header)
        idx_lang_map[i] = lang_code
        lang_table_map[lang_code] = {}

    for values in rows[1:]:
        key = values[0]
        for i in range(META_COL_COUNT, len(values)):
            lang_code = idx_lang_map[i]
            value = values[i]
            lang_table_map[lang_code][key] = value

    if not os.path.exists(args.dir):
        os.mkdir(args.dir)
    for lang, table in lang_table_map.items():
        file_path = os.path.join(args.dir, "%s.json" % lang)
        print("Write to file %s" % file_path)
        with open(file_path, "w") as fo:
            fo.write(json.dumps(table, indent=2))

    print("Sync %s files finished!" % len(lang_table_map))


def get_lang_code(text: str) -> str:
    left_idx = text.find("[")+1
    right_idx = text.find("]")
    return text[left_idx:right_idx]


if __name__ == '__main__':
    main()
