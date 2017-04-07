from cherry import *
robot=Cherry.setup()
server = HTTPRobotServer(robot, host='127.0.0.1', port=8000)
server.run()

robot.say_fr.start(text="bonjour")

Cherry.serve()
Cherry.connect()
