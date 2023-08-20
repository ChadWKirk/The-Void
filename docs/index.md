---
title: Home
layout: home
nav_order: 1
---

# Big Picture Stuff

Repo URL - [https://github.com/ChadWKirk/The-Void](https://github.com/ChadWKirk/The-Void)

## Notes

when user goes to site, they get prompted to enter their name

when they hit submit, if that name already exists it asks for a different name, if it doesn't already exist then a user gets created in the DB with that name and a random token key then goes to the-void.com/token/name.

when they exit, that user gets removed from the DB

messages are limited to 120 characters

names are limited to 16 characters

background is like an 8-bit star field warp effect. probably use a video

messages have an alert sound

messages disappear in 15 seconds by fading away

## Build

I used Vite for this instead of Create-React-App. This is my first time using Vite.

I used this guide: [https://www.makeuseof.com/set-up-react-app-with-vite/](https://www.makeuseof.com/set-up-react-app-with-vite/)

Resources:

I used this video to learn socket.io:

[https://youtu.be/djMy4QsPWiI](https://youtu.be/djMy4QsPWiI)
