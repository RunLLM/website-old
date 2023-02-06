---
slug: how-machine-learning-became-useful
title: How Machine Learning Became Useful
author: joeyg
date: 2022-07-14 12:00:00
featured: false
summary: This post explores how big data, advances in parallel computing, and new abstractions transformed machine learning and artificial intelligence.
---

Artificial intelligence and machine learning have become a critical piece of every aspect of life today. Yet 15 years ago, machine learning was a much smaller research discipline. How did a field born out of mathematics and theoretical computer science join forces with rapid innovation in data and computer systems to change the modern world? This is the question I have been asking myself as I reflect on my research career (and also because I finally made tenure).

Hi, my name is Joey, and I am a professor of Electrical Engineering and Computer Science at UC Berkeley.  Over the past two crazy years, I wrapped up a major [5-year NSF research center](https://rise.cs.berkeley.edu), received tenure (yay!), had a second child (zzzzz), and [launched a new company](https://aqueducthq.com) to transform how organizations deliver predictions.  All this has gotten me thinking: What enabled the ML revolution, and what critical problems are left to solve?

This post is split into two parts — this first part (this post) covers the evolution of the data systems and abstractions that enabled the widespread adoption of ML, and the second post (coming next week!) will cover what’s needed to take full advantage of the massive number of useful models being built today.

This is not a research paper, so there is a lot *more* anecdotal observation and wild speculation.  Let me know what you think!

## Everyone talked about ML, but what they needed was data

It may seem funny, but when I started my machine learning career in 2006, data was far more scarce, and machine learning was dominated by the design of priors and regularization techniques to encode expert knowledge and control overfitting.  However, with the advent of web applications and the emergence of cloud computing, access to data and the tools to compute on that data were radically improving.  These changes shaped both my career and the field of machine learning.

### From the Cult of Bayes to Python Data Processing

As a graduate student (in my *prior* life), I joined the cult of Bayes and was deep in the study of probabilistic graphical models.  Graphical models let you compose basic building blocks of probability to model complex phenomena.  Yes, back in my day, people had to (and even enjoyed) “thinking deeply” about their models and what assumptions they encoded. Today our interesting models are mostly just deep. 

Critically, **graphical models allowed experts to build sophisticated models without the need for large quantities of data.**  However, as we began to have access to larger datasets, we also began to build more complex (and often non-parametric) models that required significantly more computation.

I spent the majority of my years in graduate school and as a post-doc developing both algorithms and systems to support computation on these larger models (and in many cases the data that supported them). It was an intellectually stimulating journey, and in the process, I had the opportunity to pioneer the design of several graph processing systems (GraphLab, PowerGraph, and GraphX), which introduced abstractions and optimizations that are still widely used.

These early graph processing systems began to see adoption beyond traditional graphical models. Simple graph algorithms and more complex matrix factorization algorithms could be efficiently executed using these systems. These algorithms were a central part of many common applications of machine learning (e.g., recommendation and fraud detection). As a consequence, we started to see commercial adoption of our nascent open-source GraphLab research project.

<img src="/blog/how-machine-learning-became-useful/graplab-to-turi.png" />

In 2013, several of my colleagues and I launched a company, Turi, to commercialize the GraphLab project.  Initially, we focused on graph analytics and advanced machine learning algorithms.  While there was a lot of excitement around our ML algorithms, **the majority of our users really needed the ability to process medium-sized data**.  Driven by this need, we broadened our product to support a [wide range of machine learning and data science tasks](https://github.com/apple/turicreate).  What ultimately became a key selling point was the ability to run Python data analysis on data that didn’t fit in memory without the need for a distributed computing platform. Then in 2015, we sold Turi to Apple, where the [technology](https://apple.github.io/turicreate/docs/api/index.html) continues to thrive.  

There was an important lesson hidden in my early journey building GraphLab and Turi: We thought that designing and training advanced models was the key challenge faced by data scientists, but what we discovered was that data scientists were capable of building these advanced models only if they could get and prepare the right data. **We set out to build systems to support sophisticated ML algorithms, and we ultimately converged on tools for processing data in Python.**  

While GraphLab and Turi were successful, they were dwarfed by a sister project that was developed around the same time with similar ML-oriented goals.  However, unlike GraphLab and Turi, this sister project struggled at interesting ML tasks (and still does) but absolutely crushed all kinds of boring-but-critical data processing tasks.  That sister project would grow to be a $38B company and transform the world of data. I’m, of course, referring to Apache Spark and Databricks. 

### Big Data Systems for ML

I got to view the rise of Spark both from the outside (as a graduate student) and from the inside (as a postdoc in the UC Berkeley AMPLab). As a graduate student, I didn’t get Spark. It was a research project focused on parallelizing the “embarrassingly parallel” parts of ML, the parts that are so easy to parallelize you would be embarrassed if you didn’t. How is solving the embarrassingly easy problem research? They added an in-memory cache to support iterative access to data… as any sane engineer would, obviously. Why was everyone so excited about this?

The reality was and is that efficiently and reliably scaling distributed data processing — even when it is embarrassingly parallel — is challenging. There was significant research in everything from query planning to network flow optimization. More fundamentally, Apache Spark was radically simpler to use than its predecessor, the lumbering elephant known as Hadoop, while providing a common platform for everything from SQL queries to advanced analytics and machine learning.  

As a postdoc, I worked on the Spark ecosystem, contributing to MLlib and building the foundations of GraphX. The strength of these systems was not in their ability to do advanced machine learning, but instead in their ability to do basic machine learning tasks on very large datasets. For many, this was (and still is!) enough.

Today, Apache Spark and the growing ecosystem of big-data tools (e.g., Presto, Snowflake, …) have become indispensable pillars in most real-world applications of machine learning. **They process large quantities of unstructured and semi-structured data and reduce them to the essential data needed to train models and deliver predictions.**

Now that we had the ability to generate clean and reliable data, we were finally ready to do machine learning! This put the focus of the community squarely on the frameworks and abstractions to build machine learning models.

## Everyone was trying to do ML but what they needed were the right abstractions

Tools for applying ML techniques have existed for decades with many projects in R, MATLAB, and even Java. However, in most cases, early machine learning software and frameworks were focused on specific techniques — solving a new problem meant adopting a new tool and API. However, this all changed with the introduction of scikit-learn.

While scikit-learn was introduced by INRIA in 2007 it wasn’t until about 2012-2013 that it began to see widespread interest and adoption.  This is precisely when data tools started to mature.

<img src="/blog/how-machine-learning-became-useful/sklearn-trends.png" />

What scikit-learn got right was a simple API for a wide range of models with sensible defaults and the ability to configure algorithm parameters. Furthermore, scikit-learn models could be composed to build pipelines within the same framework. Basically, scikit-learn worked out of the box, and it enabled you to improve the accuracy of your models as your skills grew. Other successful machine learning projects (e.g., XGBoost, Keras) followed this pattern to significant success.

While the majority of real-world applications of ML continue to rely on scikit-learn and XGBoost, the focus of the community and the hype in machine learning has changed. If you go to any ML/AI research conference (turned trade-show) like NeurIPS, all you’ll hear about is deep learning models built in TensorFlow, PyTorch, and (hopefully) Jax. The development and adoption of these frameworks paralleled the growth in interest in their simpler cousins — the combination of access to data & compute with simple abstractions was the key.

### Deep Learning was enabled by Data + Compute + Abstractions

In case you have been living under a statistics textbook from the 1990s, deep learning (the latest brand of neural networks) has achieved the state-of-the-art on a wide range of standard ML benchmarks. Deep learning is widely used for tasks like speech recognition, text-to-speech, computer vision, and machine translation.

The explosion of interest in deep learning was of course driven by the availability of high-quality data and access to affordable compute accelerators on public cloud hardware. **If compute and data are the fuel of the deep learning revolution, it was the abstractions introduced by simple-yet-powerful software frameworks that ultimately catalyzed the explosive progress in deep learning.**

Today, if you can define a clear prediction task, then in a few lines of Python you can automatically apply a wide range of stochastic optimization algorithms on a number of hardware accelerators — all without having to derive a single equation or write a line of parallel code. Systems like Theano, Caffe, and later TensorFlow and PyTorch, helped accelerate innovation in model design by removing the need to address the mathematics or engineering that dominated early work in deep learning and machine learning systems. This has enabled everyone to join in the development of new deep learning techniques and has triggered a tsunami of deep learning research.

In short, the widespread access to data cleaning, distributed systems, and powerful abstractions has made machine learning into the revolutionary technology that it is today.

# What's next for Machine Learning?

In the last 15 years, we’ve simultaneously enabled large-scale data processing, access to compute accelerators at cheap prices, and incredibly powerful software abstractions for ML. So… what’s next?

When I was preparing to go on the academic job market in 2015, it was clear that the massive investment in building models meant that we were going to have widespread adoption machine learning models in the near future. I started asking myself what the next challenge was.

<img src="/blog/how-machine-learning-became-useful/open-challenges.png" />

**If building models was about to be solved, it was clear that the next challenge would be how we used models** — in other words, *inference*. But inference is easy… right? After all, who would build a machine learning model without knowing how they were going to use it? 

In academia, we build models so that we can write papers.  For us, inference is all about “testing” our model or our idea.  This is why we have training and testing as the two dominant stages of machine learning.  Back in the real world, people use models to solve problems.

<img src="/blog/how-machine-learning-became-useful/ml-lifecycle.png" />

Reliably deploying and managing these trained models to render predictions in real-world settings would present entirely *new systems challenges.* Models deployed to improve business practices and augment user interactions would collect new data that could be used for automatic model selection, concept drift detection, and online learning and personalization — effectively opening up new avenues of machine learning research. 

**Unlocking these next steps in machine learning innovation first requires the ability to consistently deliver high-quality predictions.** Many of the biggest challenges in using machine learning today stem not from how we train models but instead from how we deliver these predictions to humans and applications and how we respond to feedback. This thesis has driven much of the research my group has done at Berkeley over the last 6 years and the company I launched with colleagues from Berkeley.

In the next post, I’ll turn to some of the work (both from my group and from other awesome folks in ML systems) that has been done to tackle these problems. It’s safe to say that, despite our best efforts, there’s a lot of work left to be done.