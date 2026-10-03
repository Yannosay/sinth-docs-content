---
title: Typography Components
description: Heading, Paragraph, Lead, Code, etc.
---

Typography components for text content with semantic HTML output.

## Headings

### Heading

```sinth
Heading(level: 1) { "H1 Title" }
Heading(level: 2) { "H2 Title" }
Heading(level: 3) { "H3 Title" }
Heading(level: 4) { "H4 Title" }
Heading(level: 5) { "H5 Title" }
Heading(level: 6) { "H6 Title" }
```

Renders: `<h1>` through `<h6>`

**Attributes:**
- `level` (num, 1-6): Heading level (default: 1)

### SubHeading

```sinth
SubHeading { "Subtitle text" }
```

Renders: `<p class="subheading">`

## Paragraphs

### Paragraph

```sinth
Paragraph { "Regular paragraph text" }
```

Renders: `<p>`

### Lead

```sinth
Lead { "Lead paragraph - larger, emphasized text" }
```

Renders: `<p class="lead">`

### Small

```sinth
Small { "Fine print or disclaimer" }
```

Renders: `<small>`

## Text Formatting

### Strong

```sinth
Strong { "Bold text" }
```

Renders: `<strong>`

### Em

```sinth
Em { "Italic text" }
```

Renders: `<em>`

### Code (Inline)

```sinth
Paragraph { "Use " + Code { "const x = 1" } + " to declare" }
```

Renders: `<code>`

### Pre (Code Block)

```sinth
Pre {
  Code { "function hello() {\n  console.log('Hi')\n}" }
}
```

Renders: `<pre><code>`

### Blockquote

```sinth
Blockquote {
  Paragraph { "A wise quote from someone important" }
}
```

Renders: `<blockquote>`

### Mark

```sinth
Mark { "Highlighted text" }
```

Renders: `<mark>`

### Label

```sinth
Label { "Form label" }
```

Renders: `<label>`

## Semantic Elements

### Abbr

```sinth
Abbr(title: "HyperText Markup Language") { "HTML" }
```

Renders: `<abbr title="...">`

### Del

```sinth
Del { "Deleted text" }
```

Renders: `<del>`

### Ins

```sinth
Ins { "Inserted text" }
```

Renders: `<ins>`

### Sub

```sinth
Paragraph { "H" + Sub { "2" } + "O" }
```

Renders: `<sub>`

### Sup

```sinth
Paragraph { "x" + Sup { "2" } + " + y" }
```

Renders: `<sup>`

### Data

```sinth
Data(value: "12345") { "Product ID" }
```

Renders: `<data value="...">`

### Time

```sinth
Time(dateTime: "2024-01-15T10:30:00") { "Jan 15, 2024" }
```

Renders: `<time datetime="...">`

### Bdi

```sinth
Bdi { "Arabic: بسم الله الرحمن الرحيم" }
```

Renders: `<bdi>` (bi-directional isolation)

### Bdo

```sinth
Bdo(dir: "rtl") { "Right-to-left text" }
```

Renders: `<bdo dir="rtl">`

### Cite

```sinth
Cite { "Book Title" }
```

Renders: `<cite>`

### Dfn

```sinth
Dfn { "Term definition" }
```

Renders: `<dfn>`

### Kbd

```sinth
Kbd { "Ctrl" } + Kbd { "S" }  { " to save" }
```

Renders: `<kbd>`

### Samp

```sinth
Samp { "Error: File not found" }
```

Renders: `<samp>`

### Var

```sinth
Var { "x" }
```

Renders: `<var>`

### Address

```sinth
Address {
  "123 Main St\n"
  "City, State 12345"
}
```

Renders: `<address>`

### Ruby (Ruby Annotations)

```sinth
Ruby {
  "漢字"
  Rt { "かんじ" }
  Rp { "(" }
  Rp { ")" }
}
```

Renders: `<ruby><rt><rp>`

## Usage Examples

### Article Content

```sinth
Article {
  Heading(level: 1) { "Understanding Sinth" }
  
  Lead { "Sinth is a declarative UI language that compiles to HTML, CSS, and JavaScript." }
  
  Paragraph { "It combines the simplicity of HTML with the power of reactive programming." }
  
  Heading(level: 2) { "Key Features" }
  
  Paragraph { 
    "Sinth offers " + Strong { "reactive variables" } + ", " + 
    Em { "component composition" } + ", and " + 
    Code { "static typing" } + " out of the box."
  }
  
  Blockquote {
    Paragraph { "The best code is the code you don't have to write." }
  }
  
  Heading(level: 2) { "Code Example" }
  
  Pre {
    Code { 
      "var num count = 0\n" +
      "Button(onClick: count += 1) { \"Count: \" + count }"
    }
  }
}
```

### Documentation Style

```sinth
Section {
  Heading(level: 2) { "API Reference" }
  
  Dl {
    Dt { "var" }
    Dd { "Declares a reactive variable" }
    
    Dt { "component" }
    Dd { "Defines a reusable UI component" }
    
    Dt { "function" }
    Dd { "Defines a reusable logic function" }
  }
}
```

### Inline Code Documentation

```sinth
Paragraph { 
  "Use the " + Code { "model" } + " attribute for two-way binding on " + 
  Code { "Input" } + " and " + Code { "Textarea" } + " components."
}
```

## Styling

All typography components accept inline styles:

```sinth
Heading(level: 1, style: { color: "#1a1a2e", fontSize: "3rem" }) { "Title" }
Paragraph(style: { lineHeight: "1.8", color: "#333" }) { "Content" }
Code(style: { background: "#f4f4f4", padding: "0.2rem 0.4rem", borderRadius: "0.25rem" }) { "code" }
```

## Next Steps

- [Interactive Components](/docs/builtins/interactive)
- [Media Components](/docs/builtins/media)
- [Form Components](/docs/builtins/forms)