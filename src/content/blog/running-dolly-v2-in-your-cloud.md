---
slug: running-dolly-v2-in-your-cloud
title: Running Dolly v2 in your cloud
author: cgwu,vikram
summary: Dolly is the first open-source and commercially viable LLM. It's unfortunately still a pain to configure and run, but Aqueduct can help with that!
featured: false
date: 2023-04-13 12:00:00
---

<img src="/blog/running-dolly-v2-in-your-cloud/headline.png" />

Yesterday, the team at Databricks [published Dolly v2](https://twitter.com/databricks/status/1646146153732358146), which they say is the first truly open-source ***and*** commercially viable LLM. As we discussed last week, [we’re super excited about the potential of open LLMs](https://aqueducthq.com/post/building-ml-pipelines-with-open-llms/). 

Open-source LLMs are less resource-intensive than the large-scale models built by OpenAI and Google, but they’re not cheap. Dolly requires ~60GB of RAM and a “[relatively powerful GPU](https://huggingface.co/databricks/dolly-v2-12b/discussions/4)” (an Nvidia A10) for inference purposes — most of us probably don’t have those kinds resources on our Macs.

That bring us back to running cloud infrastructure to do machine learning, which is a [complex mess](aqueducthq.com/post/the-mlops-knot). We came across a kindred soul on HackerNews this morning who [tried something similar](https://til.simonwillison.net/llms/dolly-2) and ended up waiting **********12 minutes********** for a single inference.

That’s where Aqueduct comes in. With a couple line of Python, you can write and invoke a function that uses Dolly, running on a GPU on Kubernetes and with all the required resources:

```python
import aqueduct as aq
client = aq.Client()

k8s_integration_name = "eks-us-east-2" # <- FILL ME IN

@aq.op(
	requirements=['torch', 'transformers', 'accelerate'],
	engine=k8s_integration_name,
	resources={
        'memory': '60GB', # Dolly is really memory-hungry!
        'gpu_resource_name': 'nvidia.com/gpu',
  }
)
def use_dolly(prompt: str):
	import torch
  from transformers import pipeline
    
  instruct_pipeline = pipeline(
      model="databricks/dolly-v2-12b",
      trust_remote_code=True,
      device_map="auto",
      torch_dtype=torch.bfloat16,
  )

	return instruct_pipeline(prompt)

use_dolly('What is the best LLM?').get()
> The best LLM is Neutral Little Mac. It is the most balanced meal plan 
> out of all the low-carb diets. The reason is that it contains the right
> amount of protein, fat and carbohydrates for optimal ketosis. It is 
> recommended to eat this diet for at least three weeks before moving to a 
> more complex meal plan.

# 😬 It looks like our prompt engineering or Dolly itself 
# leaves something to be desired for this particular question. 
```
With the `@op` decorator, you can run Dolly in your cloud seamlessly. Aqueduct will automatically package up your code in a Docker container, install the correct CUDA drivers, and run your function on a GPU in Kubernetes. (In fact, you can even [have Aqueduct create & manage a Kubernetes cluster](https://docs.aqueducthq.com/integrations/on-demand-resources/on-demand-aws-eks-clusters) for you!)

Now that we have a model running, connecting it to your data with Aqueduct is simple:

```python
db = client.integration('my-snowflake-db') # Any DB connected to Aqueduct.
data = db.sql('SELECT * FROM reviews_data;')

use_dolly(data)
```

---

The rate of evolution of LLM technology in recent months has been shockingly fast. With Dolly v2, these capabilities can be used on your private data, but unfortunately, the getting models running in the cloud is still a nightmare. 

That’s where we’re focused on solving with Aqueduct. We’re adding one LOC configuration for popular LLMs and on a number of other features to make this process easier. If you’re interested in running LLMs, please [join our community Slack](https://slack.aqueducthq.com) or [open an issue on GitHub](https://github.com/aqueducthq/aqueduct/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)!