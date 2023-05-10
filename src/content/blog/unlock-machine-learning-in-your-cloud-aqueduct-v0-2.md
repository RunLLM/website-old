---
title: 'Unlock machine learning in your cloud: Aqueduct v0.2'
author: vikram
slug: unlock-machine-learning-in-your-cloud-aqueduct-v0-2
date: 2023-02-01 12:00:00
summary: Aqueduct v0.2 unlocks machine learning in your cloud. This release takes big steps forward on running ML workloads on existing cloud infrastructure and on providing visibility into what's running.
featured: false
---

Back in October, we released [Aqueduct v0.1](https://github.com/aqueducthq/aqueduct/releases/tag/v0.1.0). That release laid the groundwork for simplified ML orchestration by defining a Python-native API that allowed you to construct machine learning pipelines, plumb those pipelines with data, and ensure that your models perform well on an ongoing basis. 

Today, we’re releasing [Aqueduct v0.2](https://github.com/aqueducthq/aqueduct/releases/tag/v0.2.0), and we couldn’t be more excited about the progress we’ve made. Based on feedback from our users, we’ve been expanding Aqueduct to integrate with a wide variety of cloud infrastructure, with the goal of being the simplest way to run machine learning in the cloud.

1. Organizing and managing existing cloud infrastructure is a [painful problem](https://www.aqueducthq.com/post/the-mlops-knot).
2. Most teams struggle with visibility into pipeline metadata and model & prediction quality.

Aqueduct v0.2 has key innovations on both fronts.

### Working with your infrastructure

Aqueduct v0.1 had basic support for running workflows on Kubernetes, Airflow, and AWS Lambda. A workflow defined in Aqueduct could run automatically on your existing infrastructure, but it was also quite limited — you couldn’t control the resources available to an Aqueduct operator or distribute the compute for a single operator. 

As of [v0.1.5](https://github.com/aqueducthq/aqueduct/releases/tag/v0.1.5), Aqueduct has support for fine-grained resource configuration on AWS Lambda and Kubernetes. We’ve added support for  CPU and memory configuration, and on Kubernetes clusters, you can deploy operators on GPU. Aqueduct will automatically configure and deploy a container with the correct drivers installed to run your functions.

As of [v0.2](https://github.com/aqueducthq/aqueduct/releases/tag/v0.2.0), Aqueduct has support for running workflows on Databricks Spark clusters (vanilla Spark coming soon!). This enables teams to take advantage of Spark’s support for seamlessly distributing compute, especially for easily parallelizable code. You can use Aqueduct’s decorator API to [define a workflow that runs on a Databricks Spark cluster](https://docs.aqueducthq.com/resources/compute-systems/databricks) and have Aqueduct handle the deployment & orchestration and provide ongoing visibility. 

Our focus here is to bring Aqueduct’s simple pipeline definition and detailed visibility to the power and scale of existing infrastructure. We’re just getting started with our integration suite, so if there’s systems you’d love to see, [let us know](https://github.com/aqueducthq/aqueduct/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)!

### Increasing visibility

The other pain point we’ve heard consistently in our conversations is that the [proliferation of ML infrastructure](https://www.mihaileric.com/posts/mlops-is-a-mess/) has made it difficult (or impossible) for teams to know what ML code is running where, who’s responsible for it, and whether it’s working as expected.

From the beginning, Aqueduct’s been focused on gathering and centralizing the metadata associated with ML pipelines, and over the last few months, we’ve made significant improvements in how this metadata is presented. 

Aqueduct [v0.1.6](https://github.com/aqueducthq/aqueduct/releases/tag/v0.1.6) added a new metadata view that shows what workflows are running, where they’re running, what their status is, and how their associated metrics are performing at a glance:

<img src='/blog/unlock-machine-learning-in-your-cloud-aqueduct-v0-2/visibility.png'>

The same visibility is available for the models and datasets created by your workflows. These views are searchable and sortable. In the coming releases, we’ll be adding support for filtering these views and saving view configurations, so you can quickly find the metadata your care about. Our goal is to make it easy for you to find the workflows, models, and data you care about, have confidence that they’re behaving as expected, and easily triage when things go awry. 

<hr />

We’re thrilled about the progress we’ve made, and there’s a lot more to come. Here’s a sneak peek: 

- In the theme of abstracting away infrastructure, we’re planning to add the ability to create compute resources (e.g., Kubernetes clusters, Spark clusters) on-demand via Aqueduct’s API, so you don’t have to manage the setup and teardown process.
- We’re also planning on adding support for new execution modes, like hyperparameter search and real-time prediction serving.

If you’re interested in learning more, try out the [open-source project](github.com/aqueducthq/aqueduct), or [join our Slack community](https://www.notion.so/Unlock-machine-learning-in-your-cloud-Aqueduct-v0-2-bf84ef3827b545cd908abb4f1df3b319) to say hi — we’d love to hear from you!