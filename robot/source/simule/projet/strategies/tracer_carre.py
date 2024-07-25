from .avancer import *
from .tourner import *
import math

class TracerCarre:
    """
        Strategie permettant de tracer un carre dont la taille des cotes
        est a specifier en parametre tout comme la vitesse des roues dans 
        les deux modes, avancer et tourner
    """
    def __init__(self, robot, distance, vitesse_avancer,vitesse_tourner):
        self.robot=robot
        self.distance=distance
        self.vitesse_avancer=vitesse_avancer
        self.vitesse_tourner=vitesse_tourner
        self.strats=[Avancer(robot,vitesse_avancer,distance),Tourner(robot,vitesse_tourner,90),                                 #On met dans la liste strats les 
        Avancer(robot,vitesse_avancer,distance),Tourner(robot,vitesse_tourner,90),Avancer(robot,vitesse_avancer,distance),      #strategie que doit effectuer le 
        Tourner(robot,vitesse_tourner,90),Avancer(robot,vitesse_avancer,distance)]                                              #afin de tracer un carree ie une  
        self.i=0                                                                                                                #une succession de strategies
        self.stop_var=False                                                                                                     #Avancer et Tourner 
        

    def start(self):
        self.strats[self.i].start()

    def step(self):

        if( not self.strats[self.i].stop_var):                                  #On verifie si la strategie en cours d execution
            self.strats[self.i].step()                                          #s est aretee si c est le cas on incremente l 
        else :                                                                  #indice i
            self.i+=1
            if(self.i<len(self.strats)):
                self.strats[self.i].start()
                self.strats[self.i].step()
            else :
                self.stop_var=True 
                self.stop()

    def stop(self):
        #La strategie TracerCarre sarette deux deux cas :
        #Soit on larette en mettant sa variable stop_var a True et en apellant sa fonction stop() dans ce cas elle stop la strategie courrante d'indice i 
        #Soit la strategie sacheve quand elle a execute toutes les fonctions contenues dans sa liste self.strats
        if(self.stop_var):
            if(self.i<len(self.strats)):
                self.strats[self.i].stop_var=True
                self.strats[self.i].stop()    
      
        return self.stop_var