import os
import shutil
import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "resources", "Save the Date")
OUT = os.path.join(ROOT, "public", "assets")
os.makedirs(OUT, exist_ok=True)
S = 3000 / 768  # preview coords -> full-res


def box(x0, y0, x1, y1):
    return int(x0 * S), int(y0 * S), int(x1 * S), int(y1 * S)


def load(name):
    return cv2.imread(os.path.join(SRC, name), cv2.IMREAD_COLOR)  # BGR


def save_webp(bgr, name, width, quality=82):
    h, w = bgr.shape[:2]
    if w > width:
        bgr = cv2.resize(bgr, (width, int(h * width / w)), interpolation=cv2.INTER_AREA)
    Image.fromarray(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)).save(os.path.join(OUT, name), "WEBP", quality=quality, method=6)
    print(name, bgr.shape[1], "x", bgr.shape[0])


# ---------- 00: clean hero art + extract the names lettering ----------
img = load("00-save-the-date.jpg")
b, g, r = [img[..., i].astype(int) for i in range(3)]
lum = 0.299 * r + 0.587 * g + 0.114 * b

mask = np.zeros(img.shape[:2], np.uint8)
brown = (r - b > 10)
for bx in [box(225, 60, 545, 108), box(85, 128, 710, 408), box(155, 412, 615, 528)]:
    x0, y0, x1, y1 = bx
    mask[y0:y1, x0:x1] = (brown[y0:y1, x0:x1]).astype(np.uint8) * 255
x0, y0, x1, y1 = box(165, 935, 605, 982)
mask[y0:y1, x0:x1] = ((lum[y0:y1, x0:x1] < 215) & (r - b > 6)[y0:y1, x0:x1]).astype(np.uint8) * 255
mask = cv2.dilate(mask, np.ones((7, 7), np.uint8), iterations=2)

small = 0.5
img_s = cv2.resize(img, None, fx=small, fy=small, interpolation=cv2.INTER_AREA)
mask_s = cv2.resize(mask, None, fx=small, fy=small, interpolation=cv2.INTER_NEAREST)
clean_s = cv2.inpaint(img_s, mask_s, 9, cv2.INPAINT_TELEA)
clean = cv2.resize(clean_s, (img.shape[1], img.shape[0]), interpolation=cv2.INTER_CUBIC)
m3 = cv2.GaussianBlur(mask, (0, 0), 3).astype(float)[..., None] / 255
clean = (img * (1 - m3) + clean * m3).astype(np.uint8)
# soften inpaint seams in sky with a light blur restricted to the mask
blurred = cv2.GaussianBlur(clean, (0, 0), 6)
m4 = cv2.GaussianBlur(cv2.dilate(mask, np.ones((15, 15), np.uint8)), (0, 0), 8).astype(float)[..., None] / 255
sky_only = np.zeros_like(m4)
sky_only[: int(530 * S)] = 1
clean = (clean * (1 - m4 * sky_only) + blurred * (m4 * sky_only)).astype(np.uint8)

# Full-bleed backdrop. Copy the original so the page can serve it without a second
# compression; a 1080p monitor is wider than this file, and re-encoding softens it.
shutil.copy(os.path.join(SRC, "wide-background.jpeg"), os.path.join(OUT, "hero-art.jpg"))
print("hero-art.jpg", "copied")
wide = load("wide-background.jpeg")
save_webp(wide, "hero-art-sm.webp", 900)
# soft watercolour sky band (no scenery) for section backgrounds
save_webp(clean[int(10 * S): int(400 * S), int(100 * S):], "sky.webp", 1600, 78)

# names lettering -> transparent PNG
x0, y0, x1, y1 = box(85, 128, 710, 408)
L_orig = cv2.cvtColor(img[y0:y1, x0:x1], cv2.COLOR_BGR2GRAY).astype(float)
L_clean = cv2.cvtColor(clean[y0:y1, x0:x1], cv2.COLOR_BGR2GRAY).astype(float)
L_ink = 118.0
alpha = np.clip((L_clean - L_orig) / np.maximum(L_clean - L_ink, 1), 0, 1)
alpha[alpha < 0.06] = 0
ys, xs = np.where(alpha > 0.1)
pad = 20
ay0, ay1, ax0, ax1 = max(ys.min() - pad, 0), ys.max() + pad, max(xs.min() - pad, 0), xs.max() + pad
alpha = alpha[ay0:ay1, ax0:ax1]
rgba = np.zeros(alpha.shape + (4,), np.uint8)
rgba[..., 0], rgba[..., 1], rgba[..., 2] = 0x85, 0x73, 0x5B
rgba[..., 3] = (alpha * 255).astype(np.uint8)
names = Image.fromarray(rgba, "RGBA")
names = names.resize((1600, int(names.height * 1600 / names.width)), Image.LANCZOS)
names.save(os.path.join(OUT, "names.png"), optimize=True)
print("names.png", names.size)

# ---------- 01: floral border strip at the foot of the card ----------
c1 = load("01.jpg")
save_webp(c1[int(895 * S):], "flowers-strip.webp", 1600, 80)

# ---------- 02-04: attire illustrations on white ----------
def crop_white(name, bx, out, width):
    im = load(name)
    x0, y0, x1, y1 = box(*bx)
    save_webp(im[y0:y1, x0:x1], out, width, 84)

crop_white("02.jpg", (150, 285, 625, 785), "attire-principal.webp", 900)
crop_white("03.jpg", (118, 250, 632, 738), "attire-secondary.webp", 900)
crop_white("04.jpg", (190, 250, 575, 718), "attire-guests.webp", 760)
crop_white("04.jpg", (140, 796, 628, 852), "swatches-guests.webp", 900)

