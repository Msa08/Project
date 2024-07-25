# Installation

## utilisation directe avec l'interpréteur Python

Le script peut-être utilisé directement en ligne de commande si vous avez une installation Python 3 locale. La démarche à suivre est la suivante:
- aller dans le répertoire courant `ReseauProject` 
- taper `pip3 install -r requirements.txt`  ou `pip install -r requirements.txt` pour installer les dépendances
- c'est fini! Vous pouvez maintenant lancer le programme avec: `python3 decodage/main.py` (toujours depuis `ReseauProject`).

## exécutable

Un exécutable est fourni; toutefois, il ne fonctionnera probablement pas sous Windows. Pour l'utiliser, il suffit d'ouvrir le fichier `decodeur` dans votre explorateur de fichier (ou en tapant `decodeur` dans votre terminal après avoir ouvert le répertoire `dist`).


# Utilisation du programme

## Lancement

### avec l'interpréteur Python

Le programme peut se lancer en ligne de commande avec l'interpréteur Python en tapant:
`cd ReseauProject`      
`python3 decodage/main.py` ou `python decodage/main.py` (selon les machines et environnements de travail)
il peut être lancé avec un argument, qui doit être une trace au format txt, avec:
`python3 decodage/main.p <myfile.txt>`

Sinon, vous pouvez ouvrir le fichier contenant la trace à analyser depuis l'interface graphique.

### avec l'exécutable
 
Vous pouvez également depuis une ligne de commande lancer le programme avec un argument, en tapant (depuis `ReseauProject`):
`./dist/decodeur <myfile.txt>`

Ou vous pouvez de la même façon lancer le programme avec:
- en ligne de commande: `./dist/decodeur`
- dans un explorateur de fichiers graphique: `ReseauProject>dist` et double clic sur `decodeur`

Vous pourrez ensuite importer la trace à lire depuis l'interface graphique.


## L'interface graphique

- Vous pouvez scroller à l'aide des touches flèches <Up>, <Down>, <Left>, <Right> de votre clavier.
- Vous pouvez quitter le programme en appuyant sur la touche **"q"** et sauver le résultat de la visualisation en appuyant sur **"s"**. Si vous avez appliqués des filtres encore actifs lors de la sauvegarde, ceux-là seront appliqués au résultat sauvé également.
- Il y a deux menus déroulants en haut à gauche, dans l'ordre:
  1. **File**
    - *open*: pour ouvrir un fichier à l'aide de l'explorateur de fichiers graphique.
    - *quit*: pour quitter le programme
    - *save*: pour sauver l'output avec les filtres si vous en vous en avez appliqués; ce bouton n'apparaît qu'après avoir chargé un fichier dans le visualisateur.
  2. **Edit** 
    -  *reset filters*: pour réinitialiser les filtres.



