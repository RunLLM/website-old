---
slug: aqueduct-taking-data-science-to-production
title: "Aqueduct: Taking Data Science to Production"
date: 2022-08-17 12:00:00
summary: As ML has become widely adopted, the next critical challenge for data teams is in generating value from data science & machine learning. Production data science infrastructure is the missing link that will enable data science and machine learning to succeed, by abstracting away low-level cloud infrastructure. Aqueduct is the world's first production data science platform; it enables data scientists to run models anywhere, publish predictions everywhere, and ensure prediction quality.
featured: false
author: vikram
---
As machine learning is being adopted (often aspirationally) in every business, it’s become clear that the [next major challenge is in how we enable teams and businesses to make good use of ML models](https://www.notion.so/Aqueduct-Taking-Data-Science-to-Production-095c225052824f2aa46fbf35956bc378). While data scientists are trained to build useful machine learning model, the (engineering) skills required to integrate that model into the business are completely different. MLOps tools set out to solve this problem, but [they have led us down the wrong path](https://blog.aqueducthq.com/posts/mlops-right-problem-wrong-solution) by forcing data teams to grapple with low-level cloud infrastructure to accomplish everyday tasks.

We’ve talked to 175+ data teams to better understand their challenges today. Based on our conversations, we believe the missing link is a solution for **production data science (PDS)**, *not* MLOps<sup>1</sup>. Production data science infrastructure takes the opposite approach from MLOps: Rather than exposing and expanding the complexity of low-level cloud infrastructure, PDS infrastructure manages the underlying infrastructure while enabling data teams to easily deploy models anywhere, publish predictions consistently, and ensure ongoing model quality.

At [Aqueduct](https://github.com/aqueducthq/aqueduct), we’re building an open-source production data science platform designed and built for data teams to help make data science projects useful quickly.**

## What is Production Data Science?

**Production data science (PDS) infrastructure enables data scientists to repeatably deliver high-quality predictions to their business without having to manage low-level cloud infrastructure tools.** At its core, PDS covers 3 critical tasks:

- *Running data science in production (or just repeatedly)***:** Rather than forcing you to learn, manage, and fight low-level tools like Docker, Kubernetes, or even Airflow, production data science infrastructure should enable you to run your code repeatably, wherever you’d like and with minimal configuration overhead.
- *Publishing predictions***:** Once a data or ML pipeline is running, results can be shared with stakeholders & users; this generates business value and feedback, which can be turned into new, higher-quality data sets. Depending on the application of data science, predictions might need to be published as data, spreadsheets, visualizations, or endpoints — production data science infrastructure should support this diversity without added complexity.
- *Ensuring prediction quality***:** Predictions can only be published if you have confidence in the results of your work, but data science projects can fail in subtle and unpredictable ways. Data teams need a clean, targeted way to measure and validate predictions (and input data), so you can be sure you’re publishing high quality data.

Until recently, no existing tools met these requirements. That’s why we built [Aqueduct](https://github.com/aqueducthq/aqueduct).

## Introducing Aqueduct

**Aqueduct enables data scientists to go from insight to impact by automating the engineering needed to connect models to the data, services, and people that need them.** The [Aqueduct open-source project](https://github.com/aqueducthq/aqueduct) enables turnkey productionization of data science projects — whether it’s a simple heuristic-based workflow running locally or large prediction task running in the cloud.

Aqueduct is purpose-built to meet the three core needs of production data science: 

- *Deploy*: Aqueduct has a simple Pythonic API that lets you define workflows in a few lines of code and run them anywhere from a laptop to a Kubernetes cluster.
- *Publish*: Aqueduct comes with a suite of connectors to common data systems and endpoints that allow you to publish predictions wherever they’re needed.
- *Monitor*: Aqueduct’s checks & metrics enable you — and your teammates — to ensure the correctness of predictions and measure them over time, enabling early detection of issues and quick bugfixes.

We’re really excited about Aqueduct. If what we’re building is interesting or useful for you, [we’d love to hear from you](mailto:hello@aqueducthq.com)! [Check out what we’re building](https://github.com/aqueducthq/aqueduct), [join our Slack community](https://slack.aqueducthq.com), and [let us know what you think](https://github.com/aqueducthq/aqueduct/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)!

---

<sup>1</sup> 1If you're interested in learning more about how Production Data Science is different from MLOps, check out the [philosophy behind Aqueduct](https://docs.aqueducthq.com/the-aqueduct-philosophy#isnt-this-just-mlops) for more detail.