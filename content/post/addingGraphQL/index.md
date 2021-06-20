---
layout: post
title: Note to future me — Adding GraphQL to an app
image: helloBlondie.png
description: >-
  Adding the library to the app see commit
  03bd7a7534f7a23276fc47c4f7c94d7ac153bc0b
date: 2018-04-08 21:36:13
categories: []
keywords: []
---

Adding the [library](https://github.com/apollographql/apollo-android) to the app see commit 03bd7a7534f7a23276fc47c4f7c94d7ac153bc0b

*   plugin
*   dependencies

Making a service

*   wrapping and existing endpoint [https://github.com/joakin/wikimedia-graphql](https://github.com/joakin/wikimedia-graphql)
*   install node if you don’t have it. node — version
*   running the service \`node index.js\` 
*   [play with the service](http://localhost:3002/graphiql) 

[https://gist.github.com/maiatoday/578aebcee3bd9decb6e3c6833c73a4ba#file-wikipage-graphql](https://gist.github.com/maiatoday/578aebcee3bd9decb6e3c6833c73a4ba#file-wikipage-graphql)

*   getting the json.schema [https://github.com/apollographql/apollo-codegen](https://github.com/apollographql/apollo-codegen)
*   cd app/src/main/graphql/net/maiatoday/helloblondie
*   apollo-codegen download-schema [http://localhost:3002/graphql](http://localhost:3002/graphql) — output schema.json

Adding the service to the app

*   adding a query
*   adding the schema a5a47f0ff45f6bc5d5a3aa6f1fee50af363f7893
*   getting access to the service
*   calling the service

![]({{site.baseurl}}/assets/img/helloBlondie.png)

[Some pointers on query syntax](https://github.com/mugli/learning-graphql/blob/master/2.%20Basic%20Query%20Syntax.md)

[Gitrepo](https://github.com/maiatoday/HelloBlondie/tree/graphql)

  

\`sudo apollo-codegen introspect-schema [https://api.blargh.com/graphql](https://api-dev.nomanini.com/transaction-gateway/graphql) — header “Authorization: Bearer xxxx” — output schema.json\`
