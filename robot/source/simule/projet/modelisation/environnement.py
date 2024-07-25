from .robot import Robot
from .obstacle import Obstacle
import time
import random

LARGEUR_MURS=5    #Variable globale qui represente la largeur des murs de l environnement 

class Environnement:
  """ L'environnement va contenir un certain nombre de robots et d'obstacles
      parametre name : nom de l'environnement
      parametre longueur : longueur de l'environnement
  """
  def __init__(self,name,longueur):
    self.name=name
    self.longueur=longueur
    self.liste_Robots=[]
    self.liste_Obstacles=[]

    #Ajout des murs dans l environnement 
    self.mur_gauche=Obstacle(0,self.longueur,LARGEUR_MURS,self.longueur,"mur_gauche")
    self.mur_droite=Obstacle(self.longueur-LARGEUR_MURS,self.longueur,LARGEUR_MURS,self.longueur,"mur_droite")
    self.mur_haut=Obstacle(0,LARGEUR_MURS,self.longueur,LARGEUR_MURS,"mur_haut")
    self.mur_bas=Obstacle(0,self.longueur,self.longueur,LARGEUR_MURS,"mur_haut")
    self.ajouter_Obstacle(self.mur_bas)
    self.ajouter_Obstacle(self.mur_droite)
    self.ajouter_Obstacle(self.mur_gauche)
    self.ajouter_Obstacle(self.mur_haut)

    self.time=time.time()
    self.delta_time=0


  def ajouter_Robot(self,robot):
    """
      Fonction qui prend en argument un robot et qui va lajouter a lenvironnement.
    """
    self.liste_Robots.append(robot)

  def ajouter_Obstacle(self,obstacle):
    """
      Fonction qui prend en argument un obstacle et qui va lajouter a lenvironnement.
    """
    self.liste_Obstacles.append(obstacle)
  

  def retirer_robot2(self,robot):
      """
        Fonction qui va prendre en arguement un robot et qui va le retirer de lenvironnement
      """
      temp_x=robot.x
      temp_y=robot.y                              #On parcourt la liste des robots
      for r in self.liste_Robots:                 #et on retire le/les robot/s qui
        if r.x==temp_x and r.y==temp_y :          #a/ont les meme coordonees que le 
          self.liste_Robots.remove(robot)         #robot mis en parametre
                                                   
                                                  
  def retirer_obstacle(self,obstacle):
    """
      Fonction qui va prendre en arguement un obstacle et qui va le retirer de lenvironnement
    """
    temp_x=obstacle.x4                            #On parcourt la liste des obstacles
    temp_y=obstacle.y4                            #et on retire le/les obstacle/s qui
    temp_large=obstacle.largeur                   #a/ont les meme coordonees que l
    temp_longueur=obstacle.longueur               #obstacle mis en parametre
    temp_nom=obstacle.nom
    for r in self.liste_Obstacles:
      if r.x4==temp_x and r.y4==temp_y and r.nom==temp_nom and r.largeur==temp_large and r.longueur==temp_longueur : 
        self.liste_Obstacles.remove(obstacle)

  def update(self):
    """
      Mise a jour de lenvironnement
    """
    #Mise a jour de la position des robots present dans l environnement 
    for i in self.liste_Robots:
      self.delta_time=time.time()-self.time
      i.update_Position(self.delta_time)
    
    self.time=time.time()


  def ajout_obstacle_aleatoire(self,number):
    """
      Va ajouter un certain nombre dobstacle saisis en parametre a lenvironnement
    """
    self.o=1
    while self.o<=number:
      self.ajouter_Obstacle(Obstacle(random.randint(10,self.longueur),random.randint(10,self.longueur),random.randint(10,70),random.randint(10,120),"obstacle"+str(self.o)))
      self.o+=1
    return 
