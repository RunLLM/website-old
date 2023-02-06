---
slug: enhancing-airflow-for-machine-learning
title: Enhancing Airflow for machine learning
author: saurav
date: 2023-01-12 12:00:00
summary: "While Airflow is the default orchestrator for machine learning today, it has some key shortcomings: it doesn't care about data, it's not built for fast iteration, and it exacerbates infrastructure complexity. In this post, we discuss how Aqueduct's Airflow integration enhances how Airflow works for machine learning."
featured: false
---

Last week, we discussed the rise of Apache Airflow as the *de facto* orchestrator for data science and machine learning and [its critical shortcomings](https://www.aqueducthq.com/post/stop-using-airflow-for-data-science): It ignores data, exposes (and exacerbates) infrastructure complexity, and deals poorly with quickly evolving pipelines.

We’ve been focused on solving these problems with [Aqueduct](https://github.com/aqueducthq/aqueduct); our goal is to make running machine learning in the cloud simple. However, many data teams already have spent time and resources setting up Airflow, so ripping-and-replacing this infrastructure can be extremely costly. In this context, we’ve been thinking about how to get the best of both worlds.

We’ve built an Aqueduct integration with Airflow that allows you to define, deploy, and monitor a workflow in Aqueduct and use your Airflow cluster as the execution engine. In this post, we’ll use a simple prediction pipeline as a running example to show you:

1. Why running ML on Airflow is challenging
2. How Aqueduct helps
3. How Aqueduct works under the hood

---

A typical ML workflow can have many steps: data retrieval, cleaning, featurization, inference, post-processing, publishing, etc. Each step may have different resource requirements and more complicated pipelines will have parallel operators. Both Aqueduct and Airflow support any DAG structure, so to keep our diagrams & code simple, we’re going to abstract the intermediary stages into a single box. Our simplified pipelines has 3 stages: extracting data from the warehouse, running a model, and publishing the predictions:

<img src="/blog/enhancing-airflow-for-machine-learning/overview.png">

### Deployment

#### Airflow

One of Airflow’s biggest pain points is its complex process for authoring workflows. For our simple example workflow, the Airflow [DAG file](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#declaring-a-dag) looks like the following. Defining this simplified workflow takes about 80 lines of code:

<script src="https://gist.github.com/saurav-c/f9a5877b9cb4712a297d82c3cfe654eb.js"></script>

The biggest pain point in defining this workflow is data movement. While Airflow’s [hooks](https://airflow.apache.org/docs/apache-airflow/stable/concepts/connections.html) allow you to access data systems, Airflow itself has no conception of your data. As a result, you must write custom logic to serialize and deserialize data into the correct format. For example, we use the `SnowflakeHook` in the `extract` operator above but wrote custom code to convert the query results into a DataFrame. 

Once your data is in Airflow, data movement between operators is a challenge. Airflow uses [XComs](https://airflow.apache.org/docs/apache-airflow/stable/concepts/xcoms.html) for data movement, but it is only designed for small data. Its documentation explicitly warns against moving [“large values, like dataframes.”](https://airflow.apache.org/docs/apache-airflow/stable/concepts/xcoms.html#xcoms) Depending on what metadata database you are using, you’re limited to [1]: Postgres: 1 GB, SQLite: 2 GB, MySQL: 64 KB. The alternative is to use a custom XComs backend, which supports AWS S3, Google Cloud Store, etc. However, configuring a custom XComs backend again requires custom serialization logic per-data type. 

#### Aqueduct + Airflow

Aqueduct, on the other hand, has a simple Python-native API: You annotate your functions with `@op` and invoke them regularly — Aqueduct automatically constructs the workflow DAG on your behalf.

Like Airflow, Aqueduct abstracts away data system access. Unlike Airflow’s limitations, Aqueduct treats data as a first class citizen; data objects are moved seamlessly between data systems and operators. Aqueduct handles the serialization process, which means your code can operate on Python-native data types and avoid reinventing the wheel for data movement. Put together, our workflow can be defined in just 22 lines of code (4x shorter than Airflow!) and it looks like this:

<script src="https://gist.github.com/saurav-c/01108c74c07a9e6ad76c4ddaca52dbde.js"></script>

#### How it works

To deploy an Aqueduct workflow on Airflow, we transpile our internal DAG representation into Airflow-compatible code. We built a [DAG generator](https://github.com/aqueducthq/aqueduct/blob/main/src/python/aqueduct_executor/operators/airflow/dag.template) that first transforms each Aqueduct operator into an Airflow task. Each task includes configuration for the required Python environment and an Aqueduct wrapper that handles data movement, Python version management, and metadata capture. These tasks are composed into an Airflow DAG.

Operators you write can accept and return Python objects (DataFrames, JSON blobs, etc.). The Aqueduct wrapper manages data serialization, automatically picking a per-data type serialization method chosen to balance performance and storage cost. In between operators, data is automatically written to S3 to avoid overloading XComs.

### Visibility

#### Airflow

Once a workflow is running, Airflow provides minimal visibility into its execution. Airflow is a *task* orchestrator, so it captures task statuses but has no context around the data in your workflow — both from data systems and in between operators. Debugging issues in your data requires you to snapshot and version your data manually and likely to build custom solutions to visualize or analyze it.

Worse yet, Airflow does not visualize changes to a workflow’s structure, since it does not explicitly track this evolution. Consider the example below of a workflow that starts off with 3 operators.

<img src="/blog/enhancing-airflow-for-machine-learning/airflow-start.png">

If we add a 4th operator, subsequent runs show the new structure, as expected.

<img src="/blog/enhancing-airflow-for-machine-learning/airflow-updated.png">

However, the updated structure is shown for past runs as well. The `transform` operator is shown with a white border, indicating that it did not exist for this particular run. More alarmingly, if we remove the `transform` operator, all past runs would be shown without it — including runs that had the operator! 

<img src="/blog/enhancing-airflow-for-machine-learning/airflow-history.png">

Airflow’s lack of visibility into your data and workflow changes makes debugging an absolute nightmare.

#### Aqueduct + Airflow

Unlike Airflow, Aqueduct explicitly tracks the evolution of your workflow. This enables the UI to show the workflow structure at the time of each run, as operators are added or removed.

<img src="/blog/enhancing-airflow-for-machine-learning/aqueduct-start.png">
<img src="/blog/enhancing-airflow-for-machine-learning/aqueduct-updated.png">

Within each workflow run, Aqueduct provides a preview of all data (including intermediate results), for a wide range of data types: tabular, numeric, text, images, and more. 

<img src="/blog/enhancing-airflow-for-machine-learning/aqueduct-data.png" />
<img src="/blog/enhancing-airflow-for-machine-learning/aqueduct-heatmap.png" />

Finally, Aqueduct also captures the code, logs, and stack traces for every operator:

<img src="/blog/enhancing-airflow-for-machine-learning/aqueduct-code.png">
<img src="/blog/enhancing-airflow-for-machine-learning/aqueduct-logs.png">

Beyond visibility, Aqueduct also makes it easy for you to monitor your workflows: [Metrics](https://docs.aqueducthq.com/metrics-and-checks/metrics-measuring-your-predictions) are numerical measurements of the data generated by your workflow, and [checks](https://docs.aqueducthq.com/metrics-and-checks/checks-ensuring-correctness) allow you to specify correctness constraints. 

#### How it works

Aqueduct’s data versions and metadata (logs, errors, stack traces) are critical for debugging and monitoring. To keep the critical path of workflow execution lean, we do not synchronously communicate metadata from Airflow to Aqueduct. Instead, Aqueduct periodically queries the Airflow API to capture and sync workflow runs and task statuses. Unfortunately, the other metadata generated by the Aqueduct wrapper is not available in this API.

Avoiding synchronous communication results in a new coordination challenge: determining where data and metadata are stored. We solve this by having Aqueduct generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) prefix for each operator’s metadata — this UUID is specified in the generated Airflow DAG. At execution time, the Aqueduct wrapper concatenates the prefix with Airflow’s run ID to form a unique storage location. This allows Aqueduct to deterministically access each workflow’s data and metadata.

### Conclusion

Airflow adoption has grown rapidly in recent years, and it isn’t going away. It excels at orchestrating workflow and managing resources, but as we’ve discussed, it’s not effective for machine learning. With Aqueduct, you can take advantage of Airflow's orchestration and resource management, while using our simple Python API and purpose-built monitoring UI. 

Aqueduct on Airflow still has some key limitations. In particular, it doesn’t completely abstract away infrastructure concerns. You must still configure and run an Airflow cluster; most Airflow deployments are hosted on Kubernetes, so you will also need to manage the Docker containers required for execution.[2] It’s not perfect, but we think it’s a whole lot better!

We’ll be sharing more on other integrations we’re building soon, like Apache Spark + Databricks and Ray. If you’re interested in learning more, [check out what we’re building](https://github.com/aqueducthq/aqueduct) or join our [community Slack](https://slack.aqueducthq.com) to share your thoughts (even if you think we’re wrong!).