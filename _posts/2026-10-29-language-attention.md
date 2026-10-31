---
title: Which programming languages get the most AI attention?
description: Recreating figures from Anna Korhonen's EMNLP 2026 keynote on the global AI divide, but for programming languages, using Hugging Face models and datasets and GitHub developer counts.
code: https://github.com/itsluketwist/blog-languages
---

At EMNLP 2026, I attended a really interesting keynote by Anna Korhonen, titled [*AI for the Many: Starting from the World, Not the Model*](https://2026.emnlp.org/program/keynotes/).

The talk explored the global AI divide, and particularly how unevenly AI models and datasets are distributed across the world's languages. More importantly, it made the case that AI research should start with the needs of people and communities, rather than simply trying to extend ever-larger models to more languages.

One part of the talk that I really enjoyed was the use of simple statistics and visualisations to demonstrate just how uneven the distribution is. How many people speak each language? How many models and datasets exist for it? And how closely are those two things related?

Naturally, as someone who spends a lot of time researching LLMs for code generation, I immediately wondered: **what would these same figures look like for programming languages?**

So I decided to find out!

We (me and my buddy Claude) recreated several of Anna's figures, but with a programming-language twist. Just like the original analysis, we counted models and datasets on Hugging Face, but this time looked for *programming-language* tags instead of *natural-language* tags. We only count resources explicitly tagged with each language, and resources tagged with multiple languages are counted once for each, so the percentages represent shares of language-tagged resources.

We also swapped *native speakers* for *GitHub developers*. Using developer counts from the GitHub Innovation Graph (2026 Q1) and Hugging Face data from October 2026, the analysis covers 259 programming languages.

## Python is the English of coding AI

[![Distribution of Hugging Face models and datasets across programming languages](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/zipf.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/zipf.png)

Perhaps unsurprisingly, Python dominates. It accounts for around 28% of language-tagged models and 24% of datasets, with the top 10 languages accounting for roughly three-quarters of both.

SQL comes in second, which surprised me at first, until I remembered just how much AI research focuses on text-to-SQL tasks!

But perhaps the biggest surprise is **Lean in third place**, with 171 models and 214 datasets, despite having only around 4,400 recorded GitHub developers! This likely reflects the growing interest in AI for formal mathematics and theorem proving.

At the other end of the distribution, there are some interesting cases. Perl, for example, has around 138,000 active GitHub developers, but just one language-tagged model and two datasets!

In fact, only 91 of the 259 languages have at least one tagged model, showing just how concentrated these resources are.

## Does developer popularity explain model availability?

[![Programming language developers versus model availability](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_models.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_models.png)

[![Programming language developers versus dataset availability](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_datasets.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_datasets.png)

This is where things get a bit more interesting.

Among languages with at least one relevant resource, developer population explains only **43% of the variation in log model counts**, and 34% for datasets.

As we saw with Lean and SQL, some languages attract far more resources than their developer populations would suggest. And this isn't limited to those two! Verilog, for example, has as many tagged models as Java (92), despite having around 38 times fewer developers. Solidity and Cypher also stand out.

There seems to be a pattern here: languages associated with specific AI research tasks, like theorem proving, database querying and hardware design, attract a disproportionate amount of attention.

## A different kind of language imbalance

[![Share of developers compared with Hugging Face models and datasets](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/share.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/share.png)

There's another way to look at this: how do the shares of developers compare to the shares of models and datasets?

Languages like JavaScript, TypeScript, Kotlin and Swift have relatively small shares of language-tagged models given their large developer communities.

JavaScript accounts for around 22% of developer-language activity in the data, but only 5% of tagged models. Python, meanwhile, accounts for around 16% of developers but 28% of models.

Of course, there are plenty of reasons for this, as we've seen with specialised tasks like text-to-SQL and theorem proving.

## What can we take away from this?

A few things stood out to me from these figures.

- **AI resources are highly concentrated, but so are developers.** The overall level of concentration is actually quite similar across developers, models and datasets. The interesting part is *which* languages get the attention.
- **Popularity isn't everything.** Languages associated with specific AI tasks, like Lean for theorem proving and SQL for database queries, attract far more resources than their developer populations might suggest.
- **Some very popular languages receive surprisingly little attention.** JavaScript, TypeScript, Kotlin and Swift are all good examples, although that doesn't necessarily mean existing coding models perform poorly on them.

One important distinction is that **dataset counts might be more informative than model counts**. General-purpose coding models can support many languages without being tagged for them individually, making model counts a fairly limited measure. Datasets don't have quite the same issue, although large multilingual code datasets can also be missed when their individual languages aren't tagged.

So these figures aren't a complete picture of AI support for different programming languages, but I think they give us an interesting glimpse into where the AI research community is directing its attention!

## A final thought

I want to emphasise that the significance of these findings is nowhere near that of the original keynote. Ensuring that AI serves people across the world's natural languages is an incredibly important challenge, with real implications for accessibility, inclusion and who benefits from this technology. An uneven distribution of programming-language models is not remotely the same thing.

But I still found it fun to see how some of the same patterns appear in a completely different setting!

Huge credit to **Anna Korhonen** for the original analysis, visualisations and inspiration. The questions, figure designs and idea of comparing Hugging Face resources across languages are directly adapted from her keynote, and I'd highly recommend looking into the original work.

I've put all the code, data, figures and methodological details in a [GitHub repository](https://github.com/itsluketwist/blog-languages), if anyone wants to have a look or play around with the results.

*A final disclaimer: I used Claude Code to help build the repository and produce the figures. I've reviewed parts of the code and results, but haven't checked everything thoroughly myself. So please treat this as a fun exploratory analysis, rather than a fully validated study!*
