# 𒀭𒊩𒌆𒋚 (Ninshubur) [![Build Status](https://travis-ci.org/artamonovkirill/ninshubur.svg?branch=master)](https://travis-ci.org/artamonovkirill/ninshubur)

> Delivers your messages. With a twist. 

[Ninshubur](https://en.wikipedia.org/wiki/Ninshubur) is an [AWS Lambda](https://aws.amazon.com/lambda/) 
function that allows you to post [Slack](https://slack.com/) notifications

## NB!

This is still work in progress.

Backlog:
* MVP:
  * Usage documentation
* Next milestone:
  * user mentions
  * extra hooks for channels
  * buckets in other regions

## Features

* Severity levels expressed by colors:
  * Info: green;
  * Warning: yellow;
  * Error: red;
  * Fatal: red with `@here` mention.
* Integration with [AWS KMS](https://aws.amazon.com/kms/).
* Random quotes from movies and games to add a bit of fun.
* The name and avatar are configurable.
* Deployable with terraform.

## Building a project

### Install dependencies
```bash
npm install
```

### Test
```bash
npm test
```

### E2E test

E2E test is performed with [node-lambda](https://github.com/motdotla/node-lambda).

* Create `e2e/deploy.env`
* Put `SLACK_HOOK=...` in `e2e/deploy.env` 
* Run `npm run e2e`

## Avatar

![Ninshubur avatar](ninshubur.jpg) 

> This image has been extracted from another [file](https://commons.wikimedia.org/wiki/File:Seal_of_Inanna,_2350-2150_BCE.jpg): 
>
>"Old Akkadian cylinder seal representing the goddess Inanna / Ishtar and her sukkal Ninshubur. Akkad period, around 2334-2154 BC. J.-C. Oriental Institute of the University of Chicago." 
> 
> [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/deed.en)