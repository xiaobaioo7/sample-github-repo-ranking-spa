# Simple single page application for github repository rankings

It shows the top 100 starred github repositories with minimal information. For each displayed repository, user can view its latest commits in the past 24 hours.

## Getting started

To get the application running locally:

- Clone this repo
- `cd src` to change directory to the source file folder for the application
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses react-scripts)

Local server will use port 3000 for the dev server and port 35729 for livereload. 

### Running in docker

If you are planning to use Docker to run the application, you can run `docker-compose up -d` from the root of the repo directory. The docker compose file will publish the two ports from the container to the host. You may check the port mapping once your container is running. 

When your container is running, run `docker ps` to grab the ports mapped to the host. Then navigate to url `http://localhost:[HOST_PORT]` to see the application.

## Functionality overview

The application uses github api to search repositories and commits. You can view more information about the api itself at https://developer.github.com/v3/

**General functionality:**

- Searches and shows top 100 starred github repositories
- For each repository, it searches latest commits made in last 24 hours (the list is limited to 100)

**The general page breakdown looks like this:**

- Home page (URL: / )
    - List top 100 starred repositories
- Repository commits page (URL: /repos/:owner/:repo/commits )
    - List latest (up to 100) commits for given repository made in last 24 hours

## Considerations for possible improvements

This is developed in considerably short period of time, some more details and design may need further considerations. Listed below are some of my suggestions to improve the current state of the application.

**Considerations**

- Some UI improvements
    - The repository list shows items all at once. I am using card design and show them in grid style, this may make the page long to scroll especially on smaller device screens like mobile. One idea is to create a pagination effect to break the list down to smaller list, another idea is to make the design more mobile friendly.
- Some functionality improvements
    - The search repository commits api shows up to 100 results per request. Currently it only sends one request. At a given time when the repository has over 100 commits since the last 24 hours, we may consider make multiple calls consecutively.
- Others/feedbacks?
