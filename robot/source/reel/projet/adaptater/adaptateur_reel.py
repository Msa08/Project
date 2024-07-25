import math,time
from PIL import Image
LIMITE=200      
class Adaptateur_reel:
    
    def __init__(self,robot):
        #Robot reel 
        self.robot=robot

        #Mise a zero des vitesses des roues
        self.robot.set_motor_dps(self.robot.MOTOR_LEFT,0)    
        self.robot.set_motor_dps(self.robot.MOTOR_RIGHT,0)

        #Mise a zero de la position des roues
        self.l_pos,self.r_pos=(0,0)
        
        #Initialisation du mode du robot a 1
        self.mode=1
        self.vitesse_RoueDroite=0
        self.vitesse_RoueGauche=0
        self.distance_Centre_Rotation=self.robot.WHEEL_BASE_WIDTH
        self.premierD=0
        self.premierG=0
        self.result=0
        self.old_pos=0

    
    def set_vitesse(self,vitesse_RoueDroite,vitesse_RoueGauche):
        """
            Fixe la vitesse des deux moteurs en nombre de deges par seconde
            vitesse: la vitesse cible a la vitesse on veut que le robot se deplace        
        """
        self.vitesse_RoueDroite=vitesse_RoueDroite
        self.vitesse_RoueGauche=vitesse_RoueGauche

        if self.mode ==1  :
            self.robot.set_motor_dps(self.robot.MOTOR_LEFT,vitesse_RoueGauche)
            self.robot.set_motor_dps(self.robot.MOTOR_RIGHT,vitesse_RoueDroite)

        if self.mode ==2 :
            self.robot.set_motor_dps(self.robot.MOTOR_LEFT,0)
            self.robot.set_motor_dps(self.robot.MOTOR_RIGHT,vitesse_RoueDroite)


    def set_mode(self,mode):
        """
            Va fixer le mode dans lequel vont se mettre les roues
            Mode: -Mode 1 ( les deux roues tournent dans le meme sens)
                  -Mode 2 ( Les deux roues ne tournent pas dans le meme sens)

        """
        self.mode=mode
    


    def get_rayon(self):
        """
            Renvoie le rayon de la roue en mm. 
        """
        return self.robot.WHEEL_DIAMETER/2

    def get_vitesseRoueDroite(self):
        """
            Renvoie la vitesse de la roue droite ( en deg/s ), qui depend de la vitesse des roues
        """
        return self.vitesse_RoueDroite

    def get_vitesseRoueGauche(self):
        """
            Renvoie la vitesse de la roue gauche ( en deg/s ), qui depend de la vitesse des roues
        """
        return self.vitesse_RoueDroite


    def get_distance(self) :
        """
            Retourne la distance ( en mm ) a laquelle se trouve le prochain obstacle 
        """
        distance=self.robot.get_distance()

        #Quand la distance entre le robot et l obstacle le plus proche 
        #est inferieure a LIMITE on allume les laides en rouge sinon
        #elles sont allumees en vert
        if(0<=distance<=LIMITE):
            print("Je change la couleur")
            self.robot.set_led(self.robot.LED_LEFT_EYE,255,0,0)
            self.robot.set_led(self.robot.LED_RIGHT_EYE,255,0,0)
        else:
            self.robot.set_led(self.robot.LED_LEFT_EYE,0,255,0)
            self.robot.set_led(self.robot.LED_RIGHT_EYE,0,255,0)

        return distance 

    def get_ecart_roues(self):
        """
            Va retourner la distance entre les deux roues en mm
        """
        return self.robot.WHEEL_BASE_WIDTH
 

    def get_distance_parcouru_RoueDroite(self,nb):
        """
            Retourne la distance parcourue par la roue droite du robot en mm
        """
        #Pour une premiere fois on reinitialise a 0 l etat des moteurs 
        #en utilisant la fonction offset_motor_encoder 
        if self.premierD==0 :
            self.l_pos,self.r_pos=self.robot.get_motor_position()
            self.robot.offset_motor_encoder(self.robot.MOTOR_RIGHT,self.r_pos)
            self.premierD=1
            self.old_pos=0

        #On calcule la difference entre la nouvelle et l ancienne 
        #position de la roue droite 
        self.l_pos,self.r_pos=self.robot.get_motor_position()
        self.result=self.r_pos-self.old_pos
        self.old_pos = self.r_pos
        
        #On utilise cette formule afin de calculer la distance parcourrue 
        #par la roue droite en fonction de l angle fait par la roue, sa 
        #vitesse 
        distance=(self.result*math.pi*self.robot.WHEEL_DIAMETER)/360
        return distance




    def get_distance_parcouru_RoueGauche(self,nb):
        """
            Retourne la distance parcourue par la roue gauche en mm
        """
        if self.premierG==0 :
            self.l_pos,self.r_pos=self.robot.get_motor_position()
            self.robot.offset_motor_encoder(self.robot.MOTOR_LEFT,self.l_pos)
            self.premierG=1
            self.result=0
        else :
            self.result=self.l_pos-self.result
        
        return (self.result*math.pi*self.robot.WHEEL_DIAMETER)/360 


    def save_image(self,chemin,cpt):
        """
            Va permettre de sauvegarder en jpeg les images prise
            par la camera du robot
        """
        #On prend une photo en utilisant get_image et on la save 
        #en utilisant la fonction save du module Image
        img=self.robot.get_image()
        Image.fromarray(img).save(chemin+str(cpt)+".jpeg","JPEG")

       