---
slug: mlops-right-problem-wrong-solution
title: "MLOps: Right Problem, Wrong Solution"
author: vikram
date: 2022-08-02 12:00:00
featured: false
summary: The fundamental problem with MLOps is that it mixes together tools for two very different concerns — (1) ensuring high-quality predictions and (2) deploying & managing cloud infrastructure. As a consequence, this requires data teams to have expertise in both data science and also in low-level cloud infrastructure.
---

It’s become clear in recent years that the [next critical challenge in making machine learning models broadly useful](https://www.notion.so/MLOps-Right-Problem-Wrong-Solution-27d3d59d291f4bcfbdfdbef61b55bfc1) is operationalizing ML — moving models from development environments and running them on cloud infrastructure. MLOps tools purport to solve this problem, but we’ve become convinced that **MLOps is taking us in the wrong direction** by building complex, engineering-centric infrastructure that requires an army of operators.

---

Over the last year, we’ve interviewed close to 175 data teams to understand their challenges in using ML models in production. Most data teams describe the process of packaging up models, connecting them to data & business systems, and monitoring ongoing prediction quality as a significant blocker to the success of ML projects.

MLOps tools “solve” this problem by providing APIs for complex cloud infrastructure and delegating operational responsibility to a team of cloud experts. We agree that better tools for operationalizing ML are needed, but MLOps is the wrong solution.

Today’s MLOps technologies were designed by engineers at the worlds most advanced ML companies, but they were also designed ***for engineers*** at the world’s most advanced companies. With these tools, the process of deploying, managing, and debugging models and predictions requires a significant engineering investment. Teams need to deploy & scale Kubernetes clusters, set up networking abstractions and load balancers, and write 1,000s of lines of YAML configs to deploy a single prediction pipeline.

The catch is that data scientists are not software engineers — in most data science curricula (like the [one we helped build at UC Berkeley](https://data.berkeley.edu/academics/data-science-undergraduate-studies/data-science-major)), students learn data prep, data visualization, statistical modeling, and reporting (e.g., building graphs, writing summaries). None of these tasks require deep cloud expertise, and most data scientists we’ve spoken to don’t have software engineering backgrounds. We believe data scientists shouldn’t have to become cloud experts to be successful.

**The fundamental problem with MLOps is that it mixes together tools for two very different concerns — (1)  ensuring high-quality predictions and (2) deploying & managing cloud infrastructure.** As a consequence, this requires data teams to have expertise in both data science and also in low-level cloud infrastructure.

This leads organizations to hack their way around the problem using one of two anti-patterns: 

1. **StackOverflow Infrastructure.** Smaller organizations with fewer resources leave data scientists to figure things out themselves. Most data scientists search for the simplest solution, often hacked together from many different technologies and StackOverflow answers (MLOps or otherwise). Data scientists are generally capable of getting the job done, but setting up this infrastructure is a huge time sink, it’s brittle to maintain (an even worse time sink), and it incurs significant long-term tech debt. 
2. **The Great Handoff.** As teams mature, they realize that forcing data scientists to run their own infrastructure is untenable. They allocate additional engineering time to support the data science teams and offload infrastructure responsibilities to the engineers. While this simplifies data scientists’ lives, it creates a number of organizational and technical pitfalls:
    1. engineers are flooded with *ad hoc* requests for tiny model updates and periodic quality checks.
    2. ML projects can fail in subtle ways (e.g., model drift, data distribution shift, schema change); engineers are unable to identify and address issues because they are typically unfamiliar with the underlying models and assumptions
    3. in order to enable data scientists to debug models, engineers must ferry data, metadata, and logs between production environments and data scientist-friendly tools

In short, MLOps tools aren’t setting  up the vast majority of data teams for success. **MLOps tools put the responsibility for the success of machine learning on engineering teams (the wrong stakeholder), while being far too difficult for data scientists to use (the wrong technology).**

Data scientists should be in charge of ensuring high-quality predictions, and they shouldn’t be distracted by managing cloud infrastructure. We call that *production data science*. In 2022, cloud infrastructure can & should be abstracted away behind a well-designed, domain-specific API. That’s why we’re building **[Aqueduct](https://github.com/aqueducthq/aqueduct)**: an open-source production data science tool that provides a high-level API for designing, deploying, and monitoring prediction pipelines, while also seamlessly integrating with infrastructure managed by existing DevOps teams. If that sounds interesting to you, check out [what we’re building](https://github.com/aqueducthq/aqueduct) — [we’d love to hear from you](https://twitter.com/aqueducthq)!