import threading
import time
DELTATIMECONTROLE=0.0001

class Thread_control (threading.Thread):
    """
      Notre Thread de control qui va permettre denvoyer des instruction (strategies)
      a nos robot reels et/ou simule.
    """
    def __init__(self,robot,strategie):      
        threading.Thread.__init__(self)   #Appel au constructeur de la classe mere                                     
        self.running=True                 #Variable qui sert a determiner si le thread est toujours en cours d execution 
        self.robot=robot
        self.strategie=strategie



    def run(self):
        while (not self.strategie.stop() and self.running==True):     #L execution du thread se poursuit tant que 
            self.strategie.step()                                     #la strategie mise en parametre ne s est pas
                                                                      #stop il existe un autre moyen de stoper le 
            if (self.strategie.stop()):                               #thread c est de mettre son attribut running
              self.stop()                                             #a False

            time.sleep(DELTATIMECONTROLE)
          
    def stop(self):
      print("J'ai stop le  thread de control ici")
      self.running = False