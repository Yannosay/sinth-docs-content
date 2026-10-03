---
title: Media Components
description: Img, Video, Audio, Picture, etc.
---

Media components for embedding images, video, audio, and other media.

## Images

### Img

```sinth
Img(src: "image.jpg", alt: "Description")
Img(src: "logo.png", alt: "Logo", width: 200, height: 100)
Img(src: "photo.jpg", alt: "Photo", loading: "lazy")
```

**Attributes:**
- `src`: Image URL (required)
- `alt`: Alt text (required for accessibility)
- `width`, `height`: Dimensions
- `loading`: `"lazy"` | `"eager"` (default: `"eager"`)
- `decoding`: `"async"` | `"sync"` | `"auto"`
- `sizes`, `srcset`: Responsive images

### Logo

```sinth
Logo(src: "logo.svg", alt: "Company Logo")
```

Renders: `<img>` (void element)

### Picture (Responsive Images)

```sinth
Picture {
  Source(srcSet: "image.avif", type: "image/avif")
  Source(srcSet: "image.webp", type: "image/webp")
  Img(src: "image.jpg", alt: "Fallback")
}
```

### Source

```sinth
Source(srcSet: "image.webp", type: "image/webp")
Source(media: "(max-width: 600px)", srcSet: "small.jpg")
```

## Video

### Video

```sinth
Video(src: "video.mp4", controls: true, poster: "thumb.jpg")
Video(src: "video.mp4", controls: true, autoplay: true, muted: true, loop: true)
Video(controls: true) {
  Source(src: "video.mp4", type: "video/mp4")
  Source(src: "video.webm", type: "video/webm")
  "Your browser doesn't support video."
}
```

**Attributes:**
- `src`: Video URL
- `controls`: Show player controls
- `autoplay`: Auto-play (requires muted)
- `muted`: Start muted
- `loop`: Loop playback
- `poster`: Thumbnail image
- `preload`: `"auto"` | `"metadata"` | `"none"`
- `width`, `height`: Dimensions

## Audio

### Audio

```sinth
Audio(src: "audio.mp3", controls: true)
Audio(controls: true, autoplay: false, loop: true) {
  Source(src: "audio.mp3", type: "audio/mpeg")
  Source(src: "audio.ogg", type: "audio/ogg")
  "Your browser doesn't support audio."
}
```

## Figures & Captions

### Figure

```sinth
Figure {
  Img(src: "chart.png", alt: "Chart showing growth")
  Figcaption { "Figure 1: Quarterly growth 2024" }
}
```

### Figcaption

```sinth
Figcaption { "Caption text" }
```

## Canvas & SVG

### Canvas

```sinth
Canvas(id: "myCanvas", width: 400, height: 300)

script {
  function draw() {
    var canvas = document.getElementById("myCanvas")
    var ctx = canvas.getContext("2d")
    ctx.fillStyle = "#007bff"
    ctx.fillRect(10, 10, 100, 100)
  }
  draw()
}
```

### Svg

```sinth
Svg(viewBox: "0 0 100 100", width: 200, height: 200) {
  Circle(cx: 50, cy: 50, r: 40, fill: "#007bff")
  Rect(x: 10, y: 10, width: 80, height: 80, fill: "#28a745")
}
```

**Common SVG Shapes:**
```sinth
Circle(cx: 50, cy: 50, r: 40, fill: "blue")
Rect(x: 10, y: 10, width: 100, height: 50, fill: "red")
Ellipse(cx: 50, cy: 50, rx: 40, ry: 20, fill: "green")
Line(x1: 0, y1: 0, x2: 100, y2: 100, stroke: "black", strokeWidth: 2)
Polyline(points: "0,0 50,50 100,0", fill: "none", stroke: "blue")
Polygon(points: "50,0 100,50 50,100 0,50", fill: "purple")
Path(d: "M10 10 H 90 V 90 H 10 Z", fill: "orange")
Text(x: 50, y: 55, textAnchor: "middle", fill: "white") { "SVG" }
```

## Embedded Content

### IFrame

```sinth
IFrame(src: "https://example.com", width: 800, height: 600)
IFrame(src: "video.html", allowFullscreen: true)
IFrame(src: "https://maps.google.com/maps?q=...", title: "Map")
```

**Attributes:**
- `src`: Frame URL
- `width`, `height`: Dimensions
- `allowFullscreen`: Boolean
- `allow`: Permissions policy
- `loading`: `"lazy"` | `"eager"`
- `sandbox`: Security restrictions
- `title`: Accessibility title

### Object

```sinth
Object(data: "document.pdf", type: "application/pdf", width: 600, height: 400) {
  Paragraph { "PDF not supported. " + Link(href: "document.pdf") { "Download" } }
}
```

### Embed

```sinth
Embed(src: "video.mp4", type: "video/mp4", width: 640, height: 480)
```

## Maps & Areas

### Map

```sinth
Img(src: "map.jpg", alt: "Map", useMap: "#map1")
Map(name: "map1") {
  Area(shape: "rect", coords: "0,0,100,100", href: "/region1", alt: "Region 1")
  Area(shape: "circle", coords: "150,150,50", href: "/region2", alt: "Region 2")
  Area(shape: "poly", coords: "200,0,300,100,200,200", href: "/region3", alt: "Region 3")
}
```

### Area

```sinth
Area(
  shape: "rect" | "circle" | "poly" | "default",
  coords: "x1,y1,x2,y2",
  href: "/link",
  alt: "Description"
)
```

## Media Example Gallery

```sinth
page
Main {
  Section {
    Heading(level: 2) { "Image Gallery" }
    Div(class: "gallery") {
      Img(src: "img1.jpg", alt: "Image 1", loading: "lazy")
      Img(src: "img2.jpg", alt: "Image 2", loading: "lazy")
      Img(src: "img3.jpg", alt: "Image 3", loading: "lazy")
    }
  }
  
  Section {
    Heading(level: 2) { "Video Player" }
    Video(src: "demo.mp4", controls: true, poster: "thumb.jpg")
  }
  
  Section {
    Heading(level: 2) { "Audio Player" }
    Audio(src: "podcast.mp3", controls: true)
  }
  
  Section {
    Heading(level: 2) { "Canvas Drawing" }
    Canvas(id: "canvas", width: 400, height: 300)
  }
  
  Section {
    Heading(level: 2) { "Embedded Map" }
    IFrame(src: "https://www.openstreetmap.org/export/embed.html", width: "100%", height: 400)
  }
}

style {
  .gallery { display: "grid"; gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"; gap: "1rem"; }
  .gallery img { width: "100%"; height: "auto"; borderRadius: "0.5rem"; }
  video, audio { width: "100%"; maxWidth: "600px"; }
  canvas { border: "1px solid #ccc"; borderRadius: "0.5rem"; }
}
```

## Responsive Images

```sinth
Picture {
  Source(media: "(max-width: 480px)", srcSet: "image-480w.jpg")
  Source(media: "(max-width: 768px)", srcSet: "image-768w.jpg")
  Source(media: "(max-width: 1200px)", srcSet: "image-1200w.jpg")
  Img(src: "image-1920w.jpg", alt: "Responsive image")
}
```

## Lazy Loading

```sinth
Img(src: "large-image.jpg", alt: "Description", loading: "lazy")
Video(src: "video.mp4", controls: true, preload: "none")
```

## Accessibility

Always provide:
- `alt` for images (empty `alt=""` for decorative)
- `controls` for video/audio
- `track` for captions/subtitles

```sinth
Video(controls: true) {
  Source(src: "video.mp4", type: "video/mp4")
  Track(kind: "captions", src: "captions.vtt", srclang: "en", label: "English", default: true)
}
```

## Next Steps

- [Layout Components](/docs/builtins/layout)
- [Form Components](/docs/builtins/forms)
- [Interactive Components](/docs/builtins/interactive)