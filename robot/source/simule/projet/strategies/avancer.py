import time
import math

class Avancer:
    def __init__(self,robot,vitesse,distance):
        """fais avancer le robot mis en parametre dune certaine distance a une certaine vitesse"""
        self.distance=distance
        self.parcouru=0
        self.robot=robot
        self.vitesse=vitesse
        self.time=0
        self.delta_time=0
        self.stop_var=False

    
    def start(self):
        """Va mettre la distance parcouru par le robot a zero"""
        self.time=time.time()                                #Les attributs self.time et self.delta_time nous
        self.robot.set_mode(1)                               #permettent de calculer le temps passe entre deux  
        self.robot.set_vitesse(self.vitesse,self.vitesse)    #a step 
    
    def step(self):
        """va verifier que lon a accompli la tache en fonction du retour de la fonction stop"""
        self.delta_time=time.time()-self.time
        if(self.parcouru>=self.distance):      #Je verifie ici pour avoir une meilleure precision de calculs
            self.stop_var=True
            self.stop()
        
        self.parcouru+=abs(self.robot.get_distance_parcouru_RoueDroite(self.delta_time))
        self.time=time.time()
      
    
    def stop(self):
        """Va tester si la distance parcouru est superieure ou egale a lobjectif"""
        #La strategie sarette deux deux cas :
        #Soit on larette en mettant sa variable stop_var a True et en apellant sa fonction stop()
        #Soit la strategie seacheve quand elle a efectue sa tache 
        if(self.stop_var):
            self.robot.set_vitesse(0,0)
        
        return self.stop_var
        





