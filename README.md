# **SWORD HEALTH CHALLENGE**

## Instructions

- This repository contains all the necessary and ready-to-use code. It's only necessary to enter each k8s directory and run the command `kubectl apply -f .` to start each pod. The api's docker images are available on my [dockerhub](https://hub.docker.com/repositories).
- When starting the application, two users will be automatically generated for testing. Your credentials can be found in the `DatabaseSeeder` file within the `database module`.
- Also, I'm making json available to be imported into your postman and make it easier to use.
- You'll can check the notifications (when some tech perform a task) on notifications-app logs.

## Informations

- The code was written in **_NodeJs_** and with the **_NestJs framework_**. **_Postgres_** and **_RabbitMQ_** were also used.
- My kubernestes cluster is being managed by **ArgoCD** which is on **Digital Ocean**.
- I'm using [nip.io](https://nip.io) to simulate DNS.

## DEMO

- User api url: `http://143.244.213.215:8080/api`
- RabbitMQ:
  - url: `http://rabbitmq-sword-health.24.199.66.105.nip.io`
  - user: admin
  - pass: admin
- ArgoCD:
  - url: `https://argocd-sword-health.24.199.66.105.nip.io`
  - user: admin
  - pass: 4o5ADu7nc7hr5t9R
