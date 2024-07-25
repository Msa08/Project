from projet import Adaptateur_reel
from projet import Avancer, Tourner, TracerCarre, TracerTriangle, Condition, Approcher, Arret, Detection, Sequentielle, TracerCercle
from projet import Thread_control,Image
from robot2I013 import Robot2I013
import time

r=Robot2I013() # robot reel
robot=Adaptateur_reel(r) # adaptator_robot reel
time.sleep(1)

vitesse_avancer=600
vitesse_tourner=50
distance=200
limite=100

#Image
image = Image(robot)

#Avancer avec detection d obstacles
condition1=Condition(Avancer(robot,vitesse_avancer,distance),Arret(robot),Detection(robot,limite,6))

#Tourner 
condition3=Condition(Tourner(robot,vitesse_tourner,90),Arret(robot),Detection(robot,limite,3))

#Tracer carre avec detection d obstacles
tracer_cc=TracerCarre(robot,distance,vitesse_avancer,vitesse_tourner)
condition=Condition(tracer_cc,Arret(robot),Detection(robot,limite,1000))

#Tracer un triangle avec detection d obstacles 
condition2=Condition(TracerTriangle(robot,distance,vitesse_avancer),Arret(robot),Detection(robot,limite,3))

#Tracer un cercle vers le bas avec detection d obstacles
condition4=Condition(TracerCercle(robot,distance,vitesse_avancer),Arret(robot),Detection(robot,limite,100))

#Approcher 
approcher=Approcher(robot,vitesse_avancer)
condition5=Condition(approcher,Arret(robot),Detection(robot,limite,2))

#Sequentielle 
tourner=Tourner(robot,vitesse_tourner,90)
sequence =Sequentielle()
sequence.strats.append(condition5)
sequence.strats.append(tourner)


#THREADS 
th_control=Thread_control(robot,condition1)                #avancer
#th_control=Thread_control(robot,condition3)                #tourner 
#th_control=Thread_control(robot,condition)                 #tracer_carre
#th_control=Thread_control(robot,condition2)                #tracer_triangle
#th_control=Thread_control(robot,condition4)                #tracer un cercle 
#th_control=Thread_control(robot,condition5)                #approcher
#th_control=Thread_control(robot,sequence)


th_control.start()
image.start()

