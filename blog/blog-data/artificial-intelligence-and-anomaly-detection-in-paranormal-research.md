---
title: "Can Artificial Intelligence Identify Anomalies in Paranormal Recordings? Possibilities, Algorithms and Limitations"
author: "AERM Editorial Team"
date: "2026-10-22"
category: "Artificial Intelligence & Technology"
keywords:
  - artificial intelligence
  - machine learning
  - anomaly detection
  - paranormal research
  - audio analysis
  - video analysis
  - signal processing
  - computer vision
  - evidence verification
tags:
  - Artificial Intelligence
  - Machine Learning
  - Evidence Analysis
  - Digital Forensics
  - Investigation Technology
description: "An evidence-focused guide to using AI and machine learning to examine unusual audio, video and sensor data—what these systems can detect, how to validate their outputs, and why an AI alert is not proof of a paranormal event."
featuredImage: ""
featured: true
draft: false
readingTime: auto
---

# Can Artificial Intelligence Identify Anomalies in Paranormal Recordings? Possibilities, Algorithms and Limitations

Imagine reviewing six hours of investigation footage. At 02:17, a camera records a brief change in brightness. A few minutes later, an audio recorder captures a faint sound that resembles a syllable. An environmental sensor logs a short-lived fluctuation.

Finding these moments manually can take hours. Artificial intelligence (AI) offers tools that may help investigators search large recordings, identify unusual patterns and organise evidence for closer review.

But an important distinction must be made: **an AI system can identify data that differs from a model's expectations; it cannot independently establish that the difference has a paranormal cause.**

A machine-learning model may flag an unusual sound, an unexpected movement, a sudden change in an image or a sensor reading outside a learned pattern. The alert is a starting point for investigation—not a verdict.

This article explores how AI-based anomaly detection works, where it may assist paranormal research, how to test its reliability, and what investigators should avoid claiming.

## 1. What Does "Anomaly" Mean in Artificial Intelligence?

In machine learning, an anomaly is generally a data point, sequence or pattern that differs significantly from an established reference pattern.

The reference may be created from:

- A dataset of previously observed normal activity.
- A statistical model of expected values.
- A set of labelled examples.
- A model trained to reconstruct ordinary data.
- A defined rule or threshold.

For example, suppose a temperature sensor records readings every second. If readings usually remain between 19°C and 22°C, a sudden reading of 30°C may be flagged for review.

The system has identified an unusual value relative to its reference. It has not determined why the value occurred. Possible explanations include a genuine environmental change, sensor placement, a device fault, a data transmission error or an incorrect baseline.

The same principle applies to paranormal investigation data.

| Data type | Possible AI alert | What the alert actually means |
|---|---|---|
| Audio | An unusual sound segment | The sound differs from the model's reference patterns |
| Video | Unexpected movement | A visual pattern changed or an object detector found something |
| Thermal imagery | A region with unusual apparent temperature | Pixel values or a thermal pattern differ from the reference |
| EMF readings | A sudden measurement spike | The recorded value changed beyond a chosen threshold |
| Environmental data | An unusual combination of readings | The input pattern is uncommon within the model's reference data |

The word *anomaly* describes a relationship between data and a reference. It does not automatically describe the physical cause.

## 2. The Difference Between Anomaly Detection and Paranormal Detection

These terms should never be treated as interchangeable.

**Anomaly detection** asks:

> Does this observation differ from the pattern or baseline used by the system?

**Paranormal detection** would require a much stronger claim:

> Does this observation demonstrate an event that cannot be adequately explained by known natural, environmental, psychological or technical causes?

A conventional anomaly-detection model is not designed to answer the second question. It usually has no scientifically validated category for "paranormal activity," and there is no universally accepted, representative dataset of verified paranormal events on which to train such a classifier.

A model trained on ordinary building sounds might identify an unfamiliar sound. That does not mean it has recognised a spirit voice. A video model may flag an object moving through a dark frame. That does not mean it has identified an apparition.

AERM therefore recommends using language such as:

- "AI-flagged audio segment"
- "Unusual visual change"
- "Sensor reading outside the recorded baseline"
- "Candidate event requiring human review"

Avoid statements such as "AI confirmed a ghost" or "the algorithm detected a spirit."

## 3. How AI-Based Anomaly Detection Works

There are several broad approaches to anomaly detection. The appropriate method depends on the type of data, the amount of available training data and the question being investigated.

### 3.1 Rule-based detection

The simplest approach uses predefined conditions.

For example:

- Flag audio segments above a chosen amplitude.
- Flag a temperature change greater than a specified amount.
- Flag video frames with a large difference from the previous frame.
- Flag sensor readings outside a defined range.

Rule-based systems are relatively easy to understand and reproduce. However, thresholds must be chosen carefully. A threshold that is too sensitive creates many false alerts; one that is too broad may miss events worth reviewing.

A threshold is not an AI discovery. It is a rule chosen by the investigator.

### 3.2 Statistical anomaly detection

Statistical methods estimate what is typical in a dataset and identify observations that are unusually far from that reference.

Common techniques include:

- **Z-scores:** express how far a value is from the mean in standard-deviation units, when the assumptions of the calculation are appropriate.
- **Interquartile range (IQR):** identifies values unusually distant from the middle portion of a distribution.
- **Control charts:** help identify changes or patterns in a process over time.
- **Change-point detection:** estimates where the statistical behaviour of a time series changes.

These methods can be useful for environmental and instrument data. Their results depend on the quality of the baseline, the stability of the measurement process and the assumptions behind the chosen method.

### 3.3 Unsupervised learning

Unsupervised learning looks for structure in data without requiring every example to have a human-provided label.

Some methods used for anomaly detection include:

- **Isolation Forest:** isolates observations through random partitioning; unusual observations may be isolated in fewer steps.
- **Local Outlier Factor (LOF):** compares the local density of a sample with the density around its neighbours.
- **Clustering methods:** identify groups of similar observations and may flag points that do not fit well into any group.

These approaches can help explore large datasets when labelled examples are scarce. But "unusual compared with this dataset" is not the same as "unusual in the real world." A poorly collected dataset can make ordinary conditions appear exceptional.

### 3.4 Neural-network approaches

Neural networks can learn complex patterns in audio, images and time-series data.

One approach is an **autoencoder**. It is trained to compress input data into a smaller representation and reconstruct it. If the model reconstructs familiar patterns accurately but performs poorly on a different pattern, the reconstruction error may be used as an anomaly score.

Other approaches include recurrent neural networks, convolutional networks and transformer-based models. Their usefulness depends on the training data, model design, validation procedure and the way outputs are interpreted.

A high reconstruction error does not reveal the cause of an event. It indicates that the input was difficult for that model to reconstruct.

## 4. AI for Audio Analysis: Searching for Unusual Sounds

Audio is one of the most promising areas for AI-assisted evidence review because long recordings can contain thousands of seconds of material.

Potential tasks include:

- Detecting sudden changes in loudness.
- Dividing recordings into sound events.
- Identifying speech-like segments for human review.
- Detecting clipping, distortion or unusual background noise.
- Comparing recordings from different microphones or locations.
- Creating searchable transcripts, with uncertainty clearly retained.

### 4.1 Voice activity detection

Voice activity detection (VAD) attempts to identify portions of an audio signal that may contain speech.

It can help narrow a long recording to candidate speech segments. However, a VAD system may also respond to music, machinery, animal sounds or other signals with speech-like characteristics.

A segment labelled as "speech" is not necessarily intelligible speech, and intelligible speech is not necessarily evidence of an unexplained source.

### 4.2 Sound event classification

Audio classification models may assign labels such as:

- Human speech
- Footsteps
- Animal vocalisation
- Door or impact sound
- Mechanical noise
- Wind or environmental noise

These labels are model predictions. Their reliability depends on the classes represented in the training data and how similar the field recording is to that data.

A model may confidently assign an incorrect label when it encounters an unfamiliar sound. Investigators should preserve the original recording and listen to the relevant segment in context.

### 4.3 Speech recognition and transcription

Automatic speech recognition (ASR) converts speech-like audio into text. It can help organise recordings, but low-quality or ambiguous audio can produce hallucinated words, substitutions and omissions.

A transcription should never be treated as proof that the displayed words were actually spoken. The original waveform must remain available for independent listening and technical review.

### 4.4 Spectrogram analysis

A spectrogram represents how the frequency content of an audio signal changes over time. AI tools can analyse spectrograms, but investigators can also inspect them using conventional signal-processing software.

A spectrogram may help reveal:

- Continuous electrical hum.
- Narrowband tones.
- Broadband noise.
- Repeated mechanical patterns.
- Clipping or other recording artefacts.
- Changes in frequency content around a reported event.

It does not identify a sound's source by itself. Interpretation requires the original audio, recording context and plausible source checks.

## 5. AI for Video Analysis: Movement, Objects and Visual Changes

Video investigations often involve fixed cameras operating for long periods. AI can help identify candidate frames or events for review.

### 5.1 Motion detection

Basic motion detection compares consecutive frames or estimates changes in image regions.

It may flag:

- A person entering the frame.
- A moving object.
- A sudden lighting change.
- Insects or dust passing close to the lens.
- Changes caused by camera vibration.

The system may also flag shadows, compression artefacts, exposure changes, moving foliage or reflections.

### 5.2 Object detection

Object-detection models identify and locate objects belonging to classes represented in their training data. Depending on the model, these may include people, animals, vehicles or common household objects.

A model may draw a bounding box around a shape it considers person-like. In low light, partial occlusion or unusual camera angles, the prediction may be wrong.

A bounding box is a model output, not proof that the object exists as interpreted.

### 5.3 Background subtraction

Background-subtraction methods estimate a relatively stable scene and identify pixels that differ from it. This can help detect movement in a fixed-camera recording.

However, changes in illumination, moving shadows, rain, insects, foliage and camera instability can all produce foreground detections.

### 5.4 Optical flow

Optical flow estimates apparent motion between image frames. It can help identify movement patterns, but apparent motion may be caused by camera movement, changing light, reflections or other image effects.

For reliable analysis, investigators should document camera position, frame rate, exposure, focus, infrared illumination, compression and any changes made during recording.

## 6. AI for Sensor and Environmental Data

Paranormal investigations may use multiple instruments, such as temperature sensors, humidity meters, sound-level meters and electromagnetic field meters.

AI can assist with time-series analysis when measurements are collected consistently and accompanied by adequate metadata.

Potential uses include:

- Detecting sudden changes in a measurement.
- Identifying repeating cycles.
- Comparing readings across locations.
- Finding correlations between different sensor streams.
- Flagging missing, duplicated or inconsistent records.
- Identifying periods that require manual review.

### Why synchronisation matters

Suppose an audio recorder captures a sound at 01:42:10, while an environmental sensor records a temperature change at 01:42:13. If the devices have unsynchronised clocks, the apparent relationship may be misleading.

Before comparing data streams, investigators should:

1. Synchronise device clocks to a documented reference where possible.
2. Record each device's time zone and clock offset.
3. Preserve original timestamps.
4. Document sampling rates and measurement intervals.
5. Record sensor placement and operating settings.
6. Note missing data and any manual adjustments.

A correlation between two readings does not establish that one caused the other. It may be coincidental or explained by a third variable.

## 7. A Multi-Modal AI System: Combining Audio, Video and Sensor Data

A multi-modal system analyses more than one type of data. In principle, an investigation platform could combine:

- Audio event timestamps.
- Video motion alerts.
- Temperature readings.
- Humidity measurements.
- Sound-level measurements.
- Electromagnetic field readings.
- Investigator field notes.

The system could then create a timeline of candidate events.

For example, it might flag a 12-second audio segment, identify movement in a nearby camera frame and show that a temperature sensor changed during the same period.

This is useful for directing human attention. It does not automatically establish that the events share a common cause.

AERM recommends a staged approach:

1. Analyse each data stream independently.
2. Validate timestamps and device settings.
3. Identify candidate events without assigning paranormal labels.
4. Compare events across devices.
5. Check environmental and technical explanations.
6. Review the original recordings and measurements.
7. Document what remains uncertain.

Combining weak or unreliable signals does not automatically produce strong evidence. A multi-modal system can amplify errors if each input is poorly calibrated or incorrectly interpreted.

## 8. The Biggest Challenge: Training Data

Machine-learning systems learn patterns from data. Their performance is limited by the quality, quantity and representativeness of that data.

For paranormal research, several difficulties arise.

### 8.1 No universally verified paranormal dataset

There is no broadly accepted, independently verified dataset that represents confirmed paranormal audio, video or sensor events. Without such a dataset, a model cannot be reliably trained to distinguish paranormal events from ordinary ones.

A collection of recordings labelled "ghost voices" by uploaders is not a verified ground-truth dataset. The labels may reflect belief, expectation or interpretation rather than an established source.

### 8.2 Class imbalance

A dataset may contain thousands of ordinary sounds but very few examples of a particular event type. This can make model evaluation misleading.

A model that predicts "ordinary background" for every recording might achieve high overall accuracy in a dataset where unusual labels are extremely rare, while failing to identify the events investigators care about.

### 8.3 Label quality

If multiple people label the same ambiguous audio differently, the dataset contains disagreement. That disagreement should be measured and documented, not hidden.

A strong labelling process should include:

- Clear definitions for each label.
- Independent annotators where practical.
- A way to record uncertainty.
- Retention of original, unprocessed data.
- Documentation of disagreements.
- Separation between observed characteristics and proposed explanations.

### 8.4 Dataset bias

A model trained on recordings from one building, one type of recorder or one acoustic environment may perform poorly elsewhere.

For example, a model trained mainly on quiet indoor recordings may flag normal traffic noise as unusual when deployed near a road. This is a form of distribution shift: the data encountered during use differs from the data represented during training.

## 9. False Positives, False Negatives and the Base-Rate Problem

An AI system can make at least two important kinds of error.

- **False positive:** it flags an event that is not actually part of the target category.
- **False negative:** it fails to flag an event that should have been identified.

In anomaly detection, the meaning of "target category" must be defined carefully. A false positive might simply be a normal event that differs from the model's baseline, rather than a failure to detect a paranormal event.

### A simple numerical example

Imagine a hypothetical screening system examines 10,000 audio segments. For illustration, assume:

- 1% of segments contain a predefined event of interest.
- The system identifies 90% of those segments.
- It incorrectly flags 5% of the remaining ordinary segments.

The dataset contains 100 target segments and 9,900 ordinary segments.

- True positives: 90.
- False negatives: 10.
- False positives: 495.
- Total alerts: 585.

Only 90 of the 585 alerts are true positives under the hypothetical definition. The proportion of alerts that are correct is approximately 15.4%.

<text>These figures are illustrative, not performance claims about a real AI system.</text>

The example demonstrates why a model's sensitivity or overall accuracy is not enough. Investigators also need to understand precision, recall, the prevalence of the event being searched for and the cost of different errors.

For rare events, even a model with apparently good performance can generate many false alerts.

## 10. How to Validate an AI Anomaly-Detection Tool

Before using an AI system to support an investigation, test it on data where the expected outcome is known as well as possible.

### Step 1: Define the task

Avoid vague goals such as "detect paranormal activity."

Use a measurable task, for example:

- Identify audio segments containing speech-like acoustic patterns.
- Flag sudden changes in sound level.
- Detect movement in a fixed-camera video.
- Identify temperature readings outside a predefined baseline.

### Step 2: Build a representative test dataset

Include ordinary conditions likely to occur at the investigation site:

- Human conversation at different distances.
- Footsteps and door sounds.
- Wind, rain and traffic.
- Electrical and mechanical noise.
- Camera exposure changes.
- Insects, dust and reflections.
- Normal sensor fluctuations.

Where possible, include controlled examples of known events and document how they were created.

### Step 3: Separate training and testing data

Do not evaluate a model on the same recordings it was trained on. Split data at the recording-session or location level where appropriate, so that near-identical segments do not appear in both training and test sets.

A random split of adjacent audio windows can cause data leakage and produce overly optimistic results.

### Step 4: Choose evaluation metrics

Useful measures include:

| Metric | What it tells you |
|---|---|
| Precision | How many flagged examples were correct under the chosen labels |
| Recall | How many labelled target examples were found |
| F1-score | A combined measure of precision and recall |
| False-positive rate | How often ordinary examples were incorrectly flagged |
| False-negative rate | How often target examples were missed |
| ROC-AUC | How well scores rank positive examples above negative examples across thresholds |
| PR-AUC | A precision-recall summary, often informative when positive examples are rare |

For continuous anomaly scores, investigators should also inspect the distribution of scores and decide how thresholds were selected.

### Step 5: Test on new locations and equipment

A system should be tested on recordings from different rooms, buildings, microphones, cameras and environmental conditions. Performance in one controlled room does not guarantee performance in an abandoned building or outdoor location.

### Step 6: Preserve reproducibility

Record:

- Model name and version.
- Software and library versions.
- Model settings and thresholds.
- Input file hashes where practical.
- Pre-processing steps.
- Date and time of analysis.
- Output scores and flagged timestamps.
- Human review decisions.

This allows another reviewer to understand how the result was produced.

## 11. A Practical AI-Assisted Workflow for AERM

AI should support a transparent investigation process rather than replace it.

### Phase A: Field collection

- Record original audio and video using documented settings.
- Collect environmental measurements with suitable instruments.
- Synchronise clocks or document offsets.
- Maintain a field log with event timestamps.
- Record equipment placement, changes and interruptions.
- Avoid editing original files.

### Phase B: Data preservation

- Copy original files to secure storage.
- Generate cryptographic hashes, such as SHA-256, to help detect later file changes.
- Maintain a separate working copy for analysis.
- Preserve metadata where available.
- Restrict access to sensitive recordings.

A hash can help demonstrate that a file has not changed since the hash was calculated. It does not prove that the recording was authentic at the moment it was created or that its contents are accurate.

### Phase C: Automated screening

- Run a defined audio or video analysis pipeline.
- Generate candidate timestamps and anomaly scores.
- Record the model and settings used.
- Keep the system's output separate from the original evidence.
- Do not allow automated labels to overwrite field observations.

### Phase D: Human review

- Review the flagged segment in its full context.
- Listen to audio at normal speed before trying altered playback.
- Inspect the original video rather than relying only on extracted frames.
- Check nearby environmental and sensor records.
- Ask whether an ordinary source could produce the observation.
- Record reviewer disagreement and uncertainty.

### Phase E: Reporting

Classify the result according to what the investigation established:

- **Identified:** a plausible source was established and supported by evidence.
- **Consistent with a known source:** the data fits a plausible explanation, but the source was not directly confirmed.
- **Unresolved:** available information is insufficient to determine the source.
- **Data-quality issue:** the observation is affected by a recording, sensor or processing problem.

These categories are suggested reporting language, not universal scientific classifications. The important point is to avoid turning an unresolved result into a paranormal conclusion.

## 12. Example: Reviewing a Hypothetical EVP Candidate with AI

Consider a hypothetical 90-minute audio recording collected in an empty building.

An AI-assisted workflow identifies three candidate segments:

| Timestamp | Automated result | Initial review question |
|---|---|---|
| 00:18:42 | Speech-like segment | Is there intelligible speech, or only a sound resembling speech? |
| 00:47:09 | Unusual broadband sound | Could it be handling noise, wind or a mechanical source? |
| 01:12:31 | Repeated tonal pattern | Is the pattern environmental, electronic or generated by the recording setup? |

The investigator should not begin by asking which segment contains a spirit voice. Instead, each candidate should be examined using a neutral process:

1. Listen to the original segment at normal speed.
2. Review sufficient audio before and after the event.
3. Check microphone placement and handling.
4. Compare the sound with other recordings from the location.
5. Inspect the spectrogram without treating visual patterns as source identification.
6. Check for nearby people, animals, machinery, ventilation and external noise.
7. Ask independent reviewers to describe what they hear without suggesting words.
8. Preserve disagreements and uncertainty.

Suppose two reviewers hear different possible words and a third hears no speech. The disagreement is part of the result. It should not be removed by repeatedly playing the audio until everyone adopts one interpretation.

The AI has helped locate a candidate segment. The evidence review determines what can responsibly be said about it.

## 13. Tools and Technologies Investigators Can Explore

The following tools are examples of technologies that may support audio, video or data analysis. Their inclusion is not an endorsement, and each should be evaluated for its current capabilities, licensing, privacy practices and limitations.

### Audio and signal processing

- **Python:** a programming language useful for building reproducible analysis workflows.
- **Librosa:** a Python library for audio and music signal analysis.
- **SciPy:** provides scientific computing and signal-processing functions.
- **Audacity:** an audio editor that can support waveform and spectrogram inspection.
- **FFmpeg:** useful for inspecting, converting and processing multimedia files. Conversion can alter data, so original files should be preserved.

### Machine learning

- **scikit-learn:** provides conventional machine-learning tools, including Isolation Forest and Local Outlier Factor.
- **PyTorch:** a framework for building and evaluating neural networks.
- **TensorFlow:** a framework for machine-learning workflows.
- **Jupyter:** an interactive environment useful for documenting experiments and analysis.

### Video and computer vision

- **OpenCV:** a computer-vision library useful for frame processing, motion analysis and image operations.
- **MediaPipe:** provides machine-learning solutions for certain perception tasks; its suitability depends on the specific use case.
- **FFmpeg:** supports video inspection and extraction of frames for controlled analysis.

Tool selection should follow the research question. Installing a large AI framework does not automatically improve evidence quality.

## 14. A Conceptual Python Example: Flagging Unusual Sensor Readings

The following example demonstrates a basic anomaly-screening workflow using Isolation Forest. It is designed for a fictional one-dimensional sensor dataset. It does not identify paranormal activity.

```python
import numpy as np
from sklearn.ensemble import IsolationForest

# Example readings from a fictional sensor.
# Replace these values with documented, quality-checked measurements.
readings = np.array([
    20.1, 20.0, 20.2, 20.1, 20.3,
    20.0, 20.2, 20.1, 20.2, 20.1,
    20.0, 20.2, 20.1, 26.8, 20.2
]).reshape(-1, 1)

model = IsolationForest(
    contamination=0.07,
    random_state=42
)

model.fit(readings)

# Prediction: 1 = inlier, -1 = flagged as an outlier
predictions = model.predict(readings)
scores = model.decision_function(readings)

for index, (value, prediction, score) in enumerate(
    zip(readings.flatten(), predictions, scores)
):
    status = "FLAGGED" if prediction == -1 else "ordinary"
    print(
        f"Sample {index:02d}: "
        f"{value:.2f} | {status} | score={score:.4f}"
    )
```

### What this example does

1. Loads a small set of fictional measurements.
2. Fits an Isolation Forest model.
3. Assigns each measurement an inlier or outlier label.
4. Prints a score that can be used to rank observations for review.

### Important limitations

- The example has very few samples and is for demonstration only.
- The `contamination` parameter influences how many observations the model expects to flag.
- The model does not know what the sensor measures or whether a reading is physically meaningful.
- A flagged value could be caused by a genuine environmental change, a sensor fault or a data-entry error.
- Real analysis should account for time, sensor calibration, measurement uncertainty and operating conditions.

For time-series data, a more careful workflow may use rolling baselines, change-point methods or models that account for temporal dependence. The method should be selected and validated before interpreting results.

## 15. Ethical, Privacy and Security Considerations

AI analysis can create new risks, especially when recordings contain people, private conversations or identifiable locations.

Investigation teams should consider:

### Consent and privacy

Obtain appropriate consent before recording people or processing identifiable audio and video. Do not upload private recordings to third-party AI services without understanding their data handling, retention and training policies.

### Data security

Store original recordings securely, limit access and maintain backups. Use appropriate encryption and access controls for sensitive material.

### Transparency

Disclose when AI has been used to screen, transform, transcribe or interpret evidence. Report the tool and relevant settings when they materially affect the result.

### Avoiding fabricated certainty

Do not present AI-generated transcripts, enhanced audio, reconstructed frames or synthetic visualisations as original evidence. Clearly label processed or generated material.

### Human oversight

An automated system should not make consequential claims about witnesses, participants or alleged events without independent review. Human reviewers also have biases, so their decisions and disagreements should be documented.

## 16. Common Mistakes in AI-Assisted Paranormal Research

**Mistake 1: Treating an AI label as a factual identification.**

A model prediction is an estimate based on patterns it learned. Verify it against the original recording and context.

**Mistake 2: Training a model on unverified "ghost" recordings.**

Labels based on untested interpretations can teach a model to reproduce those interpretations rather than identify a verified phenomenon.

**Mistake 3: Using only selected clips.**

Removing the minutes before and after an event can hide context. Preserve and review the surrounding recording.

**Mistake 4: Repeatedly changing settings until an interesting result appears.**

Trying many thresholds or models increases the chance of finding a coincidental pattern. Record all analysis choices and distinguish exploratory analysis from confirmatory testing.

**Mistake 5: Ignoring ordinary sources.**

AI cannot replace checks for electrical interference, reflections, insects, wind, handling noise, equipment faults or other plausible explanations.

**Mistake 6: Confusing visual enhancement with new information.**

Noise reduction, sharpening, interpolation and generative enhancement can change the appearance or sound of a recording. Keep the original and document every transformation.

**Mistake 7: Reporting accuracy without explaining the test.**

A performance percentage is meaningless without the dataset, labels, sample size, evaluation method and error rates.

## 17. The Future: AI as a Research Assistant, Not a Paranormal Authority

AI may become increasingly useful in evidence management and analysis. Potential developments include:

- Automated indexing of long recordings.
- Better search across audio, video and sensor timelines.
- More robust detection of known environmental sound patterns.
- Tools for comparing repeated events across investigation sessions.
- Assisted quality checks for missing data and inconsistent timestamps.
- Reproducible analysis pipelines that record model versions and settings.

These developments could make investigations more efficient and help teams identify patterns that deserve closer examination.

However, more complex models also introduce challenges. Their decisions may be difficult to interpret, their performance may change across environments, and their outputs can create an impression of certainty that the underlying evidence does not justify.

The central research problem remains the same: investigators must establish what was recorded, how reliably it was measured, what could have caused it and whether independent evidence supports the interpretation.

AI can help organise the search. It cannot remove the need for scientific reasoning.

## Conclusion: An AI-Flagged Anomaly Is the Beginning of an Investigation

Artificial intelligence offers practical ways to examine large volumes of audio, video and sensor data. Statistical methods, machine learning and neural networks can help identify unusual patterns, locate candidate events and reduce the time required for initial screening.

But the meaning of an anomaly depends on the reference data, the model, the measurement process and the environment. A sound classified as speech may be machinery. A movement alert may be an insect or a lighting change. A sensor spike may be a real environmental event or a device error.

Most importantly, **no conventional AI anomaly detector can establish that an event is paranormal merely by flagging it as unusual.**

For AERM, AI should be used as a transparent research assistant: preserve the original evidence, document the model and its settings, validate performance, review candidate events independently, investigate ordinary explanations and report uncertainty honestly.

The strongest use of technology is not to make extraordinary claims faster. It is to make the investigation more systematic, traceable and open to verification.

**AERM's guiding principle remains:**

> No anomaly is considered paranormal until environmental, psychological, technical, and scientific explanations have been systematically evaluated.

That principle applies to machine-generated alerts just as much as it applies to human observations.

---

## References and Further Reading

The following publications and documentation provide foundations for machine learning, anomaly detection, signal processing and responsible evaluation. They do not establish the existence of paranormal phenomena.

1. Chandola, V., Banerjee, A., & Kumar, V. (2009). Anomaly Detection: A Survey. *ACM Computing Surveys*, 41(3), Article 15. https://doi.org/10.1145/1541880.1541882
2. Liu, F. T., Ting, K. M., & Zhou, Z.-H. (2008). Isolation Forest. *2008 Eighth IEEE International Conference on Data Mining*, 413–422. https://doi.org/10.1109/ICDM.2008.17
3. Breunig, M. M., Kriegel, H.-P., Ng, R. T., & Sander, J. (2000). LOF: Identifying Density-Based Local Outliers. *Proceedings of the 2000 ACM SIGMOD International Conference on Management of Data*, 93–104. https://doi.org/10.1145/342009.335388
4. Hinton, G. E., & Salakhutdinov, R. R. (2006). Reducing the Dimensionality of Data with Neural Networks. *Science*, 313(5786), 504–507. https://doi.org/10.1126/science.1127647
5. Saito, T., & Rehmsmeier, M. (2015). The Precision-Recall Plot Is More Informative than the ROC Plot When Evaluating Binary Classifiers on Imbalanced Datasets. *PLOS ONE*, 10(3), e0118432. https://doi.org/10.1371/journal.pone.0118432
6. scikit-learn developers. *Novelty and Outlier Detection.* https://scikit-learn.org/stable/modules/outlier_detection.html
7. librosa developers. *librosa: Audio and Music Signal Analysis in Python.* https://librosa.org/
8. OpenCV. *Open Source Computer Vision Library Documentation.* https://docs.opencv.org/
9. NIST. *Artificial Intelligence Risk Management Framework (AI RMF 1.0).* https://doi.org/10.6028/NIST.AI.100-1

## About AERM

**Anomalous Evidence Research & Media (AERM)** is an independent research and media initiative focused on the systematic documentation and evaluation of unusual reports and alleged anomalous events. Through environmental assessment, witness research, technical documentation and evidence analysis, AERM aims to encourage critical thinking and responsible investigation.

**Paranormal Frame** is AERM's public-facing research and documentary platform, presenting investigation concepts and evidence-focused discussions in an accessible format.

## Educational Disclaimer

This article is intended for educational and research-awareness purposes. It does not claim that AI can detect or verify paranormal activity. Model outputs are probabilistic or rule-based indicators that require validation and human review. Tools and software may change over time; consult current documentation before use. Investigators should follow applicable laws, privacy requirements, consent procedures and data-security practices when collecting or processing recordings.
