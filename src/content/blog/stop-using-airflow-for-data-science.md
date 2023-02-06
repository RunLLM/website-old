---
slug: stop-using-airflow-for-data-science
title: Stop using Airflow for data science
author: vikram
date: 2023-01-05 12:00:00
featured: false
summary: Airflow has become the default data engineering orchestrator in recent years, and data science teams have inherited it. Unfortunately, Airflow wasn't designed for machine learning workflows — using Airflow for ML results in significant overhead and tech debt.
---

<img src="/blog/stop-using-airflow-for-data-science/meme.png">

Over the last couple years, we’ve spoken to 200+ data teams about how they manage & orchestrate production ML. A large majority of these teams are using Apache Airflow, primarily because it’s been around for a long time and it’s become the default place to run data pipelines. Data teams have also flocked to Airflow in recent years, so when teams start doing machine learning, Airflow is already around. Might as well use it since it’s already set up, right?

Unfortunately, it’s the wrong choice. Issues with Airflow are extensively documented — most recently, Stephen Bailey wrote a [breakup letter to Airflow](https://stkbailey.substack.com/p/airflows-problem). But beyond the standard complaints, it’s becomes clear to us that Airflow’s flaws are amplified for data scientists. 

### **It doesn’t care about data**

*Data* is at the heart of data science. The world’s most popular orchestrator for data science… completely ignores your data? That’s kind of crazy! 

A data scientist might reasonably ask, “What data did my DAG run on, and where did that data come from?” Airflow has no idea — but come on: All you have to do is check the code to see where data came from and where the results went, so that’s not so bad. 

Next, you might wonder if you could capture some summary statistics about your data — all you have to do with Airflow is to set up a separate database to track your metrics and then develop a versioning system that allows you to correlate your logged metrics back to the actual runs that happened in Airflow. In other words, completely ignore Airflow and build a metrics library. Sounds easy, right? 

Airflow completely ignores everything about your data, and you’re either flying blind or reinventing the wheel — building serialization protocols, versioning schemes, and metrics databases to track the basics of your pipelines.

### It doesn’t abstract away complexity

Typically, we expect software to abstract away the complexity of underlying layers. Databases don’t force you to define your own serialization mechanisms, and operating systems don’t ask you to manage process eviction by hand. 

Airflow, on the other hand, forces you to manage all aspects of your workflow manually. It doesn’t have the ability to pass data between operators<sup>1</sup>, so you need to set up a separate storage system as a data exchange layer. Then you have to set up your Kubernetes cluster, build a Docker container per-operator, and write a serialization library to manage data movement between operators. After all that, Airflow will make sure that your workflow runs as expected. Orchestration and scheduling are important tasks, but they’re one small part of the puzzle. 

Airflow gives you an API to define a workflow but then immediately forces you to look under the hood of that workflow: Where does it run, what configuration does it require, how do I manage my Python versions, and how does the data get into and out of each container?

### It’s not built for fast iteration

Stephen pulls out a telling quote from the Airflow README:

> Airflow works best with workflows that are mostly static and slowly changing.

Data science, on the other hand, is all about quick iteration: try out a model, measure the results, and update often. Running data science workflows on a system that is ********designed******** for static workflows that change slowly makes no sense, and it incurs significant complexity. Concretely, this means that it’s a pain to update (by forcing you to maintain a directory of workflow specs) and deals very poorly with changing DAGs. In fact, Airflow does not show you historical versions of your workflow structure, forcing you to manually version your workflows over time.

In order to wrestle Airflow into submission, we’ve heard data teams build CI/CD pipelines that automatically validate ML pipelines, build and ship Docker containers, update Airflow’s metadata, and wait for changes to propagate. In essence, these teams are abstracting away Airflow rather than working with it.

---

For teams running simple workflows that orchestrate other systems (e.g., dbt or Snowflake), Airflow is a great tool to execute & track API calls. Unfortunately, almost every data science workflow we’ve come across doesn’t fit this description. 

Data science pipelines on Airflow are slow to deploy (because they require manual infrastructure management), difficult to monitor (because Airflow gives you very little context), and impossible to debug (because you don’t have access to logs & stack traces). 

There’s a lot of room for improvement here, and we’ve been building [Aqueduct](https://github.com/aqueducthq/aqueduct) to make data teams more productive by abstracting away cloud operations and helping teams focus on better data science & machine learning. 

---

<sup>1</sup>XCOM does indeed allow you to pass data directly between operators, but the data is stored in Airflow’s metadata database directly; if you’re passing actual data between operators, you’re quickly going to blow past the storage on your Airflow server.