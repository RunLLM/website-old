---
slug: aqueduct-v0-1-a-simpler-way-to-run-data-science-workflows
title: "Aqueduct v0.1: A simpler way to run data science workflows"
author: vikram
summary: We're excited to share Aqueduct v0.1. Aqueduct allows you to easily construct robust data & ML pipelines that work with your cloud infrastructure.
featured: false
date: 2022-10-18 12:00:00
---

We’ve been building [Aqueduct](https://github.com/aqueducthq/aqueduct) for over a year now. From the beginning, we’ve been on a mission to remove the [accidental complexity](https://en.wikipedia.org/wiki/No_Silver_Bullet) that blocks data science & machine learning from having impact — resource allocation, configuration management, cluster building, hidden logs, and so on.

We’re excited about what we’re built, and today we’re thrilled to share the v0.1 release of the Aqueduct open-source project:

<img src="/blog/aqueduct-v0-1-a-simpler-way-to-run-data-science-workflows/overview.png">

If you’re sick of ops complexity getting in the way of data science,  [join our community](https://slack.aqueducthq.com) or [say hello](mailto:hello@aqueducthq.com)!

### Aqueduct: Simplifying Production Data Science

Aqueduct aims to improve the productivity of data science teams. In speaking with over 200 data teams, we’ve found that the number one impediment to productivity is infrastructure complexity. Most data teams settle for an orchestration tool (e.g., Apache Airflow) running on Kubernetes, but these create incredible amounts of complexity: These tools make it difficult to deploy and debug data science and machine learning workflows.

Aqueduct is simplified infrastructure built for data science workflows; it abstracts away this infrastructure and lets you focus what matters: creating business impact with high-quality models. Concretely, Aqueduct enables you to define data science & ML pipelines in vanilla Python, connect those pipelines to data, and monitor every stage of your pipeline.

**Defining Pipelines**

The Aqueduct SDK uses a simple Python decorator-based API to define workflows. Defining an operator is as simple as writing a Python function and adding `@op` above it:

<script src="https://gist.github.com/vsreekanti/0360acfefc4cfdccce3749fdb32884e5.js"></script>

You can construct a workflow by chaining together your decorated functions:

<script src="https://gist.github.com/vsreekanti/f2f02c830451d59701e0ace071cd809f.js"></script>

When you’re ready to go, Aqueduct can automatically package up your code to run in the cloud (Kubernetes, AWS Lambda, Apache Airflow, etc.) — without ever requiring a line of YAML. If & when things go wrong, Aqueduct automatically captures & surfaces stack traces to accelerate debugging.

**Getting the Data**

Aqueduct comes prepackaged with a set of connectors to common data systems (Snowflake, Redshift, Postgres, etc.) that allow you to easily and securely retrieve your data from the source. Once the data’s in an Aqueduct pipeline, you can pass it into an Aqueduct function, and Aqueduct will automatically track & version your data (as well as any intermediary data) so you can debug your code & data together.

This saves you the pain of writing custom code to retrieve data and gets rid of the security headache of having database credentials floating around in Jupyter notebooks.

**Ensuring Quality**

Once you have models and predictions out in the world, you need to make sure that you’re not publishing bad data. Aqueduct’s metrics and checks give you a simple way to define measurements over and tests on your data that can be tracked over time. This allows you to encode your business constraints directly into Aqueduct and ensure quality every time your pipeline executes.

### We’re Just Getting Started

We’re incredibly excited about what we’ve built so far, but we’re just getting started. We’re working on a bunch of exciting features, including configurable resource management, deeper integration with version control, and even real-time prediction serving. 

We’re looking for feedback & use cases from early adopters, so if Aqueduct sounds interesting or useful, please [let us know what you think](https://github.com/aqueducthq/aqueduct/issues/new/choose) and [join our community](https://slack.aqueducthq.com)!