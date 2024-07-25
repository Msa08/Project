import time

class Sequentielle:
    """
        Classe sequentielle qui va permettre de realiser une
        strategie sequentielle, strategie composee dune succesion
        de strategie
    """
    def __init__(self):
        self.strats=[]          #Liste qui va contenir les strategies 
        self.i=0                #Compteur
        self.stop_var=False     #Variable qui va nous permettre de determiner si la strategie est tjr en cours d execution

    def start(self):
        self.strats[self.i].start()  #On start la premiere strategie 

    def step(self):
        #On step la strategie d indice i tant qu elle n est pas stop
        if( not self.strats[self.i].stop()):
            self.strats[self.i].step()  
        else :
            self.i+=1
            if(self.i<len(self.strats)):
                
                self.strats[self.i].start()
                self.strats[self.i].step()  
            else :
                self.stop_var=True 
                self.stop() 
              
    def stop(self):
        """
            Teste si la strategie que lon est entrain deffectuer 
            est la derniere de la liste de strategie
        """
        #La strategie Sequentielle s arette deux deux cas :
        #Soit on l arette en mettant sa variable stop_var a 
        #True et en apellant sa fonction stop() dans ce cas 
        #elle stop la strategie courrante d indice i 
        #Soit la strategie s acheve quand elle a execute 
        #toutes les fonctions contenues dans sa liste self.strats
        if(self.stop_var):
            if(self.i<len(self.strats)):
                self.strats[self.i].stop_var=True
                self.strats[self.i].stop()    
        
        return self.stop_var

