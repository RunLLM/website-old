---
slug: the-real-challenge-in-useful-machine-learning-isnt-learning
title: The Real Challenge in (Useful) Machine Learning isn’t Learning
date: 2022-07-21 12:00:00
featured: false
author: joeyg
summary: This post discusses research from the UC Berkeley RISE Lab around building scalable prediction infrastructure, and why that wasn't the problem the world needed solved.
---

Last week, I [reflected on the past decade of ML systems research](https://medium.com/@profjoeyg/how-machine-learning-became-useful-5732c3419c81) and how new abstractions and software frameworks for ML (e.g., scitkit-learn, PyTorch, Tensorflow) catalyzed the readily available data and compute to launch the ML revolution.

This was the state of the world when I went on the academic job market in 2015. The investment in systems for training models made it clear that “learning” was increasingly “solved” (at least for standard models) and I believed the next big frontier in ML systems would be in how we deliver predictions and respond to feedback. This thesis has driven the research in my group over the last 8 years.

In this blog post, I will summarize what was (and remains) the biggest challenge in production machine learning, what we learned, what we got right, and what we got wrong.

# The Next Frontier: ~~Testing~~ Inference

If the process of training models was solved, what would come next?  What do you do with a model once you train it?  You ***test it!***  And, if the accuracy looks good ([perhaps by](https://xkcd.com/1838/) [chance](https://xkcd.com/882/)), you write a paper about it, tweet and blog about the performance, and probably resubmit that paper several times with minor revisions until it gets published. 

I wish I was joking, but this is the life of the modern ML researcher.  The idea that training and testing are the two paradigms of machine learning is so ingrained into our way of thinking that we mainly only discuss train and test data. It is hard to imagine anything beyond the test dataset. But dear ML graduate student, there is more!

Back in the real world, machine learning practitioners use models to make predictions that solve problems. This process of making predictions is called ***inference*** (and sometimes scoring, prediction serving, and model serving).   

**We in the academic machine learning community have been fixated on training models, but what we’ve forgotten is that models only create value when they’re used to solve problems.**

<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/open-challenges.png" />

Historically, companies that have used machine learning successfully have devoted significant engineering effort to inference and the problems around managing the inference process — sometimes even building [custom silicon](https://dl.acm.org/doi/pdf/10.1145/3079856.3080246) exclusively for inference.  For example, in the widely cited Google paper [“Hidden Technical Debt in Machine Learning Systems”](https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf) Scully et al. depicts serving as the largest challenge in production machine learning.

<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/hidden-tech-debt.png" />

But what is so challenging about making predictions from a trained model? After all, in scikit-learn, you just invoke `model.predict(x)`.

# Why is inference so challenging?

When my research group at UC Berkeley embarked on this new inference-focused agenda, we did so from the perspective of technology giants.  My group, like many others, drew inspiration from the challenges faced by sponsors and recent alumni from companies like Amazon, Google, Meta, and Uber.  These large, ML-driven companies had entire teams dedicated to rendering predictions for mission-critical models.  Tasks like real-time click-through rate prediction, content recommendation, fraud detection, and route pricing were central to their business and critically relied on constantly evolving data inputs.  As a result, they were deploying large decision trees and deep neural networks, and they had tight prediction latency requirements (<10ms) for multi-stage prediction pipelines. They needed to support bursts of user traffic and dynamically scale to various tiers of hardware accelerators.  And, all of this had to be done while taking cost, high availability, and large volumes of feedback into account.

<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/learning-vs-inference.png" />

These were the challenges of exciting systems research papers, and we spent the next 8 years writing those papers. As we’d later learn, that wasn’t quite what the rest of the world needed — but we’ll come back to that in a moment.

## Velox: The Proto-Feature Store

Our first project, Velox, bridged our work on machine learning in Apache Spark with the emerging challenges around model deployment. The key insight in Velox stemmed from a common pattern in both classic feature engineering and contemporary deep neural networks: Most models can be decomposed into simple linear models layered over complex-but-slowly-changing features. Velox coupled a fast cache for pre-materialized features with a lightweight real-time serving layer for the simple linear models:

<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/velox.png" />

While this architecture is commonly used in today’s feature stores (see our [blog post](https://medium.com/riselab/feature-stores-the-data-side-of-ml-pipelines-7083d69bff1c)), it was ahead of its time — few teams needed this level of sophistication in 2015. Instead, by that point, the world was eagerly adopting new Python ML frameworks to develop complex multi-stage models. What people *really* needed, we thought, was the ability to serve predictions from multiple frameworks with low latency and high throughput. 

## Shipping Many Models at Once with Clipper

Guided by the lessons learned from Velox, we began to explore a new layered architecture for prediction serving. The idea was to build a middle layer that interposed between prediction requests and the underlying machine learning frameworks used to serve those requests.  This led to [the Clipper project](https://github.com/ucbrise/clipper).

<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/clipper.png" />

Clipper pioneered containerized prediction serving on Kubernetes, enabling low latency and horizontal autoscaling while also addressing the challenges of library compatibility and performance isolation. The middle layer architecture allowed us to implement performance optimizations (e.g., caching, batching) and also implement online learning across ML frameworks. 

Clipper saw adoption by companies like LINE, and many later prediction serving systems including TensorFlow Serving and SageMaker adopted the same architecture. The amazing students involved in the Clipper project eventually graduated, and the architecture was folded into other research projects Cloudflow and Ray Serve. (One of the downsides of being a professor is that your best students always graduate.)

## From Models to Model Pipelines and Auto-Scaling

Many early Clipper users ran into the same basic problem: Before or after invoking a model, they needed to apply custom logic for tasks like computing features or translating predicted probabilities into decisions. In some cases, users wanted to compose multiple models into a single pipeline to render more complex predictions.

**In the same way that simple abstractions enabled powerful ML models, it became clear that a simple abstraction for composing data processing, featurization, and prediction steps would help enable simpler prediction serving.** Serving prediction pipelines was an interesting challenge for two reasons — first, we had to design the right API that enabled users to quickly and intuitively compose their Python operations; second, we needed intelligent infrastructure to automatically manage the scaling, device placement, and queuing overheads of each operator.

<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/cloudflow.png" />
<img src="/blog/the-real-challenge-in-useful-machine-learning-isnt-learning/inferline.png" />

We built two research prototypes to tackle these challenges. [Cloudflow](https://arxiv.org/pdf/2007.05832.pdf) introduced a simple dataflow abstraction for creating prediction pipelines and leveraged the dataflow structure to optimize the performance of these pipelines. [InferLine](https://arxiv.org/pdf/1812.01776.pdf) built out a policy engine and resource manager that used real-world workflow traces to define the optimal resource allocation per stage and to manage resource allocation in response to workflow changes.

# Why Machine Learning isn’t Useful (Yet)

At the end of 2020, we founded [Aqueduct](https://aqueducthq.com) to commercialize our research by building the next generation of *easy-to-use* infrastructure that connects machine learning models to the world.

As we’ve been building Aqueduct, we’ve talked to 160+ data science teams. I can confidently say that we were right: Deploying models for inference was the next step in making machine learning useful. But the biggest lesson we’ve learned is that while everyone is struggling with model deployment, it isn’t for any of the reasons we studied (latency, scale, performance, or even cost). 

**All along, we thought the goal of prediction serving was to build more scalable, higher performance, and more cost-efficient cloud infrastructure. In reality,  no one needed those things (yet) — what everyone needed was an *easier way* to deliver predictions to data systems, products, and processes.** 

Meanwhile, the ML systems community continues to build increasingly sophisticated, difficult-to-manage systems designed for armies of software engineers to operate… and tosses them to data science teams. The worst part is that my research group led the charge towards this engineering-centric infrastructure. Clipper pioneered this design, making the case for microservices running in Docker containers on a Kubernetes cluster, with a highly-configurable auto-scaling middle layer. Oops. 

This is crazy, and it *completely* misses the mark for what most teams need. Data scientists aren’t software engineers and shouldn’t have to battle ops tools on a daily basis to do their jobs (neither should software engineers). **What data science teams need is simplified prediction infrastructure: a lightweight way to design, deploy, manage, and debug data-intensive prediction pipelines in all settings (batch, streaming, real-time) and without ops complexity**. This is exactly what we’ve been working on at Aqueduct. We’ll share more about what we’re building in our next blog post!