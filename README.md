# ML Patari Weavings - An Art Showcase

This repo contains the current draft of a website I am building for my mom Mary Lou Patari in order to boost the online profile for her art.  ML's work can currently be found at craft fairs, and farmer's markets in the southern Vermont area.

## Structure and Functionality

The site allows customers to browse the current pieces that ML has for sale. It provides an image, description and price for each.  Clicking on any image's card will provide a closer look and give users a form they can use to ask questions or let ML know they are interested in the piece.  ML's preference is that this site is a way to get in touch with her, rather than a commerce platform, so there is no way to directly purchase on the site.

There are also features of the site built just for ML or anyone else who might be authorzed to manage the pieces diplayed.  For ease of access during the current development phase, these features are accessed via the "seller" link in the footer.  For deployment this link should be removed, and the sellers provided with a URL that accesses these features.  Having the URL is not the only layer of protection to prevent non-sellers from changing the pieces displayed.  Sellers are asked to provide usernames and passwords, with hashing and authentification provided by [bcrypt](https://www.npmjs.com/package/bcrypt).  

This project is currently in development, and as a result some information and features will likely change before deployment.

## Setup


You are welcome to fork, clone, and modify this repo for any purpose.  In order to run it on your own local machine, you'll need to cd to the project directory and run a few commands in the terminal:
```bash
pipenv install
```
```bash
pipenv shell
```

Stay in the server directory and run:

```bash
flask db init
```
```bash
flask db migrate -m'create tables'
```
```bash
flask db upgrade
```
```bash
python seed.py
```

To start a local server:
```bash
python app.py
```
From there, open a new terminal in the main directory and run:
```bash
npm install --prefix client
```
You should see a working version running on your machine!

---

## Acknowledgments

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [SQLAlchemy](https://www.sqlalchemy.org/). It uses [Bootstrap React](https://react-bootstrap.netlify.app/) and [Bootswatch](https://bootswatch.com/) for styling, plus [Formsubmit](https://formsubmit.co/) to send emails.  Thank you to the folks who created and maintain those resources.

