class Obstacle: 
    """
        La classe obstacle contient le constructeur d un obstacles, de forme rectangulaire
    """
    def __init__(self,x,y,longueur,largeur,nom): 
        """
           Un constructeur qui va creer un obstacle de forme rectangulaire, prend en parametre les coordonnees du centre du rectangle,
           ainsi que la longueur, la largeur et le nom de l obstacle.
        """
        #x1 et y1 representent les coordonnees du cote inferieur gauche 
        self.x1=x
        self.y1=y-largeur
        #x2 et y2 representent les coordonnees du cote infe+rieur droit
        self.x2=x+longueur
        self.y2=y-largeur
        #x3 et y3 representent les coordonnees du cote superieur droit 
        self.x3=x+longueur
        self.y3=y
        #x4 et y4 representent les coordonnees du cote superieur gauche 
        self.x4=x
        self.y4=y
        
        self.nom=nom

