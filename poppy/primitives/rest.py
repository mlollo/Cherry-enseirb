import pypot.primitive


class PlayMove(pypot.primitive.Primitive):

	# Add an argument to the first init call
	def __init__(self, robot, movement=None):
		# save the argument
		self.move  = movement
		self.robot = robot

		# call agin the init function but in a way the primitive
		pypot.primitive.Primitive.__init__(self,robot)

	# main function that is call when the start method is launch
	def run(self):