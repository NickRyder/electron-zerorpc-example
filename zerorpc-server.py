from os import listdir
import zerorpc


# class ReactComponent:
#     @property
#     def props(self):
#         return self._props

#     @property.setter
#     def props(self, value):
#         self._props = value

#     @property
#     def state(self):
#         return self._state

#     @property.setter
#     def state(self, value):
#         self._state = value


class someBasicClass:
    def exec_code(self, code):
        code = str(code)
        try:
            return str(eval(code))
        except Exception as e:
            return str(e)


# class PythonZeroRPCServer:

#     # variable.__name__ -> variable
#     _tracked_variables = {}

#     def update_variable(self, variable_name, value):
#         self._tracked_variables[variable_name] = value


server = zerorpc.Server(someBasicClass())
server.bind("tcp://0.0.0.0:4242")
server.run()
