import math
import numpy as np
from PIL import ImageGrab   #Pour windows OS
#import pyscreenshot as ImageGrab 

PORTE_DETECTION=100         #PORTE_DETECTION est la portee de la detection dobstacle 

class Robot:
     
    def __init__(self, x, y,angle,longueur,rayon,ecart_roues,env):
        #Initialisation des attributs du Robot
        self.x = x
        self.y = y
        self.env=env
        self.angle=angle
        self.longueur=longueur
        self.led1=False
        self.led2=False

        #Mode 1 : les roues tournent dans le meme sens a la meme
        #Mode 2 : les roues tournent dans un sens different si la vitesse est positif 
        #alors la roue droite tourne en avant et la roue gauche en arriere

        #On initialise le mode du robot a 1 lors de la creation du robot 
        self.mode=1

        #Le rayon des roue est en mm
        self.rayon_Roue=rayon

        #L attribut ecart_roues represente l ecart entre les deux roues en mm
        self.ecart_roues=ecart_roues 
        #L attribut distance_Centre_Rotation represente la la distance entre le centre du robot et son centre de rotation
        self.distance_Centre_Rotation=ecart_roues 

        #Initialisation de la  vitesse de la roue droite et celle de la roue gauche 
        self.vitesse_RoueDroite=0
        self.vitesse_RoueGauche=0

      

    def update_Position(self,delta_time):
        """
            Mise a jour de la position du robot par le calcul de la distance 
            parcouru pendant un certain temps delta_time et modification de 
            l orientation de ce dernier. 
        """ 
        #Si le mode du robot est a 1:
        #On compare la vitesse de la  roue  gauche et celle  de la  roue droite
        #Si les deux vitesses sont egales alors le robot avance en ligne droite 
        #Donc pour mettre a jour la position du robot il suffit uniquement de 
        #mettre a jour les coordonnees x et y du robot en fonction de la distance
        #parcourrue par la roue droite resp celle de la roue gauche
        #Si les deux vitesses sont differentes alors on modifie au prealable 
        #l angle d inclinaison du robot en fonction de la distance parcourrue 
        #sa vitesse et son centre de rotation, ensuite on modifie les coordonnees 
        #x et y.
        
        if(self.mode==1) :       
            if(self.vitesse_RoueDroite==self.vitesse_RoueGauche):
                distance=self.get_distance_parcouru_RoueDroite(delta_time)
                self.y = self.y + ( math.sin(self.angle) * distance )
                self.x = self.x + ( math.cos(self.angle) * distance )
            else: 
                distance=self.get_distance_parcouru_RoueDroite(delta_time)
                self.setAngle(self.angle+(distance/self.distance_Centre_Rotation))
                self.y = self.y + ( math.sin(self.angle) * distance )
                self.x = self.x + ( math.cos(self.angle) * distance )

        #Si le mode du robot est a 2:
        #On modifie uniquement l angle d inclinaison du robot en fonction de 
        #sa vitesse et l ecart entre ses roue(on considere que la roue droite
        #est la seule roue qui tourne tel que le robot rourne autour de sa roue
        #gauche)
        if(self.mode==2): 
            distance=self.get_distance_parcouru_RoueDroite(delta_time)
            self.setAngle(self.angle+(distance/self.get_ecart_roues()))

        
    def getEnv(self):
        """
            Retourne lenvironnement dans lequel evolue le robot
        """
        return self.env

      
    def setAngle(self, angle):
        """
            Oriente le robot avec langle entre en parametre
        """
        self.angle=angle

    def set_vitesse(self,vitesse_RoueDroite,vitesse_RoueGauche):
        """
            Fixe la vitesse du robot a la vitesse saisie en parametre
        """
        #La vitesse de rotation est en degre/s 
        self.vitesse_RoueDroite=vitesse_RoueDroite
        self.vitesse_RoueGauche=vitesse_RoueGauche

    def set_mode(self,mode):
        """
            Va mettre le mode du robot en mode 1 ou 2 en fonction du mode en parametre
        """
        self.mode=mode

    def set_rayon(self,rayon):
        """
            Modifie le rayon de la roue du robot
        """
        self.rayon_Roue=rayon

     
    def get_distance(self):
        """ 
            Renvoie la distance a laquelle se trouve le prochain obstacle en fonction du cas
            de deplacement du robot
        """
        #Renvoie la distance entre le robot et l obstacle le plus proche en mm 
        env=self.env
        for i in np.arange(0, int(PORTE_DETECTION),5):
          for a in env.liste_Obstacles :
  
            #Premier cas : Deplacement de bas en haut 
            if (a.x1 <= self.x + math.cos(self.angle) * i <= a.x2 and int(self.y + math.sin(self.angle) * i) == a.y1):
                return i
                
            #Second cas : Deplacement de haut en bas        
            elif (a.x4 <= self.x + math.cos(self.angle) * i <= a.x3 and int(self.y + math.sin(self.angle) * i) == a.y3):
                return i

            #Troisieme cas : Deplacement de gauche a droite 
            elif (a.y1 <= self.y + math.sin(self.angle) * i <= a.y4 and int(self.x + math.cos(self.angle) * i)== a.x1):
                return i

            #Quatrieme cas : Deplacement de gauche a droite 
            elif (a.y2 <= self.y + math.sin(self.angle) * i <= a.y3 and int(self.x + math.cos(self.angle) * i)== a.x3):
                return i
        
        return -1

    def get_distance_parcouru_RoueDroite(self,delta_time):
        """
            Retourne la distance parcourue par la roue droite du robot
        """
        #La distance retournee est en mm
        return (self.get_vitesseRoueDroite()*delta_time*2*math.pi*self.get_rayon())/360

    def get_distance_parcouru_RoueGauche(self,delta_time):
        """
            Retourne la distance parcourue par la roue gauche du robot
        """
        #La distance retournee est en mm
        return (self.get_vitesseRoueGauche()*delta_time*2*math.pi*self.get_rayon())/360

    def get_vitesseRoueDroite(self):
        """
            Retourne la vitesse actuelle de la roue droite
        """
        #la vitesse retournee est en mm/s
        return self.vitesse_RoueDroite
    
    def get_vitesseRoueGauche(self):
        """
            Retourne la vitesse actuelle de la roue gauche
        """
        #la vitesse retournee est en mm/s
        return self.vitesse_RoueGauche

    def get_rayon(self):
        """
            Retourne le rayon de la roue du robot
        """
        #Le rayon retournee est en mm
        return self.rayon_Roue

    def get_ecart_roues(self):
        #La valeur retournee est en mm
        return self.ecart_roues
        
    def get_image(self):
        """
        fait une capture decran
        """
        img = ImageGrab.grab() 
        return img

    def save_image(self,chemin,cpt): 
        """
        enregistre limage capture avec get_image dans le dossier images de modelisation
        """
        img=self.get_image()                        #On fait une capture d ecran en utilisant la fonction get_image
        img.save(chemin+str(cpt)+".jpeg","JPEG")    #On enregistre l image en utilisant la fonction save 
                                                    

