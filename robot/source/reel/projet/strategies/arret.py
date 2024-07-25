class Arret:
    """
      Strategie qui va arreter le robot en mettant la vitesse de ses roues a zero 
    """
    def __init__(self,robot):
      self.robot=robot
      self.running=True

    def start(self):  
        self.robot.mode=1
        self.robot.set_vitesse(0,0)

    def stop(self):
      return self.running
  