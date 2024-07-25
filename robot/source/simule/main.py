from projet import Robot, Environnement, Obstacle, Affichage2D
from projet import Avancer, Tourner, TracerCarre, TracerTriangle, Condition, Approcher, Arret, Detection, Sequentielle, TracerCercle,Approcher,TraitementImage
from projet import Thread_env, Thread_control,Image
import math

#Creation du robot et de l environnement
env=Environnement("EARTH",500)
robot=Robot(350,350,-math.pi/2,20,33.25,117,env)                #robot simule
env.ajouter_Robot(robot)                                       #Ajout du robot dans l environnement
env.ajout_obstacle_aleatoire(0)

vitesse_avancer=200
vitesse_tourner=50
distance=200
limite=50

#Image
image = Image(robot)

#Avancer 
condition1=Condition(Avancer(robot,vitesse_avancer,distance),Arret(robot),Detection(robot,limite,3))

#Tourner 
condition3=Condition(Tourner(robot,vitesse_tourner,90),Arret(robot),Detection(robot,limite,6))

#Tracer carre
tracer_cc=TracerCarre(robot,distance,vitesse_avancer,vitesse_tourner)
condition=Condition(tracer_cc,Arret(robot),Detection(robot,limite,3))

#Tracer un triangle
condition2=Condition(TracerTriangle(robot,distance,vitesse_avancer),Arret(robot),Detection(robot,limite,3))

#Tracer un cercle vers le bas 
condition4=Condition(TracerCercle(robot,distance,vitesse_avancer),Arret(robot),Detection(robot,limite,1))

#Approcher 
approcher=Approcher(robot,vitesse_avancer)
condition5=Condition(approcher,Arret(robot),Detection(robot,limite,1))

#Traitement Image 
#imageTraitee=TraitementImage("projet/images/test4.jpeg")
#imageTraitee.decouper_Image()
#print("Couleur dominante partie gauche : ",imageTraitee.couleur_dominante_PartieGauche() )
#print("Couleur dominante partie centrale : ",imageTraitee.couleur_dominante_PartieCentrale() )
#print("Couleur dominante partie droite : ",imageTraitee.couleur_dominante_PartieDroite() )

#Sequentielle 
tourner=Tourner(robot,vitesse_tourner,90)
sequence =Sequentielle()
sequence.strats.append(condition5)
sequence.strats.append(tourner)

#THREADS  ENV 
th_env=Thread_env(env)
th_env.start()


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
Affichage2D(env)
th_control.stop()
th_env.stop()
image.stop()
