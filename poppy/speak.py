import threading
import pypot.primitive


from voice import *


class SayFR(pypot.primitive.Primitive):
	def start(self,text,lang='fr'):
		threading.Thread(target=lambda:Voice.start(text)).start()


class SayEN(pypot.primitive.Primitive):
	def start(self,text,lang='en'):
		threading.Thread(target=lambda:Voice.start(text)).start()


		# tts = gTTS(text, lang='en')
		# tts.save("tmp/temp.mp3")

		# pygame.mixer.init()
		# pygame.mixer.music.load("tmp/temp.mp3")
		# pygame.mixer.music.play()

		# # load the configuration file that give the server addr and port for requests 
		# json_data = open('./config/conf.json')
		# data = json.load(json_data)
		# json_data.close()

		# # we need the server addr+port and the robot name so the server know which robot has ended his move
		# ip = data['server']['addr']
		# port = data['server']['port']
		# name = data['robot']['name']

		# # create the url for the request
		# url = "http://"+str(ip)+":"+str(port)+"/robot/speakfinished/"

		# while pygame.mixer.music.get_busy():
		# 	pass
		
		# # send the post with the robot name request to the server
		# try: 
		# 	requests.post(url, data = {'id':str(name)})
		# except:
		# 	print "Request error"
		# else:
		# 	pass
		# 	# print "Request sent !"


