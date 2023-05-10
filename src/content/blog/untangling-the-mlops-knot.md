---
slug: untangling-the-mlops-knot
title: "Untangling the MLOps Knot"
author: vikram
summary: MLOps has become increasingly complicated in recent years, but in reality, ML teams have most of the infrastructure they need. Aqueduct helps untangle the knot by integrating with and empowering your cloud.
featured: false
date: 2023-03-02 12:00:00
---

MLOps has become central to machine learning in recent years, but it’s grown out of control. MLOps today is a tangled mess of siloed tools that are difficult to manage, have overlapping functionality, and don’t interoperate. This leaves every data & ML team scrambling to learn new tools for every task and to write glue code that connects existing infrastructure (or lose context). As such, teams spend orders of magnitude more time on infrastructure and less time delivering value with machine learning. **This is the MLOps Knot.**

I’ve [written](https://aqueducthq.com/post/the-mlops-knot/) [extensively](https://aqueducthq.com/post/understanding-the-mlops-knot-metadata-drift/) about this [problem](https://aqueducthq.com/post/understanding-the-mlops-knot-infrastructure-proflieration/) previously. Today, I’d like to look at where we go from here — how we untangle the MLOps Knot. 

---

The MLOps Knot comes from the entanglement of many new tools with custom APIs and siloed metadata. Machine learning is complicated, and each stage of the lifecycle (development, feature processing, training, etc.) requires different tooling. This isn’t a bad thing — ML teams really do need to pick the right tool for each stage, but unfortunately, this creates many metadata silos and a management nightmare.

At first glance, the natural solution to this infrastructure proliferation is to replace everything with a new, fancy end-to-end ML platform, but here’s the secret: **Your team has most of the infrastructure it needs for successful machine learning.**

Every one of the 250+ teams we’ve interviewed has a data warehouse (e.g., Snowflake), a Python notebook (e.g., Jupyter), a large-scale data processing engine (e.g., Spark), a container management system (e.g., Kubernetes), and so on. Adopting that new end-to-end platform likely means rewriting your workloads to fit their APIs and work around their limitations. Not only is this a pile of extra work, it’s simply not necessary.

What ML teams need today isn’t an all-in-one solution that replaces everything in this stack<sup>1</sup>. In fact, the tech stack described above has all the necessary tools for ML teams to be productive. The missing link is in how ML teams interface with that infrastructure: **What MLOps needs is a better way to deploy code, manage results, and share metadata *across existing infrastructure*.**

---

<img 
    src="/blog/untangling-the-mlops-knot/the_ml_stack.png" 
    alt="Aqueduct layers on top of existing infrastructure and allows you to seamlessly run ML in the cloud."
/>

This is what we’re building with [Aqueduct](https://www.notion.so/Untangling-the-MLOps-Knot-e6aa7a08f8684696bb4080453d0e6428): a single interface to run machine learning on your existing cloud infrastructure. 

Aqueduct isn’t building a “better” component for any of the stages of the lifecycle. Instead, we’re building unifying, ML-centric APIs that integrate with and empower industry-standard components.

Aqueduct [integrates natively with your existing tools](https://aqueducthq.com/resources), allowing you to run ML seamlessly in your cloud — we have support for Kubernetes, Airflow, AWS Lambda, and Databricks, with Ray and others to follow. Once your code is running with Aqueduct, you automatically get visibility into whether things work and what’s happening (logs, stack traces, metrics). All of this metadata is organized in a single interface, regardless of whether you’re running on one piece of infrastructure or ten.

Aqueduct has a simple, Python-native interface that allows you to define ML tasks, get them running quickly, and move across infrastructure as needed. Whether that’s going from your laptop to the cloud or from AWS to GCP, Aqueduct has single, Python-native API that gives you the flexibility to choose the best tools for the job.

If that sounds interesting, check out [what we’re building](https://github.com/aqueducthq/aqueduct) or [join the conversation](https://slack.aqueducthq.com)!

---

<sup>1</sup> In reality, for most teams, ripping-and-replacing existing infrastructure is a complete non-starter because ML teams often inherit infrastructure set up by their colleagues on the data team; these teams have likely built significant functionality on this existing stack over time.