from .avancer import *
from .tourner import *
import math


class TracerCercle:
    """
        Strategie permettant de tracer un cercle dun certain rayon, vitesse,
        on peut remplacer la valeur de la vitesse ou du rayon par des valeurs
        negative pour permettre de remplacer le sens et la direction du cercle
    """
    def __init__(self, robot, rayon,vitesse):
        self.robot=robot
        self.rayon=rayon
        self.compteur_Temps=0
        self.time=0
        self.delta_time=0
        self.vitesse=vitesse
        self.stop_var=False 
        self.DUREE=0
        self.parcouru_Rd=0
        self.parcouru_Rg=0
        

    def start(self):
        self.time=time.time()
        self.robot.set_mode(1)
        #En DUREE seconde la roue parcourt (vitesse*Duree*RayonRoue)/360 mm 
        #Donc pour quelle effectue une distance de 2*PI*RayonCercle en cette Duree 
        #Vitesse = RayonCercle*360 / RayonRoue*Duree 
        vitesse1=self.vitesse
        self.DUREE=abs((self.rayon*360)/(self.robot.get_rayon()*vitesse1))                                  #On calcule la DUREE necessaire pour que la roue droite        
        vitesse2=((self.rayon-self.robot.get_ecart_roues())*360)/(self.robot.get_rayon()*self.DUREE)        #effectue un cercle de rayon : self.rayon en ayant une 
        self.robot.distance_Centre_Rotation=self.rayon                                                      #vitesse self.vitesse1. On calcule la vitesse qu on doit 
        self.robot.set_vitesse(vitesse1,vitesse2)                                                           #attribuer a la roue gauche.

    def step(self):
        self.delta_time=time.time()-self.time
        self.compteur_Temps+=self.delta_time
        self.parcouru_Rd+=abs(self.robot.get_distance_parcouru_RoueDroite(self.delta_time))
        self.parcouru_Rg+=abs(self.robot.get_distance_parcouru_RoueGauche(self.delta_time))
        if(self.parcouru_Rg>=abs(2*math.pi*(self.rayon-self.robot.get_ecart_roues())) and (self.parcouru_Rd>=abs(2*math.pi*(self.rayon)))):
            self.stop_var=True
            self.stop()

        self.time=time.time()

    def stop(self):
        if(self.stop_var):
            self.robot.set_vitesse(0,0)

        return self.stop_var
