---
title: The MLOps Knot
author: vikram
slug: the-mlops-knot
date: 2023-01-26 12:00:00
summary: Machine learning has seen a rapid proliferation of powerful infrastructure. However, the adoption of all these tools has led to a tangled mess of infrastructure leaving most teams without a way to track the code, data, and metadata for their machine learning workloads.
featured: false
---

In recent years, MLOps has tied itself into knots — service ”architectures” that are more like a jumble of ad hoc connections between siloed, incomplete solutions to ML infrastructure. This leaves teams without a way to know what machine learning tasks are running, whether they’re working as expected, and how to triage and resolve issues. Ultimately, it means that less time is spent on delivering on the promise of machine learning — the bulk of time is spent wrangling and caring for a knot of intertwined infrastructure.

<img src="/blog/the-mlops-knot/knot.png">

<hr />

Infrastructure complexity is not inevitable, but complexity does grow exponentially as tools are added. Systems like Apache Spark, Tensorflow, PyTorch, and Ray have enabled countless new machine learning use cases, and each one of these tools is quite powerful. Unfortunately, the proliferation of these exact tools incurs a significant maintenance overhead and learning curve that’s led to the MLOps knot. It’s effectively slowed progress in the value delivered by machine learning.

Over the last year, our team has met with 250+ enterprises to discuss the challenges around ML infrastructure. The typical enterprise I’ve interviewed might have a stack that looks something like this:

- Snowflake as a data & feature warehouse with Fivetran + dbt for ELT
- Spark (or Databricks) for large scale analysis and lightweight feature computation
- Ray for experimentation and hyperparameter tuning
- Weights & Biases for experiment management
- Airflow for orchestrating batch training & inference

This is a long list of tools to maintain, and this list already has some painful (and often expensive) redundancy — e.g., compute on Snowflake vs. Databricks, metadata split across dbt and W&B. But it rarely stops there since this just covers the basics — [things get much more complicated](https://www.mihaileric.com/posts/mlops-is-a-mess/) when you include distributed Python featurization (Dask, Modin), feature stores (Feast, Tecton), model performance monitoring (Truera, Arize), or real-time prediction serving. This has led to two key challenges that I’ve heard time and time again.

***First*,** **infrastructure proliferation**. Maintaining existing systems and adopting new ones is extremely painful. Each of these systems presents a new API & interface for data science & ML engineers to learn. With 7-10 systems for managing production ML, no one person can possibly be fluent in all the relevant APIs, much less manage each one of these systems in production. The work required to run ML in production eats up a significant chunk of time, often requiring a new team to be formed. That can obviously be frustrating, but at least it’s a one time-learning curve.

Worse yet, when a new ML task comes along that has new requirements — e.g., Ray or Dask for distributed Python feature computation — every workflow has to be rewritten from the existing API to support the new library. So much time and effort has been sunk into the existing infrastructure that learning about and evaluating a new system is a painful, weeks-long project (or a non-starter). 

And as always, switching between cloud providers is 100x harder still.

***Second*, metadata drift**. many teams have trouble knowing what code is running where, whether it’s succeeding or failing, and who’s responsible for it. The challenge comes from the lack of shared context and interoperability within these systems, many of which might have overlapping functionality. 

Ultimately, there’s no source of truth for the code, data, and metadata that’s moving across these systems. Code & data artifacts remain relatively constant across the ML lifecycle, but there is no shared context across systems. For example, the same code will be used for experimentation in Ray and eventually for production training in Kubeflow. The resulting model might then be run on Databricks for large-scale batch inference or deployed into a separate system for real-time inference — again. At each stage, the code, the model, and the resulting data are repackaged into different APIs and different formats, which is both time-consuming and — critically — loses context by moving across systems.

This can make validation, triage, and debugging nightmarish. In an extreme example, we spoke to one ML engineer at a mid-sized e-commerce company who shared the following description of their debugging process — this covers only production inference (paraphrased):

> There’s an Airflow job to generate the predictions, and there’s a second Airflow job that ingests the predictions, validates them, and generates metrics about them; the metrics are snapshotted in Snowflake. Those metrics are then piped into Datadog, which is configured to alert an on-call engineer if pipelines break or metrics are out of bounds. 
> 
> When someone is paged, they first have to check Datadog to see which pipelines broke. They then query Snowflake to pull the performance of the model associated with that pipeline to analyze & visualize it. If there’s nothing wrong there, then they SSH into the EC2 instance where the model was running to inspect logs. If the logs aren’t present, they check an S3 bucket to see the logs for an Airflow job.
> 
> If we’re not able to resolve the bug in a certain time period, we might let it go if it doesn’t happen frequently.

<hr />

This mess is the MLOps Knot. Modern machine learning wouldn’t be possible without these tools, but infrastructure proliferation slows teams down, incurs tech debt, and ultimately hinders ML teams from delivering business value. 

My goal here isn’t to say that we should stop innovating on ML infrastructure or that we should replace all of these tools with One Infrastructure to Rule Them All. But to maintain our collective sanity, we need a way to know what’s running, where it’s running, whether it worked, and who to yell at if it failed. Otherwise, we’re going to continue to see infrastructure creep that becomes increasingly difficult to manage. That means more time is spent on managing infrastructure and less is spent on building new, more effective models — that’s a loss for us all.

At Aqueduct, we’re untangling this knot. Our [open-source project](https://github.com/aqueducthq/aqueduct) gives you orchestration layer that integrates with your existing infrastructure while providing a single source of truth for the corresponding code, data, and metadata. If you’re interested in learning more, [join our Slack community](https://slack.aqueducthq.com) or [try us out](https://docs.aqueducthq.com)!