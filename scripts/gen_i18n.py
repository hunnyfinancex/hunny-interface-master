import argparse
import json
import os.path

RESOURCES_PATH = "src/i18n/resources.ts"
LOCALES_DIR = "resources/locales"
FILE_CONTENT = """{imports}

const resources = {{
	{resources}
}}

export default resources
"""


def main():
    print("Loading locale files...")
    lang_codes = [
        path.replace(".json", "")
        for path in os.listdir("src/%s" % LOCALES_DIR)
        if path.endswith(".json")
    ]

    import_lines = [
        "import %s from '%s/%s.json'" % (gen_lang_module_name(code), LOCALES_DIR, code)
        for code in lang_codes
    ]
    resource_lines = {
        "'%s': { translation: %s }" % (code, gen_lang_module_name(code))
        for code in lang_codes
    }

    with open(RESOURCES_PATH, "w") as resources_files:
        resources_files.write(FILE_CONTENT.format(
            imports="\n".join(import_lines),
            resources=",\n\t".join(resource_lines),
        ))
    print("Generated `resources.ts` from %s locale files!" % len(resource_lines))


def gen_lang_module_name(code: str) -> str:
    return "lang%s" % code.upper().replace("-", "")


if __name__ == '__main__':
    main()
