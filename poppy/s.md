# Robot Poppy
Robot poppy-torso written in python, offering a rest api & primitives to be used by the controller (cloud server)

## Installation

### Anaconda 2 [Download](https://www.continuum.io/downloads)
- Install anaconda for **python 2.7** (Poppy python dev version)

### Poppy [Installation doc](https://docs.poppy-project.org/en/installation/install-poppy-softwares.html
- pip install poppy-torso --user -U

#### On windows 
- Before installing poppy-torso, install all basic anaconda package (preferably on an admin command prompt) with :
- conda install numpy scipy notebook jupyter matplotlib


### Python depedencies
- backports-abc==0.5
- bottle==0.12.13
- certifi==2017.1.23
- enum34==1.1.6
- gTTS==1.1.8
- gTTS-token==1.1.1
- gyp==0.1
- ikpy==2.2.3
- mpmath==0.19
- numpy==1.12.1
- poppy-creature==2.0.0
- poppy-torso==1.1.5
- pygame==1.9.3
- pypot==3.0.2
- pyserial==3.3
- pyttsx==1.1
- pyzmq==16.0.2
- requests==2.13.0
- scipy==0.19.0
- singledispatch==3.4.0.3
- six==1.10.0
- sympy==1.0
- tornado==4.4.3
- zmq==0.0.0


### Any other depedencies (working on a cleaner way)
- cd poppy/
```
$ python
>>> import cherry
```
- Then install needed depedencies for cherry to import

## Usage

1. cd poppy/
```
$ sudo python
>>> import threading
>>> from cherry import Cherry
>>> from pypot.server.httpserver import HTTPRobotServer

>>> robot = Cherry.setup('config.json')

>>> server = HTTPRobotServer(robot, host='127.0.0.1', port=8080)

>>> threading.Thread(target=lambda: server.run()).start()
```

### WORK IN PROGRESS ....

## API [source](https://github.com/poppy-project/pypot/blob/master/REST-APIs.md)

### Primitives

>>>  localhost:8000/primitive/say_fr/method/start/args.json
#### header
content-type : application/json
#### body
{"text":"Bonjour"}

|  | HTTP | JSON | Example of answer |
|-----------------------------------|:-------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------:|
| Get the primitives list | GET /primitive/list.json | {"robot": {"get_primitives_list": ""}} | {'primitives': ["stand_up", "sit", "head_tracking"]} |
| Get the running primitives list | GET /primitive/running/list.json | {"robot": {"get_running_primitives_list": ""}} | {'primitives': ["head_tracking"]} |
| Start a primitive | GET /primitive/\<prim>/start.json | {"robot": {"start_primitive": {"primitive": "<prim>"}}} | {} |
| Stop a primitive | GET /primitive/\<prim>/stop.json | {"robot": {"stop_primitive": {"primitive": "<prim>"}}} | {} |
| Pause a primitive | GET /primitive/\<prim>/pause.json | {"robot": {"pause_primitive": {"primitive": "<prim>"}}} | {} |
| Resume a primitive | GET /primitive/\<prim>/resume.json | {"robot": {"resume_primitive": {"primitive": "<prim>"}}} | {} |
| Get the primitive properties list | GET /primitive/\<prim>/property/list.json | {"robot": {"get_primitive_properties_list": {"primitive": "<prim>"}}} | {"property": ["filter", "smooth"]} |
| Get a primitive property value | GET /primitive/\<prim>/property/<prop> | {"robot": {"get_primitive_property": {"primitive": "<prim>", "property": "<prop>"}}} | {"sin.amp": 30.0} |
| Set a primitive property value | POST /primitive/\<prim>/property/<prop>/value.json | {"robot": {"set_primitive_property": {"primitive": "<prim>", "property": "<prop>", "args": {"arg1": "val1", "arg2": "val2", "...": "..."}}}} | {} |
| Get the primitive methods list | GET /primitive/\<prim>/method/list.json | {"robot": {"get_primitive_methods_list": {"primitive": "<prim>"}}} | {"methods": ["get_tracked_faces", "start", "stop", "pause", "resume"]} |
| Call a method of a primitive | POST /primitive/\<prim>/method/\<meth>/args.json | {"robot": {"call_primitive_method": {"primitive": "<prim>", "method": "<meth>", "args": {"arg1": "val1", "arg2": "val2", "...": "..."}}}} |  |
