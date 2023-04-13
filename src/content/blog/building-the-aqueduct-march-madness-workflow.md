---
slug: building-the-aqueduct-march-madness-workflow
title: Building the Aqueduct March Madness Workflow
author: hari,wei
date: 2023-03-24 12:00:00
summary: See how we used Aqueduct to build a workflow that predicts the results of the NCAA Men's Basketball Tournament.
featured: false
---

Last week, we shared our Aqueduct pipeline to predict March Madness. You can see our live bracket [here](https://aqueducthq.com/march-madness). So far, 30% of our predictions have been correct. 😳 

In this post, we’ll walk through how we set up the Aqueduct pipeline to make these predictions — **you can play around with the Aqueduct workflow in a GitHub Codespace [here](https://github.com/codespaces/new?hide_repo_select=true&ref=ENG-2546-setup-aqueduct-codespace&repo=496844646).**

---

As we mentioned last week, [Kaggle provides an excellent dataset](https://www.kaggle.com/competitions/mens-march-mania-2022/data) with a large history of NCAA tournament games. 

First things first, we needed a data source. We set up a Postgres server and loaded the Kaggle datasets into it. The Kaggle data is broken down into a number of smaller datasets, including regular season data, tournament performance data, and tournament seeding, and so on.

With the data in Postgres, we broke down our pipeline into a few typical steps: data cleaning, train-test split, model training, model validation, and ultimately inference.  The pipeline publishes predictions to an S3 bucket. The final workflow in Aqueduct looks like this:

<img src="/blog/building-the-aqueduct-march-madness-workflow/workflow.png" />

As you can see, we load data from a few different tables, rank the teams, compile the relevant regular season data, and train a random forest model. The model we used was adapted from the winning submission from last year’s Kaggle competition, which you can find [here](https://www.kaggle.com/code/alghanirfan/ncaa-march-madness-random-forest-python). Once the model was built, putting together the Aqueduct workflow took us less than an hour.

With the data and pipeline ready to go, we were able to build a simple bracket visualization using [react-tournament-brackets](https://github.com/g-loot/react-tournament-brackets/tree/ec6fba72fd6b4da2b8ec7c8af0417ce96ca65d0f) and hook up our predictions. You can see the live predictions on our [website](/march-madness).

Of course, as we said above, the predictions we’ve generated have been ~30% accurate so far this year. In other words, a coin flip would be more accurate than our model! 😬 This is the peril of relying on historical data going back 40 years. As the saying goes, past performance is not an indicator of future returns. For example, Alabama is a #1 seed in this year’s tournament but hasn’t been a historically strong basketball school and was actually predicted to lose their first round matchup. (Of course, there’s also Purdue…)

---

Once we had a workflow running, we wanted to make it reusable to let you all play around with it. [GitHub Codespaces](https://github.com/codespaces) makes it easy to create sharable environments. We created a GitHub Codespace that you can clone [here](https://github.com/codespaces/new?hide_repo_select=true&ref=ENG-2546-setup-aqueduct-codespace&repo=496844646). 

This Codespace runs a Dockerfile with an Aqueduct environment pre-configured and with the Aqueduct March Madness profile deployed. The Aqueduct server running in this Codespace has a connection to the Postgres server with the Kaggle data described above and the Aqueduct workflow pre-described. 

When you create the Codespace, you should see the notebook that we used to create the Aqueduct workflow. You will also see a pop-up in the bottom right that there’s a service running on port 8080, which will have the Aqueduct UI and the deployed workflow. 

Let us know what you think! If you’re interested in learning more, check out the [open-source project](https://github.com/aqueducthq/aqueduct) or join our [Slack community](https://slack.aqueducthq.com).