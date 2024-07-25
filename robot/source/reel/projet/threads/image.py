import threading
import time
DELTATIMECAPTURE=1

class Image(threading.Thread):
    def __init__(self, robot):
        """
        capture nb image
        """
        threading.Thread.__init__(self)
        self.robot=robot
        self.stop_var=False
        self.numero=0


    def run(self):

        while (not self.stop_var):
            self.robot.save_image("projet/images/",self.numero)
            self.numero+=1
            time.sleep(DELTATIMECAPTURE)

            #Le thread ne s arette pas tant que le robot n est pas a l arret 
            if(self.robot.get_vitesseRoueDroite()==0 and self.robot.get_vitesseRoueGauche()==0 ):
                self.stop()

        
        
    def stop(self):
        print("Jai stop le thread image")
        self.stop_var=True