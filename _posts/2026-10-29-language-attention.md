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

We (me and my buddy Claude) recreated several of Anna's figures, but with a programming-language twist. Just like the original analysis, we counted models and datasets on Hugging Face, but this time looked for *programming-language* tags instead of *natural-language* tags. We also swapped *native speakers* for *GitHub developers*. Using developer counts from the GitHub Innovation Graph (2026 Q1) and Hugging Face data from October 2026, the analysis covers 259 programming languages.

## Python is the English of coding AI

[![Distribution of Hugging Face models and datasets across programming languages](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/zipf.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/zipf.png)

Perhaps unsurprisingly, Python dominates. It accounts for around 28% of language-tagged models and 24% of datasets, with the top 10 languages accounting for roughly three-quarters of both.

SQL comes in second, while languages such as JavaScript, Rust and Java also feature prominently.

At the other end of the distribution, there are some interesting cases. Perl, for example, has around 138,000 active GitHub developers, but just one language-tagged model and two datasets!

In fact, only 91 of the 259 languages have at least one tagged model, showing just how concentrated these resources are.

## Does developer popularity explain model availability?

[![Programming language developers versus model availability](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_models.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_models.png)

[![Programming language developers versus dataset availability](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_datasets.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/developers_vs_datasets.png)

This is where things get a bit more interesting.

Among languages with at least one relevant resource, developer population explains only **43% of the variation in model availability**, and 34% for datasets.

Some languages have far more resources than their developer populations would suggest. Lean is a particularly interesting example, with just 4,400 developers but 171 models, likely reflecting the growing interest in AI for theorem proving. SQL is another, helped by the popularity of text-to-SQL tasks.

Meanwhile, languages like JavaScript, TypeScript, Kotlin and Swift have relatively few language-tagged models given their large developer communities.

## A different kind of language imbalance

[![Share of developers compared with Hugging Face models and datasets](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/share.png)](https://raw.githubusercontent.com/itsluketwist/blog-languages/main/figures/share.png)

Looking at the most popular languages makes this especially clear.

JavaScript accounts for around 22% of developer-language activity in the data, but only 5% of tagged models. Python, meanwhile, accounts for around 16% of developers but 28% of models.

Of course, there are plenty of reasons for this. Some programming languages are particularly useful for specific AI tasks, and the number of language-specific models doesn't necessarily tell us how good general-purpose coding models are at writing that language.

In particular, many capable coding models aren't tagged with individual programming languages at all. So these figures tell us about the distribution of *language-tagged resources*, rather than actual coding capabilities.

## What can we take away from this?

A few things stood out to me from these figures.

- **AI resources are highly concentrated, but so are developers.** The distribution of models and datasets is actually quite similar to the distribution of developers across languages. The interesting part is *which* languages get the attention.
- **Popularity isn't everything.** Languages associated with specific AI tasks, like Lean for theorem proving and SQL for database queries, attract far more resources than their developer populations might suggest.
- **Some very popular languages receive surprisingly little attention.** JavaScript, TypeScript, Kotlin and Swift are all good examples, although that doesn't necessarily mean existing coding models perform poorly on them.

One important distinction is that **dataset counts might be more informative than model counts**. General-purpose coding models can support many languages without being tagged for them individually, making model counts a fairly limited measure. Datasets don't have quite the same issue, although large multilingual code datasets can also be missed when their individual languages aren't tagged.

So these figures aren't a complete picture of AI support for different programming languages, but I think they give us an interesting glimpse into where the AI research community is directing its attention!

## A final thought

I want to emphasise that the significance of these findings is nowhere near that of the original keynote. Ensuring that AI serves people across the world's natural languages is an incredibly important challenge, with real implications for accessibility, inclusion and who benefits from this technology. An uneven distribution of programming-language models is not remotely the same thing.

But I still found it fun to see how some of the same patterns appear in a completely different setting!

Huge credit to **Anna Korhonen** for the original analysis, visualisations and inspiration. The questions, figure designs and idea of comparing Hugging Face resources across languages are directly adapted from her keynote, and I'd highly recommend looking into the original work.

I've put all the code, data, figures and methodological details in a [GitHub repository](https://github.com/itsluketwist/blog-languages), if anyone wants to have a look or play around with the results.

*One disclaimer: I used Claude Code to help build the repository and produce the figures. I've reviewed parts of the code and results, but haven't checked everything independently. So please treat this as a fun exploratory analysis, rather than a fully validated study!*
