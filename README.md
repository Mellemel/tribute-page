# Tribute page for Jon Snow

While this Git repo is a front-end project from http://wwww.freecodecamp.com, I figured I set this up and use this as my playground for whenever a new library or framework comes a long. Basically my sandbox =)

### Dev Tools / Tech Stack
+ Jade -> html
+ Sass -> CSS
+ Gulp
+ Vagrant
+ eslint

Incase you do use Visual Studio Code as your editor, I have used a jsconfig.json along with a typings.json file to help support its intellisense. 

I used the 'gulp serve' task to serve static files using browsersync and I used 'gulp watch' to not only watch new files coming in and move them to the build directory but to also compile the Jade and Sass files.

My vagrant set up consists of ubuntu/trust64 as the vm box. I have forwarded ports 8080/8081 on the host machine and 3000/3001 on the guest machine.

Feel free to fork this and use this as your sandbox for your front-end projects.