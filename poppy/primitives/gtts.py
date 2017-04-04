

(r'/primitive/(?P<primitive_name>[a-zA-Z0-9_]+)/method/(?P<method_name>[a-zA-Z0-9_]+)/args\.json', CallPrimitiveMethodHandler),

class CallPrimitiveMethodHandler(PoppyRequestHandler):
	def post(self, primitive_name, method_name):
		data = json.loads(self.request.body)
		response = self.restful_robot.call_primitive_method(primitive_name, method_name, data)
		self.write_json({
			'{}:{}'.format(primitive_name, method_name): response
			})

def _call_primitive_method(self, primitive, method_name, *args, **kwargs):
	p = getattr(self.robot, primitive)
	f = getattr(p, method_name)
	return f(*args, **kwargs)