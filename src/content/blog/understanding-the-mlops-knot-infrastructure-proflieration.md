---
slug: understanding-the-mlops-knot-infrastructure-proflieration
title: "Undersatnding the MLOps Knot: Infrastructure Proliferation"
author: vikram
summary: MLOps has become increasingly complex as machine learning has matured. One of the key reasons is ML teams have to build, extend, and maintain far too much infrastructure. We dive into how and why this happens.
featured: false
date: 2023-02-16 12:00:00
---

A few weeks ago, we wrote about the [MLOps Knot](https://aqueducthq.com/post/the-mlops-knot/) — an infrastructure stack that has been cobbled together with siloed, incomplete solutions to parts of the problem. Unfortunately, this is the current state of affairs in machine learning infrastructure. In our conversations with data & ML teams, we’ve identified two key challenges that have come out of this confusion — infrastructure proliferation and metadata drift. 

This week, we’re diving into why there’s so much infrastructure that ML teams end up using and managing. Next week, we’ll talk about how metadata drift causes huge headaches for teams.

<img src="/blog/the-mlops-knot/knot.png">

<hr />

***Infrastructure proliferation*** is a fundamental problem that grows out of how ML teams evolve. In most organizations, machine learning comes after data engineering and analytics are already set up — and [rightly so](https://developers.google.com/machine-learning/guides/rules-of-ml)! Good ML teams are grounded in high-quality data and empirical analytics processes.

As a result, most ML teams are inheriting the infrastructure that’s been selected by sister teams.  Typically, the very first model at a company will be built on data in Snowflake, will be trained & do inference on Airflow-on-Kubernetes, and will most likely publish predictions back to Snowflake or to another database. Building and orchestrating containers for a single model is painful but is likely not catastrophic enough to slow the team down significantly (yet). 

However, as the team matures, the ML tasks will need more and more functionality, which means they will be increasingly limited by what exists. Teams are forced to either hack their way around what they have or set up new tools from scratch. Here are a few common examples:

- Pipeline code will be updated more frequently, which means container management and deployment will become a bigger time sink or requires custom CI/CD pipelines.
- Individual pipelines will become more complicated, requiring workflows to depend on each others’ results or use higher-order control flow.
- Data volumes will increase, meaning some pipelines will need to scale out onto distributed processing systems like Spark.
- ML will become mission-critical, so teams must monitor quality to have confidence that they’re publishing high quality models & predictions
- Models will become more computationally intensive, so pipelines will need access to GPUs and other hardware accelerators.
- Model development processes will become more complicated, so teams will need to share features, run experiments at scale, and track experiments.
- Predictions that were previously generated offline & in batch will now need to be generated on-demand, usually behind an API endpoint.

Each of these challenges usually requires new processes or new infrastructure, both of which consume cycles that could be spent building better models. Some tools (e.g., Spark for inference at scale) are likely already configured within their organization, which makes adoption easier, but many (e.g., Ray for hyperparameter search) will require setup from scratch. Others (e.g., tracking metrics and setting thresholds) usually require tools that are built from scratch by ML teams. 

This list doesn’t even begin to account for more complex use cases. Beyond the basics described above, yet-more infrastructure will need to be added to their stack — distributed feature computation in Python might require Dask or temporal feature backfills will require a mature feature store like Feast/Tecton.

Occasionally, companies decide to switch cloud providers, which throws all the existing assumptions up into the air — tools have to be reconfigured or swapped out altogether, and teams are re-learning how to operate from the ground up.

<hr />

Managing this infrastructure is a nightmare. Responsibility is spread across many teams, and context is lost when data & code are moved across systems (more on that next week). 

Most ML infrastructure purports to solve this problem by giving you a *whole new stack* that will replace all of your existing tools and processes. AWS SageMaker expects you to develop, experiment with, train, and deploy models exclusively within their ecosystem — breaking that assumption at any point in the lifecycle can be extremely painful. Unfortunately, that doesn’t work for most ML teams, many of which likely don’t have the autonomy to pick and migrate their existing processes or need customization. 

It’s also the wrong solution: The cloud already has extremely powerful infrastructure that we should be helping ML teams leverage more effectively. While the engineer in me would love to go build a better scalable data processing system, it’s simply not what’s needed. As a community, we don’t need to reinvent the wheel for machine learning — instead, we need toolchains that will help us effectively move machine learning code into the cloud (or across clouds!) with simple-but-flexible APIs that can be customized as necessary.

That’s why Aqueduct is building an open-source, cloud- and vendor-agnostic ML orchestration layer. Aqueduct allows you to deploy pipelines onto existing cloud infrastructure and monitor your models & predictions from a single system. We’d love to hear your feedback — check out our [open-source project](https://github.com/aqueducthq/aqueduct) or [join our community](https://slack.aqueducthq.com)!