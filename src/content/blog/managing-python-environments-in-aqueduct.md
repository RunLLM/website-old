---
title: Managing Python Environments in Aqueduct
slug: managing-python-environments-in-aqueduct
date: 2023-01-19 12:00:00
author: wei
featured: false
summary: Managing Python environments is a critical task for workflow orchestration. When done naively, it can lead to incorrect execution or extremely high performance overheads. In this post, we describe how Aqueduct optimizes workflow execution within intelligently managed Conda environments.
---

As an ML orchestration system, Aqueduct’s core functionality revolves around running workflows of Python functions in the cloud. This requires the cloud environment to match the Python environment in which the workflow was built — both the Python version and any library dependencies. Mismatches can lead to a number of difficult-to-debug errors like serialization bugs and numerical inconsistencies that cause `NaN`s and diverging algorithms.

At first glance, Python environment management might seem easy: simply install the right Python version and matching library dependencies in the cloud before running each function, right. As always, the devil is in the details. Our cloud environment may have other Python code running — other applications or other Aqueduct workflows — and each one of these workloads might have a unique, conflicting set of dependencies. As such, naively installing the packages for each function can cause new or existing workloads to unexpectedly break.

For those of you familiar with cloud infrastructure, this is a classic challenge around environment isolation that can be solved with containerization or virtual machines. Unfortunately, many of the teams we’ve interviewed don’t have the scale or ops expertise to justify running their workflows on anything but a single server. After all, why make things more complicated than they need to be? Within a single server, Docker containers can quickly eat up disk space and slow down performance — not to mention the headache of building a Docker container every time you run a workflow.

This leaves us with the challenge of supporting efficient, lightweight Python environment isolation on a single server. We settled on Conda as our isolation mechanism, as it’s the *de facto*standard for Python environment isolation.

Our solution is conceptually simple: For each Python function Aqueduct runs, it creates a Conda environment with the matching Python version and library dependencies and runs the function within that environment. Because functions are always executed in newly created Conda environments, other applications and pipelines are unaffected.

While this naively achieves environment isolation, building a new Conda environment for each function is both slow and consumes significant storage space — each environment can be a few GBs in size.

Consider a function that requires Python 3.9 and the `scikit-learn` package. To run this function with Conda, the following needs to happen:

<script src="https://gist.github.com/vsreekanti/e43f507c6a0eec00c5b4a9f7142cb382.js"></script>

For a single function, setting up a new environment adds a 63 second overhead, and this environment takes 978 MB of storage space. Most workflows will share a single Python version and set of dependencies across all their functions, so repeating this work for every stage of a potentially-large workflow would be silly.

There are two techniques Aqueduct uses to reduce this overhead: inheriting and reusing environments.

### Environment Inheritance

From the example above, we can see that each Conda environment requires a Python version, the `aqueduct-ml` package, and any additional function-specific dependencies. The first two components are shared across all functions, so we optimize environment creation by pre-configuring Conda environments for each Python version (e.g., Python 3.9) with Aqueduct installed. 

When creating a new environment for a function, we inherit from the base environment and only install custom dependencies in that environment. In the third command, we use `conda develop` to link the dependencies pre-installed in the base environment (which has minimal, shared requirements) into the new environment.

<script src="https://gist.github.com/vsreekanti/77bdfebbe09a714abd0d4218167dd9fe.js"></script>

Compared to building each environment from scratch, this approach saves us 56 seconds (89%) per-function for every function using Python 3.9. We also save 745 MB (76%) of storage for each new environment.

### Environment Reuse

Functions within a workflow also usually share the same library dependencies. Of course, this might not be true for complex workflows, but this allows Aqueduct to optimize for the common case by reusing previously created environments.

For each environment, we compute a “signature” for the environment by hashing the Python version and the installed dependencies. This signature is stored in our metadata database, and when a new function arrives, we check the database for a matching signature. If one exists, we simply switch to that environment to run the function<sup>1</sup>, which only takes an additional 0.8 seconds — that’s another 88% improvement over the inherited environment. If there is no match, we fall back to using the inheritance technique above to create a new environment. 

Existing Conda environments become obsolete when the user deletes a workflow or updates a workflow with new requirements. To avoid ever-growing storage use, we garbage collect deprecated environments on workflow change and deletion.

## Wrapping Up

Managing Python environments in the cloud can be a complex task, especially when dealing with conflicting requirements for different functions. Aqueduct uses Conda to create isolated environments for each function and leverages inheritance and reuse to optimize performance over a naive solution. This minimizes set-up and management, achieves clean environment isolation, and adds minimal performance overhead. 

Of course, for more complex workflows, Aqueduct supports executing workflows on Kubernetes, AWS Lambda, and Spark or Databricks (coming soon). We’d love to hear your thoughts and feedback on what we’re building — check out our [docs on setting up Conda](https://docs.aqueducthq.com/integrations/adding-an-integration/connecting-to-conda), download the [Aqueduct open-source project](https://www.notion.so/Managing-Python-Environments-in-Aqueduct-f8b93d42dc00429f95abd95f4652a6e6), or join our [community Slack](https://www.notion.so/Managing-Python-Environments-in-Aqueduct-f8b93d42dc00429f95abd95f4652a6e6) to say hi!

---

<sup>1</sup>Note that this assumes that every function is side effect-free and isn’t installing dependencies without Aqueduct’s knowledge. Aqueduct doesn’t currently prevent this, but this is a challenge for another day.