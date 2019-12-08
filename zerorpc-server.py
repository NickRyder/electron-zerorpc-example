from os import listdir
import zerorpc


class someBasicClass:
    def exec_code(self, code):
        code = str(code)
        try:
            return str(eval(code))
        except Exception as e:
            return str(e)


server = zerorpc.Server(someBasicClass())
server.bind("tcp://0.0.0.0:4242")
server.run()
