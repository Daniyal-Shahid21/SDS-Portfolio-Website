from http.server import HTTPServer, BaseHTTPRequestHandler
from navInsert import insert_navbar

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            path = "/home.html"
        else:
            path = self.path
        full_path = "../frontend" + path

        if path.endswith(".html"):
            html = insert_navbar(full_path, "../frontend/navbar.html")
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))

        if path.endswith(".ico"): 
            with open("../frontend/images/favicon.ico", "rb") as f:
                icon = f.read()
                self.send_response(200)
                self.send_header("Content-type", "image/x-icon")
                self.end_headers()
                self.wfile.write(icon)
        
        if path.endswith(".png"):
            with open(full_path, "rb") as f:
                image = f.read()
                self.send_response(200)
                self.send_header("Content-type", "image/png")
                self.end_headers()
                self.wfile.write(image)
                
        if path.endswith(".js"):
            with open(full_path, "rb") as f:
                js = f.read()
                self.send_response(200)
                self.send_header("Content-type", "text/javascript")
                self.end_headers()
                self.wfile.write(js)

        
server = HTTPServer(("localhost", 3000), Handler)
server.serve_forever()