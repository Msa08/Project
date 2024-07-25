from .avancer import Avancer
from .tourner import Tourner
import math

class TracerTriangle:
    """
        Strategie permettant au robot de tracer un triangle equilateral 
        a une certaine vitesse et avec des cotes de taille specifiques
    """
    def __init__(self, robot, distance, vitesse):
        self.robot=robot
        self.distance=distance
        self.vitesse=vitesse
        self.strats=[Avancer(robot,vitesse,distance),Tourner(robot,vitesse,120),Avancer(robot,vitesse,distance),
        Tourner(robot,vitesse,120),
        Avancer(robot,vitesse,distance)]
        self.i=0
        self.stop_var=False

    def start(self):
        self.strats[self.i].start()

    def step(self):
        if( not self.strats[self.i].stop()):
            self.strats[self.i].step()
        else :
            self.i+=1
            if(self.i<len(self.strats)):
                self.strats[self.i].start()
                self.strats[self.i].step() 
            else :
                self.stop_var=True 
                self.stop()

    def stop(self):
        """
            La strategie TracerTriangle sarette deux deux cas :
            Soit on larette en mettant sa variable stop_var a True et en apellant sa fonction stop() dans ce cas elle stop la strategie courrante d'indice i 
            Soit la strategie sacheve quand elle a executé toutes les fonctions contenues dans sa liste self.strats
        """
        if(self.stop_var):
            if(self.i<len(self.strats)):
                self.strats[self.i].stop_var=True
                self.strats[self.i].stop()    

        return self.stop_var