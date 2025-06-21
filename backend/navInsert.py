def insert_navbar(html_path, navbar_path):
    with open (navbar_path, "r") as nav:
        navbar = nav.read()
    with open (html_path, "r") as page:
        html = page.read()
    return html.replace('<div class="dropdown"></div>', navbar)