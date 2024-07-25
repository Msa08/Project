import unittest 
from source import *
import math 

class RobotTest(unittest.TestCase) :
  def setUp(self):
    self.robot=Robot(0,0,Vecteur(1,0),2)
    self.robot2=Robot(0,0,Vecteur(1,math.pi),2)

  def test_coordonnees(self):
    self.assertGreaterEqual(self.robot.x,0)
    self.assertGreaterEqual(self.robot.y,0)

  
  