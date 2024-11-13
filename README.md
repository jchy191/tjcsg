# Overview

The onset of the Covid-19 pandemic brought about many disruptions and changes not just in society, but even in church as well. One benefit that arose as a result was a push in Internet Ministry initiatives in True Jesus Church Singapore. Back then, there was a need to revamp our old website (which was not actively maintained and was even hacked), and the first version of tjc.sg was swiftly put something together using a website builder tool called Wix.

The website was primarily used to support our evangelistic services, by having "e-leaflets" that members could share with their family and friends, as well as livestreams for the services themselves.

As the Internet Ministry team grew and mature, more ideas arose as to what this website could be used for. In particular, to have FAQ articles for our basic beliefs that are easily findable from search engines like Google. 

However, it was quickly realised that using a website builder like Wix greatly limits how much flexibility the team has with the site, and after much consideration, the decision was made to embark on TJCSG 2.0 - coding up our own website ourselves from scratch.

We thank the grace of God that much progress have been made on TJCSG 2.0 and the site is now live at https://tjc.sg.

This write-up aims to give a non-technical overview to anyone interested, as well as serve as a guide to future content managers and software engineers who choose to serve in this ministry.

**Table of Contents**
<ol>
  <li><a href="#purpose-of-the-website">Purpose of the website</a></li>
  <li><a href="#rationale-and-considerations">Features</a></li>
  <li><a href="#tools">Tools</a></li>
  <li><a href="#ownership">Ownership</a></li>
  <li><a href="#feedback">Feedback</a></li>
</ol>

## Purpose of the website

As alluded to above, the purpose of the website is still primarily for evangelism. Currently, much of the TJC doctrinal content worldwide are all in PDF documents. These do poorly on search engines, meaning that a truthseeker searching on Google about questions related to our doctrines are unlikely to see our church resources. We hope to slowly add more content on the website, be it doctrinal or devotional, in hopes that a truthseeker might chance upon while using a search engine. 

In fact, for quite a few years ever since the first website was up, the top result of searching "Is footwashing needed for salvation" on Google was one of our tjcsg webpages on the necessity of footwashing. This was something that gave the team much hope, and the team realised that adding more doctrinal content on the web for people to encounter is our way of "by all means saving some" (1 Corinthians 9:22).

It is also hoped that the website will a tool to assist members in preaching the gospel, be it through sharing articles which answers their friend's questions, or by sharing invites to upcoming events. The team aims to maintain the website well, ensure it is usable and somewhat aesthetically pleasing, so that it is something that members can be proud of.

The website will also serve as a resource for members themselves as well, be it the doctrinal/devotional articles or the Closer Day By Day articles housed on the website.

## Rationale and considerations 

The benefit of using Wix during the pandemic was that it allowed brethren who did not have software engineering backgrounds to work on the website. This allowed the website (which was urgently needed at the onset of the pandemic) to be quickly put together.

However, the team faced many issues the more we worked with Wix. There was a lack of flexibility when it came to designing the website, and though it was meant to allow non-coders to work on the website too, we quickly realised that non-coders were also struggling to use Wix. There were also many performance issues as the website would take a long time to load.

After much wrestling with Wix and more than a year of deliberation, we decided to code a website from scratch and work on TJCSG 2.0 began. 

The biggest concern with coding a website from scratch is that only software engineers will be able to work on the site. To address this, Contentful is used as our Content Management System (CMS), where all the web articles are stored. By logging in to Contentful, non-coders will be able to add, edit, and delete webpage articles (see section for Content Managers below). 

Moreover, with the trend being more and more brethren studying Computer Science, we decided that going ahead with coding a website from scratch would still be a worth while endeavour. This code base is public and any interested brethren with a coding background can access to the code base, making it easier for them to work on the website in the future should they ever decide to do so.

## Tools

GitHub is where all our code is stored and is used as our version control system.

Contentful is our Content Management System (CMS) of choice, and allows anyone to add and edit articles to the website without needing any technical background.

Vercel is what we use to host our site, and Cloudflare is our DNS provider as well as our proxy (providing us with analytics as well as protecting us from DDoS attacks).

## Ownership

All accounts used are shared Internet Ministry accounts. 

Those who are familiar with and have access to Contentful are Sis. Rebecca Tan (Telok Kurau Church), Bro. Joash Chin (Telok Kurau Church) and Bro. Joshua Chin (Adam Road Church). 

Currently, the software engineers working on the project are Bro. Joash Chin (Telok Kurau Church) and Bro. Joshua Chin (Adam Road Church). As mentioned above, the plan is to give more software engineers access to the code base so that they can play around/familiarise themselves with it.

This document also intends to help with future succession, as the later part will have instructions for future content managers and software engineers.


## Feedback

We intend for the work on this website to be continuous and long term. Any feedback, comments or suggestions can be shared with any member of the Internet Ministry team.

Some possible future extensions for the website that come to mind are:
* Add support for more languages such as Burmese and Thai (to help with the ministry work in South East Asia)
* Add a members resource section, for members to access photos (like our current TJC SG Photos facebook group), recordings (like our current eLibrary), etc.



# For Content Managers (TODO)

Content managers 

## Contentful

1. Log in to Contentful using the Internet Ministry gmail account.
2. Click on "Content"

### Add Event

### Add Article

### Add CDBD Schedule

## Changes to text on the site

To make changes to any of the texts


# For Software Engineers (TODO)

## Setup

Environment variables required:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_SECRET=
CONTENTFUL_REVALIDATE_SECRET=
TWITCH_PARENT=
NEXT_PUBLIC_WEB3_ACCESS_KEY=
```

The `CONTENTFUL_*` variables should be obtained from contentful. `TWITCH_PARENT` should be `localhost` if developing locally.

`NEXT_PUBLIC_WEB3_ACCESS_KEY` should be your web3forms access key pointing to your email address to receive emails via the contact form.
