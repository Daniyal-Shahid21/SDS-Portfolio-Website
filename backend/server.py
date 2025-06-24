from http.server import HTTPServer, BaseHTTPRequestHandler
from navInsert import insert_navbar
from footerInsert import insert_footer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        print(f"[SERVER] Received request for: {self.path}")
        if self.path == "/":
            path = "/home.html"
        else:
            path = self.path
        full_path = "../frontend" + path

        if path.endswith(".html"):
            html = insert_navbar(full_path, "../frontend/navbar.html")
            html = insert_footer(html, "../frontend/footer.html")
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
            return
        
        elif path.endswith(".ico"): 
            with open("../frontend/images/favicon.ico", "rb") as f:
                icon = f.read()
            self.send_response(200)
            self.send_header("Content-type", "image/x-icon")
            self.end_headers()
            self.wfile.write(icon)
            return

        elif path.endswith(".png"):
            with open(full_path, "rb") as f:
                image = f.read()
            self.send_response(200)
            self.send_header("Content-type", "image/png")
            self.end_headers()
            self.wfile.write(image)
            return

        elif path.endswith(".js"):
            try:
                with open(full_path, "rb") as f:
                    js = f.read()
                self.send_response(200)
                self.send_header("Content-type", "application/javascript")
                self.send_header("Content-Length", str(len(js)))
                self.end_headers()
                self.wfile.write(js)
                print(f"Served JS: {full_path}")
            except Exception as e:
                self.send_error(500, f"Error serving JS: {e}")


        elif path.endswith(".json"):
            with open(full_path, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(data)
            return

        else:
            self.send_error(404, "File not found")
        
server = HTTPServer(("localhost", 3000), Handler)
server.serve_forever()