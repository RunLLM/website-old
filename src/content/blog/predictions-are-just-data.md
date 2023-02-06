---
title: Predictions are just data
author: vikram
slug: predictions-are-just-data
date: 2022-10-27 12:00:00
featured: false
summary: In conversations with over 200 data teams, we've found that the "typical" solution to ML model deployments is wrong. Most people don't need REST endpoints — they just need predictions as data.
---

As we’ve been building [Aqueduct](https://github.com/aqueducthq/aqueduct), we’ve spoken to over 200 data & ML teams. The question we’ve asked everyone we’ve spoken to is how they use the machine learning models they build. 

The popular perception is that models are deployed as REST endpoints, and predictions are made by querying those endpoints. We spent years at Berkeley working on making this process [faster](https://www.usenix.org/system/files/conference/nsdi17/nsdi17-crankshaw.pdf), [more cost-efficient](https://arxiv.org/pdf/1812.01776.pdf), and [easier to deploy](https://arxiv.org/pdf/2007.05832.pdf). 

For some use cases, this is a great solution — when predictions cannot be precomputed (often because the space of possible inputs is too large), it makes sense to generate them when needed. Common examples are algorithmic feed generation, activity-based recommendation, and real-time speech recognition. 

However, most of the data teams we’ve spoken to don’t have these types of problems. Instead, they build models that make predictions on fixed input data that’s updated on a relatively long timescale — days, weeks, or even occasionally months. The predictions are correspondingly updated on the same timescale as the data. 

The list of examples for periodically updated predictions is much larger — we’ve come across everything from churn prediction and lead scoring for business teams to route planning, credit risk scoring, and carbon offset management.

Deploying a REST endpoint for each of these models is not only unnecessary, it’s unwise. The time required to set up real-time prediction infrastructure, the ongoing maintenance burden, and the monetary cost of having a long-running service are all prohibitively high. Deploying an offline, batch job is complicated enough — why go out of your way to make things even harder?

We’ve found that most of the teams with batch-style use cases for their models simply publish their predictions as… more data. That data can be published in a number of places: databases or data warehouses, business systems like Salesforce or Google Sheets, and even as reports shared via Slack or email.

In addition to reducing complexity, publishing predictions as data has a number of other benefits:

1. **Accessibility**: Running code — whether to build a model or to invoke a REST endpoint — is something most non-technical users don’t know how to do. On the other hand, the number of people who can access, query, and visualize data is much higher. Publishing predictions as periodically-updated data makes those predictions much more widely accessible within an organization.
2. **Robustness**: Software inevitably breaks, and ML models are no exception. If your prediction pipeline breaks, your prediction dataset simply isn’t updated. This certainly isn’t ideal, but often, relying on slightly old data isn’t catastrophic. However, if you’re computing every prediction on the fly, a broken model or service means no predictions are available. You could circumvent this issue by adding a caching layer, but that become yet more infrastructure for data teams to set up, maintain, and debug.
3. **Quality Control**: Of course, models can break even more subtly, returning bad predictions that look correct. Publishing a model as an endpoint means that each individual prediction is computed and returned separately. Measuring and capturing model performance over time requires logging inputs and outputs over a longer period of time and setting up a separate job to measure the quality of your model. When predictions are treated as datasets, you can run metrics & tests over your dataset, often directly as a part of the inference pipeline itself — and critically, detect issues before your predictions are published.

It’s become clear that publishing predictions as dataset is a much smarter, more effective solution than defaulting to publishing a REST endpoint.

But while deploying batch prediction pipelines is *easier* than deploying REST endpoints, it’s certainly not easy. Most of the teams we’ve talked to have strung together a combination of orchestration tools (e.g., Airflow), Kubernetes cluster, and custom code to publish predictions. We’ve been calling this [StackOverflow Infrastructure](https://blog.aqueducthq.com/posts/mlops-right-problem-wrong-solution).

That’s one of the core challenges we’re solving with [Aqueduct](https://github.com/aqueducthq/aqueduct). If you’re interested in learning more, join [our community](https://slack.aqueducthq.com) or [say hello](mailto:hello@aqueducthq.com)!