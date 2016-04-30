# Brewify

Online on brewify.xyz

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
