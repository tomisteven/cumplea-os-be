# Convierte los archivos de BE/ a formatos de la web (web/media/)
# - Imágenes (HEIC, HEIF, JPG, PNG, AVIF, WEBP) -> JPG optimizado (max 1600px)
# - Videos (MOV, MP4, M4V) -> MP4 H.264 comprimido (max 1280px)
# Los nombres de salida son ESTABLES (basados en el archivo original), así que
# podés agregar fotos nuevas cuando quieras y volver a correrlo sin romper nada.
import os, re, subprocess, json, glob
from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "BE")
OUT_IMG = os.path.join(ROOT, "web", "media", "img")
OUT_VID = os.path.join(ROOT, "web", "media", "vid")
for d in (OUT_IMG, OUT_VID):
    os.makedirs(d, exist_ok=True)

IMG_EXT = {".heic", ".heif", ".jpg", ".jpeg", ".png", ".avif", ".webp"}
VID_EXT = {".mov", ".mp4", ".m4v"}

import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()


def slug(name, ext):
    return os.path.splitext(name)[0] + "." + ext


def img_sort_key(name):
    base = os.path.splitext(name)[0]
    m = re.match(r"IMG_(\d+)", base)
    if m:
        return (0, int(m.group(1)))
    return (1, base)


def vid_sort_key(name):
    base = os.path.splitext(name)[0]
    m = re.match(r"IMG_(\d+)", base)
    return int(m.group(1)) if m else 99999


manifest = []
processed = skipped = failed = 0

# ---------- imágenes ----------
for name in sorted(os.listdir(SRC), key=img_sort_key):
    ext = os.path.splitext(name)[1].lower()
    if ext not in IMG_EXT:
        continue
    is_avif = ext == ".avif"
    if is_avif:
        # AVIF se deja en su formato nativo (mejor calidad/peso) + respaldo JPG
        out = os.path.join(OUT_IMG, slug(name, "avif"))
    else:
        out = os.path.join(OUT_IMG, slug(name, "jpg"))
    if not os.path.exists(out):
        try:
            im = Image.open(os.path.join(SRC, name))
            im = ImageOps.exif_transpose(im)
            if im.mode in ("P", "LA"):
                im = im.convert("RGBA")
            if im.mode != "RGBA" and im.mode != "RGB":
                im = im.convert("RGB")
            im.thumbnail((1600, 1600), Image.LANCZOS)
            if is_avif:
                im.save(out, "AVIF", quality=72)
                # respaldo JPG para navegadores sin soporte AVIF
                jpg_out = os.path.join(OUT_IMG, slug(name, "jpg"))
                if not os.path.exists(jpg_out):
                    flat = im
                    if im.mode == "RGBA":
                        bg = Image.new("RGB", im.size, (255, 255, 255))
                        bg.paste(im, mask=im.split()[-1])
                        flat = bg
                    flat.convert("RGB").save(jpg_out, "JPEG", quality=86, optimize=True)
            else:
                im.save(out, "JPEG", quality=86, optimize=True, progressive=True)
            processed += 1
            print("IMG", name, "->", os.path.basename(out))
        except Exception as e:
            failed += 1
            print("ERROR img", name, e)
            continue
    else:
        skipped += 1
        print("IMG ok", name)
    manifest.append({"type": "img", "src": "media/img/" + slug(name, "avif" if is_avif else "jpg"), "file": name})

# ---------- videos ----------
for name in sorted(os.listdir(SRC), key=vid_sort_key):
    ext = os.path.splitext(name)[1].lower()
    if ext not in VID_EXT:
        continue
    out = os.path.join(OUT_VID, slug(name, "mp4"))
    if not os.path.exists(out) or os.path.getsize(out) < 10000:
        r = subprocess.run(
            [FF, "-y", "-i", os.path.join(SRC, name),
             "-vf", "scale='min(1280,iw)':-2",
             "-c:v", "libx264", "-crf", "26", "-preset", "veryfast",
             "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
             out],
            capture_output=True, text=True)
        if r.returncode != 0:
            failed += 1
            print("ERROR vid", name, r.stderr[-400:])
            continue
        processed += 1
        print("VID", name, "->", os.path.relpath(out, ROOT), os.path.getsize(out) // 1024, "KB")
    else:
        skipped += 1
        print("VID ok", name)
    manifest.append({"type": "vid", "src": "media/vid/" + slug(name, "mp4"), "file": name})

with open(os.path.join(ROOT, "web", "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)

print(f"DONE  {processed} procesado / {skipped} ya existía / {failed} error")