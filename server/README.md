# Server
Cloud controller written in java & spring using Gradle

## Installation

### Eclipse or Spring (under windows or linux)[Download page](https://www.eclipse.org/downloads/)
- install eclipse neon or STS (Spring Tool Suite)
- go to help/markeplace & install Buildship Gradle then Restart Eclipse
- go to help/markeplace & Spring IDE then Restart Eclipse (if eclipse neon installed)
- go to Window/Perspective/Open Perspective/Other.../Spring then click OK
- Open the server/ folder into eclipse
- Or Follow Usage to import the project (development environment)

### Gradle (in commande line under linux)
- install gradle 3.4.1 : (Not by apt-get)
	1. curl -s "https://get.sdkman.io" | bash
	2. sudo apt install unzip
	3. source "$HOME/.sdkman/bin/sdkman-init.sh"
	4. sdk install gradle 3.4.1
Done !

## Usage 

### Eclipse or Spring (under windows or linux)
Equivalent of gradle build :
- File / import / Gradle / Existing  Gradle Project / Next / Add root directory server / Finish
- To build a new version in build.gradle change 
```
jar {
    baseName = 'cherry-rest-service'
    version =  '0.1.2'
}
```
- And in Window / Show View / Gradle / Gradle Tasks
- In Gradle Task View / server / build / right click on build / Run Gralde Tasks
- And the new version is in build/libs
To run the project : 
- right click on project 
- run as java application 
- choose Cherry.application(NOT tomcat !)

Be careful to stop the server to avoid address already in use
Done !!

### Run in command prompt under windows without Eclipse or STS
- Install bash for windows 10 [Tutorial page](http://www.windowsfun.fr/tutoriel/2016/04/10931_tuto-windows-10-comment-installer-linux-bash)
- cd to server/
- java -jar build/libs/cherry-rest-service-X.X.X.jar

### Gradle (Creating a runnable jar then running it)(under linux)

- cd to server/
- gradle clean
- gradle build
- java -jar build/libs/cherry-rest-service-X.X.X.jar
- Ctrl+C to stop
Done 

- Open your favorite web browser ( not Internet Explorer plz... )
- go to localhost:8080

### End points

COMMING SOON !!! 