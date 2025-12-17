#!/usr/bin/env python3
"""
Simple HTTP Server for Portfolio Website - Samsani Hema Sri Latha
Serves static files and handles basic routing
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from urllib.parse import urlparse

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for API calls
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.end_headers()

def start_server(port=8000):
    """Start the HTTP server"""
    try:
        with socketserver.TCPServer(("", port), PortfolioHandler) as httpd:
            print(f"Portfolio Server Starting...")
            print(f"Server running at: http://localhost:{port}")
            print(f"Opening browser automatically...")
            print(f"Note: PHP features require a PHP server (XAMPP/WAMP)")
            print(f"EmailJS is configured for contact forms")
            print(f"Press Ctrl+C to stop the server")
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{port}')
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\nServer stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Port already in use
            print(f"Port {port} is already in use. Trying port {port + 1}...")
            start_server(port + 1)
        else:
            print(f"Error starting server: {e}")
            sys.exit(1)

if __name__ == "__main__":
    # Change to the script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    start_server()