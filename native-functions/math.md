---
title: Math Functions
description: abs, min, max, sqrt, pow, random, trig, etc.
---

Complete mathematical functions available globally.

## Basic Math

```sinth
Math.abs(-5)        -- 5
Math.min(1, 5, 3)   -- 1
Math.max(1, 5, 3)   -- 5
Math.sign(-5)       -- -1
Math.sign(5)        -- 1
Math.sign(0)        -- 0
```

## Rounding

```sinth
Math.floor(3.7)     -- 3
Math.ceil(3.2)      -- 4
Math.round(3.5)     -- 4
Math.round(3.4)     -- 3
Math.trunc(3.7)     -- 3
Math.trunc(-3.7)    -- -3
```

## Powers & Roots

```sinth
Math.sqrt(16)       -- 4
Math.cbrt(27)       -- 3
Math.pow(2, 3)      -- 8
Math.pow(2, 0.5)    -- 1.414...
2 ** 3              -- 8 (operator)

Math.hypot(3, 4)    -- 5 (sqrt(3²+4²))
```

## Exponential & Logarithmic

```sinth
Math.exp(1)         -- 2.718... (e¹)
Math.expm1(1)       -- 1.718... (e¹ - 1)

Math.log(10)        -- 2.302... (ln 10)
Math.log10(100)     -- 2
Math.log2(8)        -- 3
Math.log1p(1)       -- 0.693... (ln(1+1))
```

## Trigonometry

```sinth
Math.sin(Math.PI / 2)   -- 1
Math.cos(0)             -- 1
Math.tan(Math.PI / 4)   -- 1

Math.asin(1)            -- 1.57... (π/2)
Math.acos(0)            -- 1.57... (π/2)
Math.atan(1)            -- 0.785... (π/4)
Math.atan2(1, 1)        -- 0.785... (π/4)

Math.sinh(1)            -- 1.175...
Math.cosh(1)            -- 1.543...
Math.tanh(1)            -- 0.761...
```

## Random

```sinth
Math.random()           -- 0 to 1 (exclusive)

-- Random integer between min and max (inclusive)
function randomInt(num min, num max) -> num {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

randomInt(1, 6)  -- Dice roll: 1-6

-- Random array element
function randomChoice(str[] arr) -> str {
  return arr[Math.floor(Math.random() * arr.length)]
}
```

## Constants

```sinth
Math.PI        -- 3.141592653589793
Math.E         -- 2.718281828459045
Math.LN2       -- 0.693...
Math.LN10      -- 2.302...
Math.LOG2E     -- 1.442...
Math.LOG10E    -- 0.434...
Math.SQRT1_2   -- 0.707...
Math.SQRT2     -- 1.414...
```

## Clamping & Normalization

```sinth
function clamp(num value, num min, num max) -> num {
  return Math.max(min, Math.min(max, value))
}

function lerp(num a, num b, num t) -> num {
  return a + (b - a) * clamp(t, 0, 1)
}

clamp(150, 0, 100)  -- 100
lerp(0, 100, 0.5)   -- 50
```

## Angle Conversion

```sinth
function degToRad(num deg) -> num {
  return deg * Math.PI / 180
}

function radToDeg(num rad) -> num {
  return rad * 180 / Math.PI
}

degToRad(180)  -- 3.14159 (π)
radToDeg(Math.PI)  -- 180
```

## Practical Examples

### Distance Calculation

```sinth
function distance(num x1, num y1, num x2, num y2) -> num {
  return Math.hypot(x2 - x1, y2 - y1)
}

distance(0, 0, 3, 4)  -- 5
```

### Random Color

```sinth
function randomColor() -> str {
  var str hex = "0123456789ABCDEF"
  var str color = "#"
  for (i in range(6)) {
    color += hex[Math.floor(Math.random() * 16)]
  }
  return color
}
```

### Easing Functions

```sinth
function easeInOutQuad(num t) -> num {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function easeOutBounce(num t) -> num {
  if (t < 1/2.75) return 7.5625 * t * t
  if (t < 2/2.75) return 7.5625 * (t - 1.5/2.75) ** 2 + 0.75
  if (t < 2.5/2.75) return 7.5625 * (t - 2.25/2.75) ** 2 + 0.9375
  return 7.5625 * (t - 2.625/2.75) ** 2 + 0.984375
}
```

## Best Practices

1. **Use constants** — `Math.PI` not `3.14`
2. **Compose functions** — Build complex from simple
3. **Handle edge cases** — Division by zero, domain errors
4. **Use operator `**`** — `2 ** 3` instead of `Math.pow(2, 3)`

## Next Steps

- [JSON & Parsing](/docs/native-functions/json)
- [Timers](/docs/native-functions/timers)
- [Random & UUID](/docs/native-functions/random)