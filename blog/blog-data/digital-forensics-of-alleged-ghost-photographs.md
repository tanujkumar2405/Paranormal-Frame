---
title: "The Ghost Photograph Investigation: A Digital Forensics Guide to Detecting Image Manipulation"
author: AERM Editorial Team
date: 2026-10-01
category: Digital Forensics
keywords:
  - Digital Forensics
  - Ghost Photographs
  - Image Forensics
  - Metadata Analysis
  - EXIF Data
  - Image Manipulation
  - Paranormal Investigation
  - AERM
tags:
  - Digital Forensics
  - Photography
  - Image Analysis
  - Evidence Verification
  - Scientific Investigation
  - Technology
description: "A practical, evidence-based guide to examining alleged ghost photographs through original-file preservation, metadata review, image geometry, lighting analysis, compression artefacts, and transparent reporting."
featuredImage: digital-forensics-of-alleged-ghost-photographs.webp
featured: true
draft: false
readingTime: auto
---

# The Ghost Photograph Investigation: A Digital Forensics Guide to Detecting Image Manipulation

A photograph arrives in an investigator's inbox. In the far corner of the frame, a pale human-like shape appears to stand beside a doorway. The person who took the picture says nobody was there. The image has already been shared across social media, where some viewers call it a spirit and others claim it is an obvious edit.

What can an investigator actually establish from the file?

A photograph can be compelling, but a visual impression is not the same as proof. A pale shape might be a person, reflection, lens flare, motion blur, fabric, dust close to the lens, a long exposure, an image-processing artefact, or a deliberate composite. Sometimes the available image simply does not contain enough information to decide.

Digital forensics offers a disciplined way to examine such material. It does not provide a magic button that labels an image “real” or “fake.” Instead, it helps investigators preserve the original, examine how the image was created and handled, identify inconsistencies, test possible explanations, and communicate the limits of their findings.

This guide introduces a practical workflow for AERM-style examination of alleged ghost photographs.

## 1. What Is Digital Image Forensics?

Digital image forensics is the examination of digital images to understand their origin, integrity, processing history, and visual content.

In an investigation, the key questions may include:

- Is this the original image file or a copy?
- What device or software may have created it?
- Has the file been resized, recompressed, edited, or exported?
- Are there visual features consistent with compositing or retouching?
- Can the apparent figure be explained by lighting, reflections, perspective, or motion?
- Is there enough information to support a reliable conclusion?

These questions are related, but they are not interchangeable. For example, finding that an image was edited does not automatically mean that the alleged figure was fabricated. A photograph may have been cropped or adjusted for ordinary reasons. Likewise, failing to detect editing does not prove that the photographed subject was paranormal.

**The purpose of image forensics is to assess the integrity and interpretation of the image—not to identify a supernatural cause.**

## 2. Start With the Original File

The most important step is often the least exciting: obtain and preserve the original file.

A screenshot of a photograph shared through a messaging application is not equivalent to the original camera file. Social platforms and messaging services may resize images, recompress them, strip metadata, change colour information, or convert file formats.

Whenever possible, request:

- The original image directly from the camera or phone.
- The complete, unedited file rather than a screenshot.
- Other photographs taken immediately before and after the image.
- A short account of when, where, and how it was captured.
- Information about any editing, filters, or sharing that occurred.
- Permission to examine and securely store the file.

### 2.1 Preserve the received file

Create a working copy and do not edit the evidence file. Record when it was received, who supplied it, how it was transferred, and any known handling history.

A cryptographic hash can help identify whether a file has changed since it was acquired. Common choices include SHA-256 and SHA-512.

On Windows PowerShell:

```powershell
Get-FileHash ".\alleged-ghost-photo.jpg" -Algorithm SHA256
```

On Linux:

```bash
sha256sum alleged-ghost-photo.jpg
```

Save the output in the case notes. If the file is acquired again later, calculate its hash and compare the values.

A matching hash indicates that the compared files are byte-for-byte identical. It does not establish that the image was genuine when originally captured, nor does it prove that the camera recorded an external apparition.

### 2.2 Maintain an evidence log

| Field | Information to record |
|---|---|
| Case ID | Unique investigation reference |
| Evidence ID | Unique image reference |
| Original filename | Filename as received |
| File format | JPEG, HEIC, PNG, RAW, etc. |
| File size | Size in bytes |
| Date received | Date and time of acquisition |
| Source | Person or organisation supplying it |
| Transfer method | Direct cable, memory card, email, messaging app, etc. |
| SHA-256 | Hash calculated after acquisition |
| Handling history | Every copy, transfer, or processing step |
| Analyst | Person conducting the examination |

For sensitive cases, restrict access to the original and maintain a separate analysis copy.

## 3. Understand Image Metadata

Many digital photographs contain metadata: information stored alongside the image data.

A common metadata standard is EXIF (Exchangeable Image File Format). Depending on the camera and settings, EXIF may include:

- Camera or phone manufacturer and model.
- Date and time recorded by the device.
- Exposure time.
- ISO sensitivity.
- Focal length.
- Aperture value.
- Flash status.
- Image dimensions.
- Orientation.
- Software information.

Some files may also contain GPS coordinates, serial numbers, thumbnails, or other identifying information. Handle such data carefully and do not publish private location or device details without permission.

### 3.1 Inspecting metadata with ExifTool

ExifTool is a widely used utility for reading metadata from many image formats.

Example:

```bash
exiftool alleged-ghost-photo.jpg
```

To display selected fields:

```bash
exiftool -DateTimeOriginal -Make -Model -ExposureTime -ISO -FocalLength alleged-ghost-photo.jpg
```

To produce a hash alongside metadata:

```bash
exiftool -FileName -FileSize -FileType -ImageWidth -ImageHeight alleged-ghost-photo.jpg
```

Metadata can provide useful context, but it has limitations:

- Metadata can be edited or removed.
- A date field may reflect an incorrectly set device clock.
- Software information may identify an export or editing application, not the full editing history.
- A file without EXIF data is not automatically suspicious.
- Metadata can be copied from one image to another.

Treat metadata as supporting information, not as proof of authenticity.

## 4. Check the Image's History and Provenance

Before analysing pixels, establish where the image came from.

Ask the person who supplied it:

1. Which device captured the photograph?
2. Was the image edited or filtered?
3. Was it transferred through a messaging or social media platform?
4. Is the original still available on the capture device?
5. Were other photographs taken from the same position?
6. Was the image cropped before it was shared?
7. Has anyone else handled or modified the file?

If the image has circulated online, record where it was found and whether earlier versions are available. Reverse image search may help locate earlier appearances, but a match does not automatically identify the original photographer or prove manipulation.

A useful provenance record distinguishes what is known directly from what has merely been reported.

For example:

> The image was supplied by the witness through a messaging application. The camera-original file was not available at the time of examination. The supplied copy may have been resized or recompressed. Conclusions about the original capture file are therefore limited.

## 5. Visual Examination: What Should Investigators Look For?

Visual inspection is a starting point, not a verdict. An investigator should examine the entire image before concentrating on the alleged figure.

### 5.1 Edges and boundaries

A pasted object may have boundaries that differ from the surrounding scene. Look for:

- Unnatural sharpness or softness around an object.
- A visible cut-out outline.
- Inconsistent blur.
- Jagged edges that do not match the image's normal detail.
- A halo around a region that may have been selected or masked.

However, genuine objects can also have unusual edges because of low resolution, focus, movement, compression, or strong contrast.

### 5.2 Lighting and shadows

Objects in the same scene should generally be consistent with the illumination reaching them.

Consider:

- Direction of the main light source.
- Shadow direction and softness.
- Brightness relative to nearby objects.
- Reflections from windows or polished surfaces.
- Whether the apparent figure is illuminated in a way consistent with the room.

A lighting inconsistency may justify further examination, but it is not sufficient by itself to establish editing. Multiple light sources, reflections, automatic exposure, and local processing can complicate interpretation.

### 5.3 Perspective and scale

Check whether the apparent figure's size and position are consistent with the room's geometry.

Questions include:

- Does the object align with the floor, walls, and door frames?
- Is its apparent size plausible at that distance?
- Does it overlap other objects in a physically plausible way?
- Could a reflection or object near the camera create the apparent shape?

A shape close to the lens can appear very different from an object farther away. Without a known camera position and scene layout, perspective judgments may be uncertain.

### 5.4 Focus and motion blur

A photograph may contain blurred objects because of:

- Camera movement.
- Subject movement.
- Long exposure.
- Shallow depth of field.
- Autofocus errors.
- Low light and high ISO.
- Computational image processing.

A blurred region can resemble a human outline. Compare its blur direction and character with other moving or out-of-focus elements in the same frame.

### 5.5 Reflections and transparent surfaces

Windows, mirrors, glass doors, glossy furniture, and polished floors can create overlapping images.

A reflected person, lamp, vehicle light, or object outside the room may appear to occupy an unexpected position. Check the camera's likely angle and the surfaces visible in the scene.

## 6. Common Photographic Effects That Can Resemble Apparitions

Not every unusual shape is the result of digital manipulation. Many effects occur during image capture.

<AsyncImage query="photography lens flare light artifacts night photograph example" aspectRatio="16:9" width="100%" />

### Lens flare

Bright light entering the lens can produce spots, streaks, rings, or polygonal shapes. These artefacts may appear far from the light source in the frame.

Check whether a bright lamp, torch, vehicle headlight, or other source is positioned in or near the field of view.

### Dust, moisture, and particles near the lens

Dust, insects, droplets, or other particles close to the camera may be illuminated by flash or another light source. Because they are close to the lens and out of focus, they can appear as bright circles or translucent shapes.

A photograph of an orb-like feature does not, by itself, establish that the object is paranormal.

### Long exposure and motion blur

When the shutter remains open for a relatively long time, movement during the exposure can create streaks, translucent forms, or overlapping positions.

A moving person may appear partially transparent if the background is recorded during part of the exposure and the person occupies the frame during another part.

### High ISO and image noise

In low light, cameras may increase ISO sensitivity. This can make noise more visible, particularly in darker areas. Denoising and sharpening may then alter fine details.

Random noise can create small patterns that appear meaningful when viewed at high magnification.

### Computational photography

Modern phones may combine multiple frames, adjust local brightness, sharpen details, reduce noise, or use computational methods to create the final image.

These processes are designed to improve ordinary photographs, but they can make the relationship between the final image and a single moment of sensor capture more complicated.

Record the device model and capture mode where possible.

## 7. Image Compression and Digital Artefacts

JPEG is a lossy image format. It reduces file size by discarding some image information. Repeated saving and recompression can introduce visible artefacts, especially around edges and fine details.

Possible signs include:

- Block-like patterns.
- Ringing around high-contrast edges.
- Blurring of fine detail.
- Colour distortions.
- Uneven texture in smooth areas.

These artefacts may be mistaken for unusual shapes, especially in dark or low-resolution images.

An image that has been shared through several services may have been compressed more than once. That history can make detailed forensic interpretation difficult.

Do not treat JPEG artefacts as evidence of deliberate forgery. They can arise during ordinary image handling.

## 8. Error Level Analysis: Useful Clue, Not a Lie Detector

Error Level Analysis (ELA) is a technique commonly used to visualise differences in JPEG compression behaviour.

A simplified workflow recompresses an image at a chosen quality level and examines the differences between the recompressed version and the supplied image. Regions with different compression characteristics may appear brighter or otherwise distinct in an ELA visualisation.

ELA has important limitations:

- Different cameras and editing tools produce different compression patterns.
- A region can differ because of texture, colour, noise, or previous compression.
- A genuine image may contain uneven ELA patterns.
- A manipulated image may not produce an obvious or unique ELA signature.
- Resizing, recompression, and platform processing can make results harder to interpret.

ELA should never be used as a standalone test that declares a photograph genuine or fake. It is, at most, one clue to consider alongside provenance, metadata, visual examination, and other available evidence.

## 9. A Practical Digital Forensics Toolkit

The following tools can support a basic image examination. Use them on working copies and document the versions and settings used.

| Tool | Main purpose | Important limitation |
|---|---|---|
| ExifTool | Read and inspect metadata | Metadata may be missing, altered, or copied |
| GIMP | Visual inspection and image editing | Editing capability does not make it an authentication tool |
| ImageMagick | Image properties, conversion, and pixel-level operations | Conversion may alter the file |
| Python Pillow | Programmatic image inspection | Results depend on the code and input file |
| OpenCV | Image processing and computer-vision analysis | Algorithms can introduce artefacts or misleading results |
| Forensically | Browser-based image-forensics visualisations | Visualisations are indicators, not definitive proof |
| SHA-256 utilities | File integrity checking | Hashes establish file identity, not original authenticity |

### Basic image information with Python

The following example reads an image's dimensions and format without modifying the original file.

```python
from PIL import Image

image_path = "alleged-ghost-photo.jpg"

with Image.open(image_path) as img:
    print("Format:", img.format)
    print("Dimensions:", img.size)
    print("Colour mode:", img.mode)
```

Install Pillow if required:

```bash
python -m pip install Pillow
```

This script reports basic image properties. It does not detect manipulation or determine whether a figure is genuine.

### Generate a SHA-256 hash with Python

```python
import hashlib

image_path = "alleged-ghost-photo.jpg"
sha256 = hashlib.sha256()

with open(image_path, "rb") as file:
    for chunk in iter(lambda: file.read(1024 * 1024), b""):
        sha256.update(chunk)

print("SHA-256:", sha256.hexdigest())
```

The hash can be stored in the evidence log and used later to check whether the file has changed.

## 10. AERM Workflow for Examining an Alleged Ghost Photograph

A consistent workflow helps investigators avoid jumping from a striking image to a dramatic conclusion.

### Stage 1: Acquisition

- Obtain the original file whenever possible.
- Record the source and transfer method.
- Preserve the supplied file without editing it.
- Calculate a cryptographic hash.
- Record any known sharing or processing history.

### Stage 2: Context and provenance

- Interview the photographer using neutral questions.
- Record the device, location, approximate time, and capture conditions.
- Request adjacent photographs or video if available.
- Establish whether filters, edits, or platform transfers occurred.
- Separate confirmed facts from statements that cannot be independently verified.

### Stage 3: Technical examination

- Identify file format, dimensions, and metadata.
- Review the image at normal scale before magnifying details.
- Examine lighting, perspective, reflections, focus, and motion.
- Consider compression and computational photography.
- Use forensic visualisation tools only as supporting methods.

### Stage 4: Alternative explanations

Develop and test plausible explanations, such as:

- A person or object in the scene.
- A reflection.
- Lens flare.
- Dust, moisture, or an insect near the lens.
- Motion blur or long exposure.
- Low-light sensor noise.
- Computational image processing.
- Deliberate editing or compositing.

Do not assume that the first plausible explanation is correct. Record what evidence supports or weakens each possibility.

### Stage 5: Independent review

Where practical, have another reviewer examine the image without being told the proposed paranormal interpretation.

Ask reviewers to describe the unusual feature in their own words. Compare observations only after they have been recorded.

### Stage 6: Reporting

State:

- What file was examined.
- Whether it was an original or a derivative copy.
- Which methods and tools were used.
- What was observed.
- Which explanations were considered.
- What could not be established.
- Whether further material is required.

A report should not use “authentic ghost photograph” or “proven fake” unless the evidence genuinely supports that precise claim. In many cases, the appropriate finding will be that the image is inconclusive.

## 11. Example Case: A Figure in an Abandoned Corridor

Consider a hypothetical photograph taken in a dark corridor. A pale, human-shaped region appears near a doorway.

The photographer reports that the corridor was empty and believes the shape appeared unexpectedly.

A disciplined examination might proceed as follows:

**Initial observation:** The supplied image contains a pale region with a roughly human-like outline. This describes the visible feature, not its cause.

**File review:** The investigator obtains the original camera file, calculates its hash, and records its metadata. The file shows a long exposure setting, but the device clock has not been independently verified.

**Scene review:** The photographer provides another image taken from a similar position. A reflective surface is visible near the doorway.

**Technical review:** The investigator compares the apparent figure's position with the reflective surface, examines the lighting, and checks for motion blur. The image is also reviewed for signs of recompression.

**Finding:** The available material is insufficient to determine whether the shape is a reflection, a moving object, an exposure artefact, or another source. No evidence establishes a paranormal origin.

This is a useful result. It identifies what was examined, what remains plausible, and what additional evidence would be needed.

## 12. What Digital Forensics Can—and Cannot—Prove

Digital image forensics can help establish whether a file has changed since a known acquisition point, reveal metadata, identify some forms of editing, and assess whether visual features are consistent with ordinary photographic effects.

It cannot guarantee that every manipulation will be detected. It cannot reconstruct missing capture history with certainty. It cannot prove that an unexplained shape is a ghost.

Likewise, an image that contains no obvious signs of editing is not automatically an authentic record of an external event. The camera may have captured a reflection, an ordinary person, a natural optical effect, or an object that the photographer did not notice.

The most defensible conclusion is often narrower than the original claim.

## 13. Ethical and Privacy Considerations

Photographs may contain identifiable people, private property, location data, or sensitive details.

Before examining or publishing an image:

- Obtain appropriate permission from the person who supplied it.
- Avoid publishing GPS coordinates or identifying metadata unnecessarily.
- Protect faces and other identifying details where appropriate.
- Do not accuse someone of fraud based solely on an inconclusive technical indicator.
- Preserve the distinction between an honest mistake, an edited image, and deliberate deception.
- Explain uncertainty in language that a general reader can understand.

AERM should not publish a witness's image or personal details simply because the photograph is interesting.

## 14. AERM Research Perspective

An unusual photograph is a starting point for investigation, not a conclusion.

AERM's approach is to preserve the original evidence, establish its provenance, examine the technical properties of the file, study the photographic environment, and consider ordinary explanations before making a claim.

The presence of an unexplained shape does not establish that a spirit was photographed. A metadata field or forensic visualisation does not settle the question by itself. Conclusions must reflect the quality and limits of the available evidence.

> **No anomaly is considered paranormal until environmental, psychological, technical, and scientific explanations have been systematically evaluated.**

Digital forensics strengthens an investigation when it is used carefully, transparently, and with a clear understanding of its limitations.

## Conclusion

Alleged ghost photographs can be fascinating, but they are also easy to misinterpret. Reflections, lens flare, particles near the camera, motion blur, long exposures, low-light noise, compression, and computational photography can all produce unexpected visual features. Deliberate manipulation is another possibility, but it should be investigated rather than assumed.

A responsible examination begins with the original file and a clear record of its history. Metadata, hashes, visual inspection, and forensic tools can provide useful information, but no single test can certify a photograph as paranormal or guarantee that manipulation has been detected.

For AERM, the standard is straightforward: preserve the evidence, document every step, test alternative explanations, protect the people involved, and report only what the image can support.

An inconclusive photograph is not a failure. It is a finding that respects the evidence.

---

## References and Further Reading

The following resources provide technical background on digital image integrity, metadata, image processing, and forensic analysis. Verify the current editions and documentation before citing them in formal research.

1. Farid, H. (2009). *Exposing Digital Forgeries*. IEEE Signal Processing Magazine, 26(2), 16–25.
2. Farid, H. (2016). *Photo Forensics*. MIT Press.
3. International Organization for Standardization. (2012). *ISO/IEC 27037:2012 — Guidelines for Identification, Collection, Acquisition and Preservation of Digital Evidence*. ISO/IEC.
4. Krawetz, N. (2007). A Picture's Worth: Digital Image Analysis and Forensics. *Black Hat Briefings*.
5. National Institute of Standards and Technology. *Digital Forensics and Multimedia Evidence* resources. NIST.
6. ExifTool. *ExifTool Documentation*. https://exiftool.org/
7. ImageMagick. *ImageMagick Documentation*. https://imagemagick.org/

## About AERM

**Anomalous Evidence Research & Media (AERM)** is an independent research and media initiative focused on the systematic documentation and evaluation of unusual reports. Its approach combines environmental assessment, witness documentation, scientific reasoning, and evidence analysis.

AERM does not treat an unusual photograph or unexplained visual feature as proof of a paranormal cause. Each report should be evaluated against plausible environmental, photographic, psychological, and technical explanations.

*Educational disclaimer: This article is for general educational and research-awareness purposes. It is not a formal forensic certification or legal opinion. Preserve original evidence, obtain permission before examining or publishing private material, and consult a qualified digital-forensics professional when findings may be used in legal or disciplinary proceedings.*
