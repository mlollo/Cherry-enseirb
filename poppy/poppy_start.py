import sys
if len(sys.argv) == 4:
	import threading
	import requests
	from cherry import Cherry
	from pypot.server.httpserver import HTTPRobotServer
	robot = Cherry.setup()
	Cherry.serve(robot, str(sys.argv[1]))
	requests.get("http://"+str(sys.argv[1])+":"+str(sys.argv[2])+"/setup?id="+str(sys.argv[3]))
else:
	print 'Poppy_start Usage :'
	print 'python poppy_start.py <server_ip> <server_app_port> <robot_name>'
	print 'Please start server before.'

