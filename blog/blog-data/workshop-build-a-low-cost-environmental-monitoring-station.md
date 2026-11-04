---
title: "Workshop: Build a Low-Cost Environmental Monitoring Station for Field Studies"
author: "AERM Editorial Team"
date: "2026-10-10"
category: "Workshop"
keywords:
  - workshop
  - environmental monitoring
  - DIY electronics
  - data logging
tags:
  - workshop
  - environmental-monitoring
  - diy-electronics
  - data-logging
description: "A safe educational workshop plan for assembling a basic temperature, humidity and light logging station."
featuredImage: ""
featured: true
draft: false
readingTime: auto
---

# Workshop: Build a Low-Cost Environmental Monitoring Station for Field Studies

This workshop introduces a modest environmental logger that records temperature, relative humidity and light level. The aim is not to build a paranormal detector. It is to teach sensor integration, timestamped data collection and validation using a repeatable project.

**Learning objectives.** Participants will identify sensor outputs, connect low-voltage modules safely, record data, inspect sensor stability and document limitations. The exercise is suitable for a supervised electronics workshop using a microcontroller development board.

**Suggested components.** A microcontroller board, a digital temperature-humidity sensor, a light sensor module, a real-time clock or reliable time source, a display or serial logger, suitable jumper wires, a breadboard and a USB power source. Select modules with published documentation. Avoid mains-powered circuits.

**Assembly overview.** Follow the board and sensor pinout documentation. Confirm voltage compatibility before connecting modules. Connect common ground and the appropriate power and signal pins. Inspect wiring before powering the board. Do not connect unknown modules based only on wire colour.

**Firmware workflow.** Read each sensor separately first. Add error handling for missing or invalid readings. Include units, timestamps and sensor identifiers in the output. Save raw values to a CSV file and avoid smoothing the data until the raw log has been preserved.

**Validation exercise.** Place the logger beside a reference thermometer-hygrometer for a stable period. Compare trends, not just one reading. Move the light sensor between shaded and illuminated conditions and record the response. Note warm-up time, sensor delay and any missing values.

**Safety.** Use only low-voltage USB power, avoid exposed mains wiring, keep liquids away from electronics and supervise soldering. If soldering is included, use ventilation, eye protection and a suitable work surface.

**Deliverables.** A wiring diagram, source code, component list, calibration/check log, sample CSV and a one-page limitations statement.

**Conclusion.** A useful workshop teaches participants to build, test and question an instrument. The most important output is not the device itself but a transparent record of what it measures and how reliably it performs.

## References and Further Reading

1. Microchip, microcontroller documentation and development resources.
2. Adafruit Learning System, sensor and data-logging tutorials.
3. NIST, measurement uncertainty and calibration resources.

## AERM Research and Reporting Checklist

Before publication, confirm that the report:
- States the question and the observation separately from any interpretation.
- Identifies the location and conditions at a level that respects privacy and safety.
- Records equipment, settings, placement and known limitations.
- Preserves original files and documents any processing.
- Describes controls, alternative explanations and unsuccessful tests.
- Reports uncertainty and avoids claims stronger than the evidence.
- Has permission for all identifiable recordings, quotations and images.

> **AERM Core Principle:** No anomaly is considered paranormal until environmental, psychological, technical, and scientific explanations have been systematically evaluated.

## About AERM

Anomalous Evidence Research & Media (AERM) is a research and media initiative focused on structured investigation, evidence preservation and public science communication. Through its research publication work and the Paranormal Frame platform, AERM aims to make complex scientific ideas accessible while maintaining a clear distinction between observation, interpretation and established evidence.

## Educational Disclaimer

This article is intended for education and research awareness. It is not a substitute for professional medical, engineering, electrical, legal, forensic or safety advice. Obtain appropriate permissions, follow applicable laws and standards, protect participant privacy, and consult qualified professionals whenever a task involves specialist risk.
