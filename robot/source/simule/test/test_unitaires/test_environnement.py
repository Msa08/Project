import unittest 
from source import *

class EnvironnementTest(unittest.TestCase) :
  def setUp(self):
    self.env1=Environnement("Arene",100)
    self.robot=Robot(15,15,Vecteur(1,0),2)
    self.obstacle=Obstacle(15,15,15,15,"O1")

  def test_ajouter_Robot(self):
    self.env1.ajouter_Robot(self.robot)
    print(self.env1.liste_Robots)
    self.assertIn(self.robot,self.env1.liste_Robots)

  def test_retirer_robot2(self):
    self.env1.retirer_robot2(self.robot)
    self.assertNotIn(self.robot,self.env1.liste_Robots)

  def test_ajouter_Obstacle(self):
    self.env1.ajouter_Obstacle(self.obstacle)
    self.assertIn(self.obstacle,self.env1.liste_Obstacles)
