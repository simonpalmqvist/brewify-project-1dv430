# Brewify

A web application for beer recipe design done as project in course 1dv430 at Linneus university. Built with Meteor, React and Redux.

## Setting up dev environment

```
#Install Meteor
curl https://install.meteor.com/ | sh

#Install npm dependencies
npm install

#Need to install meteor up globally for deploying
sudo npm install -g mupx

#For acceptance tests chimp needs to be installed globally
sudo npm install -g chimp
```

## Start system
```
#Without external api sync
meteor run
#With external api sync (needs deploy settings)
npm start
```

## Run all tests

```
#Lint tests
npm run lint
#Unit & integrations tests (use test-watch to run test on changes)
npm run test
#Acceptance test
npm run acceptance-test-server
npm run acceptance-test
```



## Release instructions

### v0.0.6
Update collections
```
db.brew.profiles.update({},{ $set: {fermenterLoss: 0}}, { multi: true });
db.recipes.update({},{ $set: {efficiency: 75, boilLoss: 0, fermenterLoss: 0}}, { multi: true });
```
