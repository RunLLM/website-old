---
slug: understanding-the-mlops-knot-metadata-drift
title: "Understanding the MLOps Knot: Metadata Drift"
author: vikram
summary: MLOps has become increasingly complex as machine learning has matured. One of the key reasons is ML teams have to build, extend, and maintain far too much infrastructure. We dive into how and why this happens.
featured: false
date: 2023-02-23 12:00:00
---

*Next up in our series on the [MLOps Knot](https://aqueducthq.com/post/the-mlops-knot/) is metadata drift.* 

The MLOps Knot is the (unfortunate) current state of affairs in machine learning infrastructure — it’s a mess of incomplete, siloed tools that incurs huge amounts of tech debt and complexity when cobbled together to run ML in the cloud.

Last week, we discussed [infrastructure proliferation](https://aqueducthq.com/post/understanding-the-mlops-knot-infrastructure-proflieration/) — the growing number of tools that ML teams need to use and maintain. Not only does this make ML infrastructure complicated to deploy & manage, these tools interoperate poorly. This results in extremely siloed metadata — teams don’t know what code is running, where it’s running, whether it’s working, or who’s responsible for it. We call this lack of shared context ***metadata drift***.

---

Metadata drift is ubiquitous in today’s MLOps. Let’s consider an example scenario: A user might start out by running some experiments on Ray to do hyperparameter search. Having picked the best model configuration, they will configure an Airflow job that trains that model on the latest data on a weekly basis and publishes the model to AWS S3. A separate Airflow job is then used to trigger a Databricks job that does inference at scale and publishes the predictions to Snowflake.

Each of these systems has a separate API, a different set of metadata it captures, and an isolated internal metadata database. Each system can tell you what happens when you run code in it, but as we discussed last week, teams are being forced to constantly move across different systems. 

The lack of this shared metadata means that teams are flying blind which results in a whole host of problems.

- **Debugging:** The most common problem is that debugging issues in data, models, or predictions across this stack can be complicated (or impossible) because the linkage between model metadata, logs, inference tasks, and metrics is not tracked.
- **Metrics:** Ensuring correctness requires tracking metrics for both models and predictions, a task that isn’t covered by any of the tools in the existing stack. As a result, teams are often left guessing whether things work as expected — or reacting to complaints from users and stakeholders.
- **Trends & History:** Understanding trends in models and predictions is difficult (or impossible) because you need to manually capture snapshots of the data and metrics at each point in time. This requires custom infrastructure and yet more Airflow DAGs.
- **Governance:** Enforcing compliance and auditability is a nightmare because the lineage connecting input data, models, and the ultimate predictions is not captured.

Summarizing many of these issues, here’s a typical story we’ve heard from an ML engineer that we shared in our original post on the MLOps Knot:

> There’s an Airflow job to generate the predictions, and there’s a second Airflow job that ingests the predictions, validates them, and generates metrics about them; the metrics are snapshotted in Snowflake. Those metrics are then piped into Datadog, which is configured to alert an on-call engineer if pipelines break or metrics are out of bounds. 
> 
> When someone is paged, they first have to check Datadog to see which pipelines broke. They then query Snowflake to pull the performance of the model associated with that pipeline to analyze & visualize it. If there’s nothing wrong there, then they SSH into the EC2 instance where the model was running to inspect logs. If the logs aren’t present, they check an S3 bucket to see the logs for an Airflow job.
> 
If we’re not able to resolve the bug in a certain time period, we might let it go if it doesn’t happen frequently.

This crisis management process is painful, and unfortunately, it’s not that different from what we’ve heard from most teams. Simply put, **metadata drift leads to repetitive work, inefficient debugging, and ineffective models & predictions**.

---

The solution to metadata drift is not to replace every tool you have with new, omnipotent ML infrastructure. Such a system might work well for a few use cases today but will end up limiting you when use cases evolve or a new ML technique comes along. Teams can and should keep using their existing infrastructure. 

Critically, what most ML teams need is better APIs and better metadata management across the whole ML stack. This tooling should allow teams to adopt new tools as necessary, and open standards allow the community to influence and adapt to the ever-changing state-of-the-art in machine learning.

That’s exactly what we’re building at [Aqueduct](https://www.notion.so/Aqueduct-Roadmap-8428815a0cf247f889db1d5b782a4d91) — if you’re interested in learning more, check out our [open-source project](https://github.com/aqueducthq/aqueduct) or [join our Slack community](https://slack.aqueducthq.com)!
