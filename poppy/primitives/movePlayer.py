#!/usr/bin/env python)
# -*- coding: utf-8 -*-

import time
import sys
import os
import pypot.primitive
from pypot.primitive.move import MoveRecorder, Move, MovePlayer
import json
from random import randint
from pprint import pprint


class PlayMove(pypot.primitive.Primitive):

	def __init__(self, robot, movement=None):
			self.move  = movement
			self.robot = robot
			pypot.primitive.Primitive.__init__(self,robot)

	def run(self):
		with open("./moves/"+self.move+".move") as f:
			m = Move.load(f)
		movey = MovePlayer(self.robot, m)
		movey.start()
