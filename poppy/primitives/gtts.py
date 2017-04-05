#############################################################""
# Source code to send post request to the robot
# The idea is to be able to pass the test the robot will have to say 
# into the post request
#############################################################""

# (r'/primitive/(?P<primitive_name>[a-zA-Z0-9_]+)/method/(?P<method_name>[a-zA-Z0-9_]+)/args\.json', CallPrimitiveMethodHandler),

# class CallPrimitiveMethodHandler(PoppyRequestHandler):
# 	def post(self, primitive_name, method_name):
# 		data = json.loads(self.request.body)
# 		response = self.restful_robot.call_primitive_method(primitive_name, method_name, data)
# 		self.write_json({
# 			'{}:{}'.format(primitive_name, method_name): response
# 			})

# def _call_primitive_method(self, primitive, method_name, *args, **kwargs):
# 	p = getattr(self.robot, primitive)
# 	f = getattr(p, method_name)
# 	return f(*args, **kwargs)

#############################################################""
# Primitive that will receive a post request and then 
# use the google text to speech engine to download a .mp3 file
# and finally play it . ->does we need to clean the mp3 file afterwards
#############################################################""

import time
import requests
import json

import pypot.primitive
from pypot.primitive.move import MoveRecorder, Move, MovePlayer


# from gtts import gTTS
# import pygame


class Say(pypot.primitive.Primitive):
	def run(self,text):
		print text
		# tts = gTTS(text=self.text, lang='fr')
		# tts.save("tmp/temp.mp3")


		# pygame.mixer.init()
		# pygame.mixer.music.load("tmp/temp.mp3")
		# pygame.mixer.music.play()


