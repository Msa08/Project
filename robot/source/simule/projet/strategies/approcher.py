from .avancer import *
from .tourner import *
import math

class Approcher:
    """
        Strategie qui incremente la vitesse du robot 
        a chaque appel a la fonction step, cette fonction
        combinee a la detection des obstacles en utilisant
        une strategie conditionnelle nous permet d obtenir 
        une strategie : Approcher le plus possible d un mur
        (un obstacle)
    """
    def __init__(self, robot,vitesse):
        self.robot=robot
        self.vitesse=vitesse
        self.stop_var=False      #Cet attribut permet de determiner si la strategie est a l arret 
        

    def start(self):
        self.robot.set_mode(1)
        self.robot.set_vitesse(self.vitesse,self.vitesse)

    def step(self):
            vitesse_temp=self.robot.get_vitesseRoueDroite()+2   #On incremente la vitesse de deux unite
            self.robot.set_vitesse(vitesse_temp,vitesse_temp)    
      
    def stop(self):
        return self.stop_var