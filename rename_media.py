#!/usr/bin/env python3
"""Renombra archivos en BE/ a 1, 2, 3... manteniendo extensión."""
import os

SRC = os.path.join(os.path.dirname(__file__), "BE")

exts = {".heic", ".heif", ".jpg", ".jpeg", ".png", ".avif", ".webp",
        ".mov", ".mp4", ".m4v"}

files = [f for f in os.listdir(SRC) if os.path.splitext(f)[1].lower() in exts]

# Ordenar: primero por número IMG_XXXX si existe, luego alfabético
def sort_key(name):
    base = os.path.splitext(name)[0]
    import re
    m = re.match(r"IMG_(\d+)", base, re.IGNORECASE)
    if m:
        return (0, int(m.group(1)))
    return (1, base.lower())

files.sort(key=sort_key)

for i, name in enumerate(files, 1):
    ext = os.path.splitext(name)[1].lower()
    new_name = f"{i}{ext}"
    old_path = os.path.join(SRC, name)
    new_path = os.path.join(SRC, new_name)
    if old_path != new_path:
        os.rename(old_path, new_path)
        print(f"{name} -> {new_name}")

print(f"\nRenombrados {len(files)} archivos.")