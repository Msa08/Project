from PIL import Image
CENTER_WIDTH=200            #Largeur de la partie centrale 
DIFF_MAX1=100               #Difference entre les nuances de couleurs
DIFF_MAX2=50

class TraitementImage:
    def __init__(self,chemin):
       self.image=Image.open(chemin)
       self.indice=0
       self.chemin=chemin                 #Chemin de l image qu on souhaite traitee 
       
    def decouper_Image(self):
      """
      Cette fonction sert a decouper une image dont le chemin
      est mis en parametre en 3 parties
      """
      width, height = self.image.size        
      
      img1=self.image.crop((0,0,width/2-CENTER_WIDTH,height))
      self.chemin1="projet/images/images_decoupees/imageDecoupee"+str(self.indice)+".jpeg"
      img1.save(self.chemin1)
      
      self.indice+=1
      img2=self.image.crop((width/2+CENTER_WIDTH,0,width,height))
      self.chemin3="projet/images/images_decoupees/imageDecoupee"+str(self.indice)+".jpeg"
      img2.save(self.chemin3)
      
      self.indice+=1
      img3=self.image.crop((width/2-CENTER_WIDTH,0,width/2+CENTER_WIDTH,height))
      self.chemin2="projet/images/images_decoupees/imageDecoupee"+str(self.indice)+".jpeg"
      img3.save(self.chemin2)

 
    def couleur_dominante(self,filename):
      """
      Cette fonction renvoie la couleur dominante dans le fichier
      dont le nom est mis en parametre
      """
      image=Image.open(filename)
      width, height = image.size
      r_total = 0
      g_total = 0
      b_total = 0
      y_total=0
      count = 0
      for x in range(0, width):
          for y in range(0, height):
                r, g, b = image.getpixel((x,y))
                couleur=self.get_color( (r,g,b), DIFF_MAX2,DIFF_MAX1)
                if(couleur=="r"):
                  r_total+=1
                if(couleur=="g"):
                  g_total+=1
                if(couleur=="b"):
                  b_total+=1
                if(couleur=="y"):
                  y_total+=1
                print((r,g,b))
                count+=1
              
      print("nb red ",r_total)
      
      if(r_total==0):
          return "aucune"
      if( max(r_total,g_total,b_total,y_total)==r_total):
          return "red"
          
      if(max(r_total,g_total,b_total,y_total)==g_total):
          return "green"

      if(max(r_total,g_total,b_total,y_total)==b_total):
          return "blue"

      return "yellow"

    def get_color(self,triplet,diff_max1,diff_max2):
      """
      Cette fonction renvoie le nom de la couleur que represente
      le triplet en format (r,gb) mis en parametre 
      """
      if( (255-triplet[0]) <= diff_max1 and (triplet[1] <= diff_max2) and (triplet[2] <= diff_max2) ):
        return "r"

      if( (255-triplet[1]) <= diff_max1 and (triplet[0] <= diff_max2) and (triplet[2] <= diff_max2)):
        return "g"

      if( (255-triplet[2]) <= diff_max1 and (triplet[0] <= diff_max2) and (triplet[1] <= diff_max2)):
        return "b"
        
      if( (255-triplet[0]) <= diff_max1 and (255-triplet[1]) <= diff_max1 and (triplet[2] <= diff_max2)):
        return "y"
      

    def couleur_dominante_PartieGauche(self):
      """
      Cette fonction renvoie la couleur dominante de la
      partie gauche 
      """
      return self.couleur_dominante(self.chemin1)

    def couleur_dominante_PartieCentrale(self):
      """
      Cette fonction renvoie la couleur dominante de la
      partie centrale 
      """
      return self.couleur_dominante(self.chemin2)

    def couleur_dominante_PartieDroite(self):
      """
      Cette fonction renvoie la couleur dominante de la
      partie droite 
      """
      return self.couleur_dominante(self.chemin3)