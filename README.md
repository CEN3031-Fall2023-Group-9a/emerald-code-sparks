# Code Sparks

> Computation and Science Modeling through Making

## Project Details
Our project was about developing the site we pulled from the [main repository](https://github.com/UFWebApps2-0/emerald-code-sparks) to look better and work better for users. As such, we had the following objectives:
- Create a Style to apply to the entire website
- Design a brand logo for the site
- Make the landing page for easy navigation
- Create several static pages for all user of the site (about, help, FAQs)
- Implement good site navigation features
  - State tracking for saving work and returning to the last page they were on
  - Create a sense of flow between pages
- Accommodate for different user needs
  - Font type, size, color, and contrast
  - Make code Screen reader friendly
  - Allow for language translations
  - Develop changes for sandbox so users with low vision or motor skills can use it
    - Also should be usable for people who don’t speak English as their native language

<<<<<<< Updated upstream
![Deploy Staging](https://github.com/STEM-C/Code Sparks/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/Code Sparks/workflows/Deploy%20Production/badge.svg)
=======
### Achieved Features
- Of the above tasks, we completed the following features that you can see by running the website within `/client`:
- Website style changes
  - Change from CASMM to Code Sparks
  - Rework the logo for the website
  - Change the favicon for the site
- Quality of Life
  - Add session and local storage timeouts
  - Make buttons and links more interactive
  - Make keyboard navigation act like :hover does
  - Add a website theme that reflects the system settings
  - Change how elements scale with window size
  - Implement Google Translate
>>>>>>> Stashed changes

<br/>
## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `code-sparks-client-dev` - localhost:3000

* `code-sparks-server-dev` - localhost:1337/admin

* `code-sparks-compile-dev` 

* `code-sparks-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/Code Sparks_fork_2023/blob/develop/scripts/readme.md).

* `code-sparks-compile_queue-dev`

#### Running

`code-sparks-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`code-sparks-server-dev`, `code-sparks-compile-dev`, `code-sparks-db-dev`, and `code-sparks-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

<<<<<<< Updated upstream
### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `code-sparks-staging` - [code-sparks-staging.herokuapp.com](https://code-sparks-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`code-sparks-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `code-sparks` - [www.code-sparks.org](https://www.code-sparks.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`code-sparks` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/Code Sparks/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

=======
>>>>>>> Stashed changes
### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit
