---
slug: building-ml-pipelines-with-open-llms
title: "Building ML Pipelines with open LLMs"
author: cgwu
date: 2022-04-06 12:00:00
featured: true
summary: LLMs are incredibly powerful, but enterprises are constrained by the inability to use them with proprietary data. Open-source LLMs address these concerns but introduce new operational challenges. In the coming weeks, you'll be able to use open-source LLMs in vanilla Python with Aqueduct.
---

Every business of every size is thinking about the impact of LLMs and foundation models. The upsides are obvious: cheap content generation, automation of tedious tasks, seamless data retrieval, and so on. Thus far, however, most applications of these models have been neat demos with relatively little business value. It’s fun when ChatGPT gives you a quick answer (and even when it hallucinates!), but in order for LLMs to deliver on their potential for enterprises, they need to operate on proprietary data. Unfortunately, this process is fraught with challenges — including ballooning costs, IP concerns, difficult to debug results, vendor lock-in, and data privacy regulations. 

In recent weeks, we’ve seen a number of open-source LLMs be released. Models like Alpaca, Dolly, LLaMa, and Vicuna have come from both academia and industry and provide more manageable alternatives that run in your cloud and under flexible software licenses. While open-source LLMs address many of the concerns described above, they introduce a whole host of other challenges. [Running ML in the cloud is hard enough as it is](https://aqueducthq.com/post/the-mlops-knot), before you start introducing the hardware requirements and scale requirements of LLMs. 

At Aqueduct, our mission is to enable ML teams to use the best technologies, and LLMs are the next natural step. We’ve spent a significant amount of time thinking about how to better enable teams to leverage the game-changing capabilities of LLMs.

<img src="/blog/buildilng-ml-pipelines-with-open-llms/architecture.png" />

Yesterday, I gave a talk at the [AI Camp Meetup in SF](https://www.aicamp.ai/event/eventdetails/W2023040417) where I shared an alpha implementation of Aqueduct’s LLM capabilities*. In brief, we’re enabling you to do something this:

```python
import aqueduct as aq

@aq.op(
	engine='kubernetes',
	requirements=[aq.llm.llama],
	resources={
		'gpu_resource_name': 'nvidia.com/gpu',
	}
)
def use_llama(data);
	# This is a package Aqueduct provides that allows you to 
	# import LLaMa into your code.
	import llama 
	results = [llama.generate(entry) for entry in data]

	return results
```

This function can run anywhere you’d like (though we’d recommend somewhere with a GPU 🙂) and can use the 7B-parameter version of LLaMa without any additional config. Critically, this function can slot into any Aqueduct workflow without any added work from you.

If you just want to test it out, you can do that as well:

```python
import aqueduct as aq
aq.llm.llama.generate('What is the easiest way to build ML pipelines?')
> Aqueduct 😉
```
---

Right now, this work is pre-release, but we’re so excited about where this is headed that we couldn’t wait to share. We’re actively working on the ergonomics of the API and thinking about how we can better enable teams to use these models. **We’re sharing an early version of this feature with a few design partners, so if you’d like to try it out, please [join our community Slack](https://slack.aqueducthq.com)!**

---

*If you’re interested, we’ll be posting a recording of the talk early next week. Follow us on [Twitter](https://twitter.com/aqueducthq) or [LinkedIn](https://linkedin.com/company/aqueducthq) to keep up to date!