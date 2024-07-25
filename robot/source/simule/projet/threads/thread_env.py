import threading 
import time 
DELTATIMEENV=0.0001

class Thread_env(threading.Thread):
    def __init__(self,environnement):
        threading.Thread.__init__(self)
        self.environnement=environnement
        self.running=True

    def run(self):
      while self.running :                    #On rafraichit l environnement en faisant
        self.environnement.update()           #appel a la fonction update de la classe 
        time.sleep(DELTATIMEENV)              #environnement toute les DELTATIMEENV tant 
                                              #que l attribut running est a True
    def stop(self):
      self.running = False
    
    
