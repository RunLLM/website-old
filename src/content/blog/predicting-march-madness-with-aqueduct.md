---
title: Predicting March Madness with Aqueduct
slug: predicting-march-madness-with-aqueduct
date: 2023-03-17 12:00:00
author: vikram
featured: false
summary: It's March, and that means it's the NCAA tournament! See how you can build a workflow to predict the NCAA tournament with Aqueduct.
---

It’s that time of year again: A bunch of us at Aqueduct are big fans of the NCAA tournament, and we couldn’t resist the opportunity to see if we could do a little bit of machine learning to predict how the games would go. 

<img src="/blog/predicting-march-madness-with-aqueduct/bracket.png" />

We were excited to discover that there’s a [Kaggle competition](https://www.kaggle.com/competitions/mens-march-mania-2022) for this with a long history! This made our lives much easier.

Over the last couple weeks, our team has been looking through past submissions and identified [one of the better models in recent years](https://www.kaggle.com/code/alghanirfan/ncaa-march-madness-random-forest-python). We’ve built an Aqueduct workflow that uses this model and the Kaggle data to make predictions for all the possible matchups in the tournament:

<img src="/blog/predicting-march-madness-with-aqueduct/workflow.png" />

We’re really excited about this, so we wanted to share. We’ve built a bracket that show’s the model’s predicted likelihood for each matchup. This will update every day as the tournament progresses, so you can see who’s most likely to win the game on each day. Check it out [here](https://aqueducthq.com/march-madness/)!

If you want to refine our pipeline, build your own model, or get a sense for how Aqueduct works, you can check out what we’ve built:

- you can find the notebook with the Aqueduct pipeline [here](https://github.com/aqueducthq/aqueduct-march-madness).
- you can start a GitHub Codespace* [here](https://github.com/codespaces/new?hide_repo_select=true&ref=ENG-2546-setup-aqueduct-codespace&repo=496844646) that has the Aqueduct server running, the notebook available, and the corresponding Aqueduct workflow preinstalled.

In the coming weeks, we’ll share more about the work that’s gone into this pipeline, but for now, happy tinkering! If you’re interested in learning more, [join our Slack community](https://slack.aqueducthq.com) and say hello!

---

*In case you were wondering, GitHub Codespaces is a tool that allows you to create a development environment with your GitHub repository directly in the cloud. Every GitHub account comes with 120 hours per-month of free Codespace usage.