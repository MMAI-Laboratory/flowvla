"""Local static preview with single HTTP byte ranges for research media."""
import argparse
import functools
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class RangeHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        self.byte_range = None
        value = self.headers.get('Range')
        path = self.translate_path(self.path)
        if not value or os.path.isdir(path):
            return super().send_head()
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', value.strip())
        if not match or not any(match.groups()):
            return super().send_head()
        try:
            stream = open(path, 'rb')
        except OSError:
            self.send_error(404, 'File not found')
            return None
        stat = os.fstat(stream.fileno())
        length = stat.st_size
        first, last = match.groups()
        if first:
            start = int(first)
            end = min(int(last) if last else length - 1, length - 1)
        else:
            start, end = max(0, length - int(last)), length - 1
        if start >= length or start > end:
            stream.close()
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{length}')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        self.byte_range = (start, end)
        stream.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Content-Range', f'bytes {start}-{end}/{length}')
        self.send_header('Last-Modified', self.date_time_string(stat.st_mtime))
        self.end_headers()
        return stream

    def copyfile(self, source, outputfile):
        try:
            if self.byte_range is None:
                return super().copyfile(source, outputfile)
            remaining = self.byte_range[1] - self.byte_range[0] + 1
            while remaining:
                chunk = source.read(min(256 * 1024, remaining))
                if not chunk:
                    break
                outputfile.write(chunk)
                remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def log_message(self, format, *args):
        # Browser cancellation of a video request is normal during seeking.
        if len(args) > 1 and str(args[1]) not in ('200', '206', '304'):
            super().log_message(format, *args)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--directory', required=True)
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    handler = functools.partial(RangeHandler, directory=args.directory)
    server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    print(f'Preview serving http://127.0.0.1:{args.port}/ with HTTP byte ranges', flush=True)
    server.serve_forever()
