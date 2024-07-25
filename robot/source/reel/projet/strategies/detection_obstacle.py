import time
class Detection:
    """
        Strategie detection dobstacle: Permet de detecter un obstacle a une distance limite
        fixee dans le init. Si on detecte un obstacle on declenche la strategie arret. 
    """

    def __init__(self,robot,limite,frequence):
        """
            robot : Robot sur lequel on veut appliquer la strategie. 
            limite : Distance limite a laquelle on teste la detetction. 
        """
        self.robot=robot
        self.limite=limite            #Limite de detection d obstacles
        self.frequence=frequence      #Frequence de detection d obstacles 
        self.indice=0                 #Compteur utilisee pour la frequence 
    
    def step(self):
        #On incremente le compteur indice a chaque appel de la fonction 
        #step, nous n effectons pas de detection tant que le compteur
        #n a pas atteint la valeur frequence
        self.indice+=1
        if (self.indice >= self.frequence) :
            distance_Obstacle_Robot=self.robot.get_distance()
            self.indice=0
            return 0 <= distance_Obstacle_Robot <=self.limite

        else :
            return False 
