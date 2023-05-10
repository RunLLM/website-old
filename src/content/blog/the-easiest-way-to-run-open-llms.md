---
slug: the-easiest-way-to-run-open-llms
title: The easiest way to run open LLMs
author: vikram
date: 2023-05-10 12:00:00
featured: true
summary: With Aqueduct v0.3, you can run open-source LLMs with a single Python API call on any cloud infrastructure you use. Now, you can run LLMs without having to worry about data privacy or compliance.
---

<iframe width="100%" height="400" src="https://www.youtube.com/embed/g-lRO7DWWKI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

While [LLMs](https://www.youtube.com/watch?v=LbOvwA_7VZA) have generated significant discussion in recent months, **commercial use continues to be limited.** We’ve heard from ML teams at companies large and small that using hosted, private LLMs like GPT is a non-starter due to concerns around data privacy, regulatory compliance, IP ownership, and cost. 

Open-source LLMs like [LLaMa](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/), [Vicuna](https://vicuna.lmsys.org/), and [Dolly](https://www.databricks.com/blog/2023/04/12/dolly-first-open-commercially-viable-instruction-tuned-llm) have enabled teams to consider using LLMs for internal business applications, but they’re incredibly difficult to operate. At Aqueduct, our goal is to enable teams to do machine learning in the cloud without dealing with operational nightmares.

Today, we’re incredibly excited to share that as of [Aqueduct v0.3](https://github.com/aqueducthq/aqueduct/releases), you can run open-source LLMs in the cloud with a single API call. **Aqueduct is now the easiest way to run open LLMs in your cloud**

Our LLM support combines seamlessly with our existing support for running machine learning tasks on your existing cloud infrastructure. As of this release, we’ve added: 

- a new `llm_op` API that allows you to run an LLMs Aqueduct with no extra cloud configuration
- a new `aqueduct-llm` library that allows you to write custom operators in Aqueduct that use one or more open-source LLMs
    - `aqueduct-llm` is a standalone `pip` package that you can run on a server with a GPU as well
- support for open-source versions of LLaMa, Dolly, and Vicuna, with StableLM and Alpaca to follow soon*
    - automatic resource allocation optimized on a per-model basis**
- the ability to track LLM-specific metadata such as prompts and model parameters in your LLM-powered pipeline

You can see the full documentation [here](https://docs.aqueducthq.com/operators/llms). Running an LLM with Aqueduct is now this easy:

```python
import aqueduct as aq
client = aq.Client()

vicuna = aq.llm_op(name="vicuna_7b", engine="k8s-us-east-2")

generated_text = vicuna("What is the best LLM?")
generated_text.get()
>>> There is no definitive answer to this question, as "best" is subjective 
>>> and depends on the specific use case. However, some of the most popular 
>>> large language models include GPT-3, BERT, and XLNet.
```

You can even process a full dataset with an LLM:

```python
vicuna = aq.llm_op(
	name="vicuna_7b",
	engine="k8s-us-east-2",
	column_name="review",
	output_column_name="response"
)

db = client.resource("snowflake")
hotel_reviews = db.sql("SELECT * FROM hotel_reviews;")

responses = vicuna(
	hotel_reviews,
	{
		"prompt": """
			Given the following hotel review, generate the appropriate response from
			customer service: 
	
			{text}
		"""
	},
)
```

If you’re interested in learning more, check out [our documentation](https://docs.aqueducthq.com/operators/llms), [try it out](https://docs.aqueducthq.com/quickstart-guide), [join our Slack community](https://slack.aqueducthq.com). We have a lot more LLM features planned, so please reach out if you have ideas!

---

*Please note that many of these models — Vicuna, Alpaca, and LLaMa in particular — are released under licenses that do not allow for commercial use. 

**Depending on which models you use, resource requirements will vary. You can use the `resources` [argument](https://docs.aqueducthq.com/operators/configuring-resource-constraints) to customize your resources or have Aqueduct automate it. All models require GPU support; we recommend running them on a large server with GPUs available or on Kubernetes.