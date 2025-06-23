def insert_footer(html: str, footer_path: str) -> str:
    with open(footer_path, "r") as foot:
        footer = foot.read()
    return html.replace('<div class="footer"></div>', footer)
