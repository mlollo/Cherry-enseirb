import numpy
import os
import glob
import threading
import time
import requests
import json
import pygame

from pypot.server.httpserver import HTTPRobotServer

from pypot.server.zmqserver import ZMQRobotServer

from functools import partial

from pypot.creatures import AbstractPoppyCreature

from attach_primitive import attach_primitives

from pypot.robot import from_json

from pypot.primitive.move import MoveRecorder

from primitives.movePlayer import PlayMove

from speak import SayFR, SayEN


class Cherry(AbstractPoppyCreature):
         
    @classmethod
    def setup(cls):
        print "Robot setup started :"
        try:
            cls.robot = from_json('config/torso.json')
        except Exception as e:
            try:
                cls.robot = from_json('config/torso.json')
            except Exception as e:
                print "Unable to configure the robot"
                raise
        else:
            print "Robot configuration successful !"

        print "Starting motors configuration"

        for m in cls.robot.motors:
            m.compliant_behavior = 'dummy'
            m.goto_behavior = 'minjerk'
            m.moving_speed = 70
        
        for m in cls.robot.motors:
            m.compliant = False
            m.goal_position = 0
            print m

        for m in cls.robot.head:
            m.compliant = True
        try:
            attach_primitives(cls.robot)
        except:
            print "Primitives not attached "
        else:
            print "Primitives attached successfully"


        # Attach Gtts
        try:
            cls.robot.attach_primitive(SayFR(cls.robot), 'say_fr')
            cls.robot.attach_primitive(SayEN(cls.robot), 'say_en')
        except Exception as e:
            print "Something goes wrong with gTTS"
            raise
        else:
            print "gTTS attached successfully"

        return cls.robot

    @classmethod
    def serve(cls):
        json_data = open('./config/conf.json')
        data = json.load(json_data)
        json_data.close()
        
        ip = data['robot']['addr']
        port = data['robot']['port']
        
        try:
            server = HTTPRobotServer(cls.robot, host=str(ip), port=str(port))
        except:
            print "Unable to create server object"
        else:
            print "Server configuration done"
        try:
            threading.Thread(target=lambda: server.run()).start()
        except:
            print "Unable to start server"
        else:
            print "server started successfully"

    @classmethod
    def connect(cls):
        json_data = open('./config/conf.json')
        data = json.load(json_data)
        json_data.close()

        ip = data['server']['addr']
        port = data['server']['port']
        name = data['robot']['name']

        print "Starting to ping the server"

        response = os.system("ping -c 1 " + str(ip))
        if response != 0:
            while response != 0:
                response = os.system("ping -c 1 " + str(ip))
                time.sleep(5)

        url = "http://"+str(ip)+":"+str(port)+"/setup?id="+str(name)
        print url
        try: 
            requests.get(url)
        except:
            print "Request error"
    
    @classmethod
    def learn(cls):
        move = MoveRecorder(cls.robot,50,cls.robot.motors)
        cls.robot.compliant = True
        raw_input("Press any key to start recording a Move.")
        move.start()
        raw_input("Press again to stop the recording.")
        move.stop()

        for m in cls.robot.motors:
            m.compliant = False
            m.goal_position = 0

        print "List of already taken primitives : "

        os.chdir('./moves')
        for file in glob.glob("*.move"):
            print(os.path.splitext(file)[0])
        os.chdir('../')

        move_name = raw_input("Enter the name of this sick move : ")
        move_name = move_name+".move"

        with open("./moves/"+move_name, 'w') as f:
            try:
                move.move.save(f)
            except:
                print "Unable to save this move, sorry"
            else:
                print "Move successfully saved !"
        try:
            cls.robot.attach_primitive(PlayMove(cls.robot,movement=move_name),move_name)
        except Exception as e:
            raise
        else:
            print "Move successfully attached to the robot !"
        finally:
            pass
            
    @classmethod
    def forget(cls,move_name):
        raw_input("Are you sure ? Press any key to deletethis move")
        try:
            os.remove("./moves/"+move_name+".move")
        except Exception as e:
            raise
        else:
            print move_name+" successfully forgotten !"
        finally:
            pass







