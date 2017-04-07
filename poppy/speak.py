import pygame
import time
import requests
import json

from gtts import gTTS

import pypot.primitive
from pypot.primitive.move import MoveRecorder, Move, MovePlayer

class SayFR(pypot.primitive.Primitive):
	def start(self,text):
		print "robot.say_fr : "+text
		tts = gTTS(text, lang='fr')
		tts.save("tmp/temp.mp3")

		pygame.mixer.init()
		pygame.mixer.music.load("tmp/temp.mp3")
		pygame.mixer.music.play()

class SayEN(pypot.primitive.Primitive):
	def start(self,text):
		print "robot.say_en : "+text
		tts = gTTS(text, lang='en')
		tts.save("tmp/temp.mp3")

		pygame.mixer.init()
		pygame.mixer.music.load("tmp/temp.mp3")
		pygame.mixer.music.play()