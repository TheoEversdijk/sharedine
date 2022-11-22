# Stable Ubuntu version
FROM ubuntu:22.10
RUN apt update

# Install Node / NPM
RUN apt -y install nodejs
RUN apt -y install npm

# Shift the working directory to the bind mount for CLI interaction
WORKDIR /app/