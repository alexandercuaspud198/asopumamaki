"""Generate WebP assets without changing the original photographs (requires Pillow)."""

import json
from pathlib import Path

from PIL import Image, ImageOps


FRONTEND = Path(__file__).resolve().parents[1]
IMAGES = FRONTEND / "public" / "images"
OUTPUT = IMAGES / "optimized"
OUTPUT.mkdir(exist_ok=True)

variants = {}
original_bytes = 0
full_bytes = 0
small_bytes = 0

for source in sorted(IMAGES.iterdir()):
    if source.suffix.lower() not in {".jpg", ".jpeg"}:
        continue
    with Image.open(source) as original:
        photo = ImageOps.exif_transpose(original).convert("RGB")
        profile = original.info.get("icc_profile", b"")
        versions = []
        full_width = 1920 if photo.width > 1920 else min(1280, photo.width)
        for width in sorted({min(640, photo.width), full_width}):
            height = round(photo.height * width / photo.width)
            resized = photo.resize((width, height), Image.Resampling.LANCZOS)
            target = OUTPUT / f"{source.stem.lower()}-{width}.webp"
            # Some camera JPGs are already compressed; avoid making their replacements larger.
            for quality in (80, 76, 72, 68, 64):
                resized.save(target, "WEBP", quality=quality, method=6, icc_profile=profile)
                if target.stat().st_size <= source.stat().st_size * 0.9:
                    break
            versions.append({
                "src": target.relative_to(FRONTEND / "public").as_posix(),
                "width": width,
                "height": height,
            })
        variants[f"images/{source.name}"] = versions
        before = source.stat().st_size
        full = (FRONTEND / "public" / versions[-1]["src"]).stat().st_size
        small = (FRONTEND / "public" / versions[0]["src"]).stat().st_size
        original_bytes += before
        full_bytes += full
        small_bytes += small
        print(f"{source.name}: {before:,} -> {full:,} bytes (small: {small:,})")

# Preserve every pixel and the transparency of the existing logo.
with Image.open(IMAGES / "logo-pumamaki.png") as logo:
    logo.save(OUTPUT / "logo-pumamaki.webp", "WEBP", lossless=True, method=6)

(FRONTEND / "src" / "data" / "imageVariants.json").write_text(
    json.dumps(variants, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print(f"Full photographs: {original_bytes:,} -> {full_bytes:,} bytes ({1 - full_bytes / original_bytes:.1%} smaller)")
print(f"Small photographs: {small_bytes:,} bytes total")
